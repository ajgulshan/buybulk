import { useEffect, useState } from "react";
import styles from "../styles/NewArrival.module.css";

export default function NewArrival() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  const handleNotify = async (product) => {
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          userKey: "demo",
          userNumber: "9191919191",
          userEmail: "test@email"
        }),
      });

      const result = await res.json();
      alert(result.message || "Notification saved");
    } catch (err) {
      console.error("Notify Error:", err);
      alert("Failed to save notify request");
    }
  };

  // Function to chunk the products into groups of 4
  const chunkProducts = (products, chunkSize = 4) => {
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const renderProducts = () => {
    if (products.length === 0) {
      return (
        <div className={styles.card}>
          <h2>Demo Product</h2>
          <img src="/comingsoon.png" alt="Coming Soon" className={styles.productImage} />
          <p>Description: Products are coming soon.</p>
          <button className={styles.cardButton} onClick={() => handleNotify({
            name: "Demo Product",
            sku: "DEMO123",
            brand: "DemoBrand",
            mrp: 0,
            quantity: 0,
            offerprice: 0,
            verified: "no",
            description: "Demo description",
            image: "comingsoon.png"
          })}>Notify Me</button>
        </div>
      );
    }

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
      {renderProducts()}
    </div>
  );
}
