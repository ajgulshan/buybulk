import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function CAT() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const imageRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [offerPrice, setOfferPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/getProductById?id=${id}`)
        .then((res) => res.json())
        .then(async (data) => {
          const sku = data.product.sku;
          const mainImage = `/uploads/sku/${sku}imgd.jpg`;
          const thumb1 = `/uploads/sku/${sku}imgda.jpg`;
          const thumb2 = `/uploads/sku/${sku}imgdb.jpg`;

          const imgExists = async (url) => {
            try {
              const res = await fetch(url, { method: "HEAD" });
              return res.ok;
            } catch {
              return false;
            }
          };

          const thumbs = [];
          if (await imgExists(thumb1)) thumbs.push(thumb1);
          if (await imgExists(thumb2)) thumbs.push(thumb2);

          const mainExists = await imgExists(mainImage);
          setSelectedImage(mainExists ? mainImage : "/uploads/sku/default.jpeg");
          setThumbnails(thumbs);
          setProduct(data.product);
          setQuantity(data.product.moq);
        });
    }
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bbn");
      setIsLoggedIn(!!token);
    }
  }, [id]);

  const handleMouseMove = (e) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    const el = imageRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  const handleInquiry = async () => {
    if (!offerPrice || !quantity || !customerName || !contactNumber) {
      setSuccessMessage("All fields are required for inquiry");
      return;
    }
    if (!/^\d{10}$/.test(contactNumber)) {
      setSuccessMessage("Mobile number must be 10 digits");
      return;
    }

    try {
      await axios.post("/api/inquiry", {
        product_id: product.id,
        product_name: product.name,
        sku: product.sku,
        quantity,
        offer_price_per_piece: offerPrice,
        customer_name: customerName,
        contact_number: contactNumber,
      });
      setSuccessMessage("We will contact you soon");
      setShowInquiry(false);
      setOfferPrice("");
      setCustomerName("");
      setContactNumber("");
    } catch {
      setSuccessMessage("Something went wrong. Please try again.");
    }
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("bbn");
    try {
      await axios.post("/api/order", {
        product_id: product.id,
        product_name: product.name,
        sku: product.sku,
        quantity,
        price_per_piece: product.price_per_piece,
        total_price: product.price_per_piece * quantity,
        user: token,
      });
      setSuccessMessage("✅ This Order is Successful! We will contact you soon.");
      setTimeout(() => router.push("/"), 5000);
    } catch {
      setSuccessMessage("❌ Failed to place order. Please try again.");
    }
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white shadow-lg rounded-lg mt-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Thumbnails + Main Image Container - Row for all screen sizes */}
        <div className="flex flex-row gap-4 w-full lg:w-1/2">
          {/* Thumbnails - always vertical on left */}
          <div className="flex flex-col gap-2 w-[80px] shrink-0">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded border-2 ${
                  selectedImage === img ? "border-yellow-500" : "border-gray-300"
                }`}
                onClick={() => {
                  const currentMain = selectedImage;
                  setSelectedImage(img);
                  setThumbnails((prev) => {
                    const updated = prev.filter((t) => t !== img);
                    if (currentMain !== "/uploads/sku/default.jpeg") {
                      updated.push(currentMain);
                    }
                    return updated;
                  });
                }}
              />
            ))}
          </div>

          {/* Main Image */}
          <div
            className="flex justify-center items-center w-[calc(100%-80px)] h-[300px] sm:h-[350px] md:h-[400px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imageRef}
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg transition-transform duration-200 transform-gpu"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{product.name}</h1>

          <div className="flex gap-4 mb-4">
            <button className={`py-1 px-4 border-b-2 ${!showInquiry ? "border-red-500" : "border-transparent"}`} onClick={() => setShowInquiry(false)}>Description</button>
            <button className={`py-1 px-4 border-b-2 ${showInquiry ? "border-red-500" : "border-transparent"}`} onClick={() => setShowInquiry(true)}>Inquiry</button>
          </div>

          {!showInquiry ? (
            <p className="text-gray-700 mb-4 whitespace-pre-line">{product.description}</p>
          ) : (
            <div className="space-y-3">
              <input type="number" placeholder="Make Offer Price per Piece" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <p>Select Inquiry Quantity</p>
              <input type="number" placeholder="Quantity" value={quantity} min={product.moq} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border px-4 py-2 rounded" />
              <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <div className="flex items-center space-x-2">
                <span className="px-3 py-2 border rounded bg-gray-100">+91</span>
                <input type="text" placeholder="Mobile Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="flex-1 border px-4 py-2 rounded" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleInquiry} className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto min-w-[150px] text-center">Submit Inquiry</button>
                <a href={`https://wa.me/919534692414?text=${encodeURIComponent(`Hello, I am interested in the product "${product.name}".\nPrice per piece: ₹${product.price_per_piece}\nMOQ: ${product.moq}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-2 rounded w-full sm:w-auto min-w-[150px] text-center flex items-center justify-center">WhatsApp</a>
              </div>
            </div>
          )}

          <strong className="mt-4 block">Price Per Piece: ₹{Number(product.price_per_piece).toLocaleString("en-IN")}</strong>
          <p className="mt-2">Minimum Quantity: {product.moq}</p>
          <div className="flex items-center gap-2 mt-2">
            <input type="number" value={quantity} min={product.moq} onChange={(e) => setQuantity(Number(e.target.value))} className="border px-4 py-2 rounded w-28" />
            <strong>Total Price: ₹{product.price_per_piece * quantity}</strong>
          </div>

          {successMessage && <div className="mt-4 text-center text-green-600 font-semibold">{successMessage}</div>}

          <div className="mt-4">
            {isLoggedIn ? (
              <button className="bg-green-600 text-white px-6 py-2 rounded" onClick={handleOrder}>Order Now</button>
            ) : (
              <button className="bg-red-600 text-white px-6 py-2 rounded" onClick={() => router.push("/login")}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
