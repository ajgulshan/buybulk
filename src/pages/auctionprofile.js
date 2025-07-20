import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuctionProfile() {
  const router = useRouter();
  const [auctionId, setAuctionId] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [authorized, setAuthorized] = useState(false);

  const [formData, setFormData] = useState({
    auctionSku: "",
    auctionName: "",
    description: "",
    brand: "",
    category: "",
    initialBid: "",
    incrementBid: "",
    live: "now",
    duration: "60",
    bidStartTime: "",
    turnover: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("bbn");
    if (!token) {
      router.push("/profile");
      return;
    }

    try {
      const user = JSON.parse(token);
      const allowedNumbers = ["9534692414", "1234567890", "1122334455"];
      if (!allowedNumbers.includes(user.mobile)) {
        router.push("/profile");
        return;
      }
      setAuthorized(true);
    } catch {
      router.push("/profile");
    }
  }, []);

  const fetchNextAuctionId = async () => {
    try {
      const res = await axios.get("/api/auction/next-id");
      setAuctionId(res.data.auctionId);
    } catch {
      setMessage({ type: "error", text: "Failed to fetch Auction ID." });
    }
  };

  useEffect(() => {
    if (authorized) fetchNextAuctionId();
  }, [authorized]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save auction data
      await axios.post("/api/auction/create", { auctionId, ...formData });

      // Fetch and log users by turnover
      const res = await axios.post("/api/auction/users-by-turnover", {
        turnover: formData.turnover,
      });
      console.log("Matching Users:", res.data.emails); // logs null if no match      

      setMessage({ type: "success", text: "Auction created successfully!" });
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: "Error creating auction. Try again." });
    }
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 p-6">
      {/* Left Side */}
      <div className="lg:w-1/3 mb-6 lg:mb-0 lg:mr-10">
        <div className="bg-white shadow p-6 rounded space-y-4">
          <button
            onClick={() => router.push("/profile")}
            className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Go to Profile
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="block w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="lg:w-2/3 bg-white shadow p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Create Auction</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={auctionId} disabled className="border p-2" />
          <input
            type="text"
            name="auctionSku"
            value={formData.auctionSku}
            onChange={handleChange}
            required
            placeholder="Auction SKU"
            className="border p-2"
          />
          <input
            type="text"
            name="auctionName"
            value={formData.auctionName}
            onChange={handleChange}
            required
            placeholder="Auction Name *"
            className="border p-2"
          />
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Select Brand *</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Zara">Zara</option>
            <option value="H&M">H&M</option>
            <option value="Levi's">Levi's</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Select Category Type *</option>
            <option value="Top">Top</option>
            <option value="Pant">Pant</option>
            <option value="Shirt">Shirt</option>
            <option value="Tshirt">Tshirt</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            name="initialBid"
            value={formData.initialBid}
            onChange={handleChange}
            required
            placeholder="Initial Bid Amount *"
            className="border p-2"
          />
          <input
            type="number"
            name="incrementBid"
            value={formData.incrementBid}
            onChange={handleChange}
            required
            placeholder="Increase Bid By Amount *"
            className="border p-2"
          />

          {/* Turnover Dropdown */}
          <select
            name="turnover"
            value={formData.turnover}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="">Select Turnover *</option>
            <option value="Upto 10lacs">Upto 10lacs</option>
            <option value="10lacs to 25lacs">10lacs to 25lacs</option>
            <option value="25lacs to 50lacs">25lacs to 50lacs</option>
            <option value="50lacs to 1Cr">50lacs to 1Cr</option>
            <option value="1cr to 2cr">1cr to 2cr</option>
            <option value="2cr to 5cr">2cr to 5cr</option>
            <option value="5cr to 10cr">5cr to 10cr</option>
            <option value="10cr to 50Cr above">10cr to 50Cr above</option>
          </select>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="border p-2"
          >
            {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((min) => (
              <option key={min} value={min}>
                Live Time: {min} minutes
              </option>
            ))}
          </select>

          <div className="flex gap-2 items-center">
            <label>
              <input
                type="radio"
                name="live"
                value="now"
                checked={formData.live === "now"}
                onChange={handleChange}
                required
              />{" "}
              Start Now
            </label>
            <label>
              <input
                type="radio"
                name="live"
                value="later"
                checked={formData.live === "later"}
                onChange={handleChange}
              />{" "}
              Start Later
            </label>
          </div>

          <input
  type="datetime-local"
  name="bidStartTime"
  value={formData.bidStartTime}
  onChange={(e) => {
    handleChange(e);
    // Only blur when full datetime (YYYY-MM-DDTHH:MM) is selected
    if (e.target.value.length >= 16) {
      e.target.blur(); // closes picker
    }
  }}
  required
  className="border p-2"
/>


          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Auction Description *"
            className="border p-2 col-span-2"
          />

          <button
            type="submit"
            className="col-span-2 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700"
          >
            Create Auction
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-4 text-sm font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
