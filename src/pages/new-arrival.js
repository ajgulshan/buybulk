import { useEffect, useState } from "react";
import styles from "../styles/NewArrival.module.css";
import { useRouter } from "next/router";
import Message from "../components/Message";

export default function NewArrival() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const bbnData = localStorage.getItem("bbn");
    setIsLoggedIn(!!bbnData);

    if (bbnData) {
      fetch("/api/getProducts")
        .then((res) => res.json())
        .then((data) => setProducts(data.products))
        .catch((err) => {
          console.error("Failed to load products", err);
          setErrorMessage("Failed to load products.");
        });
    }
  }, []);

  const handleNotify = async (product) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const bbn = localStorage.getItem("bbn");
      if (!bbn) {
        setErrorMessage("Please log in to use the Notify feature.");
        return;
      }

      const parsed = JSON.parse(bbn);
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          userKey: parsed.name,
          userNumber: parsed.mobile,
          userEmail: parsed.email,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage(result.message || "Notification saved successfully.");
      } else {
        setErrorMessage(result.error || "Failed to save notification.");
      }
    } catch (err) {
      console.error("Notify Error:", err);
      setErrorMessage("Something went wrong while saving the notification.");
    }
  };

  const chunkProducts = (products, chunkSize = 4) => {
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const renderDemoProducts = () => {
    const demoProduct = {
      name: "Demo Product",
      sku: "DEMO123",
      brand: "DemoBrand",
      mrp: 0,
      quantity: 0,
      offerprice: 0,
      verified: "no",
      description: "Demo description",
      image: "comingsoon.png",
    };

    return (
      <>
        <div className={styles.grid}>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className={styles.card}>
              <h2>Demo Product</h2>
              <img
                src="/uploads/cloth.jpg"
                alt="Coming Soon"
                className={styles.productImage}
              />
              <p>Description: Products are coming soon.</p>
              <button
                className={styles.cardButton}
                onClick={() => handleNotify(demoProduct)}
              >
                Notify Me
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>Please log in to view New Arrivals and get notified.</p>
          <button
            className={styles.cardButton}
            style={{ marginRight: "10px" }}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className={styles.cardButton}
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </div>
      </>
    );
  };

  const renderProducts = () => {
    const chunks = chunkProducts(products, 4);
    return chunks.map((chunk, index) => (
      <div key={index} className={styles.grid}>
        {chunk.map((product) => (
          <div key={product.sku} className={styles.card}>
            <h2><strong>{product.name}</strong></h2>
            <img
              src={`/uploads/${product.sku ? product.sku + ".jpg" : "cloth.jpg"}`}
              alt={product.name}
              className={styles.productImage}
            />
            <p><strong>MRP:</strong> ₹{product.mrp}</p>
            <p><strong>Verified:</strong> {product.verified}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p className={styles.offerPrice}><strong>Offer Price:</strong> ₹{product.offerPrice}</p>
            <button className={styles.cardButton} onClick={() => handleNotify(product)}>Notify Me</button>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🆕 New Arrivals</h1>
      <Message type="success" text={successMessage} />
      <Message type="error" text={errorMessage} />
      {isLoggedIn ? renderProducts() : renderDemoProducts()}
    </div>
  );
}
