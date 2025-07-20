import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function AuctionPage() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get("/api/auction/all");
        setAuctions(res.data);
      } catch (error) {
        console.error("Failed to load auctions", error);
      }
    };
    fetchAuctions();
  }, []);

  const getLiveTillInfo = (bidStartTime, duration) => {
    const start = new Date(bidStartTime);
    const end = new Date(start.getTime() + duration * 60000);
    const now = new Date();

    const diffMs = end - now;
    const remainingMin = Math.max(0, Math.floor(diffMs / 60000));
    const remainingHr = Math.floor(remainingMin / 60);
    const remainingMins = remainingMin % 60;

    return {
      liveTill: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      remaining: diffMs > 0 ? `${remainingHr}h ${remainingMins}m` : "Ended",
    };
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Live Auctions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {auctions.map((auction) => {
          const { liveTill, remaining } = getLiveTillInfo(auction.bidStartTime, auction.duration);

          return (
            <div
              key={auction.id}
              className="relative rounded-xl overflow-hidden shadow-xl group hover:shadow-2xl transition"
            >
              {/* Full-card click layer */}
<Link
  href={`/auction/${auction.auctionId}`}
  className="absolute inset-0 z-30"
  aria-label="Go to auction"
/>


              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                style={{ backgroundImage: "url('/uploads/sst.jpg')" }}
              ></div>

              {/* White card content */}
              <div className="bg-white p-4 rounded-xl shadow-md relative z-10">
                {/* Time Info */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-20">
                  <span>⏰</span>
                  <span>
                    {remaining !== "Ended" ? `Live till ${liveTill} (${remaining})` : "Auction Ended"}
                  </span>
                </div>

                {/* Auction Content */}
                <div className="relative z-20 space-y-1 text-gray-800">
                  <h2 className="text-lg font-bold truncate">{auction.auctionName}</h2>
                  <p className="text-sm">Brand: {auction.brand}</p>
                  <p className="text-sm">Category: {auction.category}</p>
                  <p className="text-sm font-medium">Initial Bid: ₹{auction.initialBid}</p>
                  <p className="text-xs text-gray-600">
                    {auction.description?.slice(0, 80)}...
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
