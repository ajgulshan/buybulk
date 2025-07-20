import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AuctionDetail() {
  const router = useRouter();
  const { auctionId } = router.query;
  const [auction, setAuction] = useState(null);
  const [status, setStatus] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (!auctionId) return;
    axios.get(`/api/auction/${auctionId}`).then((res) => {
      setAuction(res.data);
      checkAuctionStatus(res.data);
    });
  }, [auctionId]);

  // Timer updater
  useEffect(() => {
    let interval;
    if (auction && status === "Live") {
      interval = setInterval(() => {
        updateRemainingTime(auction.bidStartTime, auction.duration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [auction, status]);

  const checkAuctionStatus = (data) => {
    const start = new Date(data.bidStartTime);
    const end = new Date(start.getTime() + data.duration * 60000);
    const now = new Date();

    if (now < start) {
      setStatus("Coming Soon");
    } else if (now >= start && now <= end) {
      setStatus("Live");
    } else {
      setStatus("Auction Ended");
    }
  };

  const updateRemainingTime = (startTime, duration) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) {
      setStatus("Auction Ended");
      setRemainingTime("");
      return;
    }

    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    setRemainingTime(`${mins}m ${secs}s`);
  };

  const handleBidNow = async () => {
    const token = localStorage.getItem("bbn");
    if (!token) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(token);

    const bidAmount =
  parseFloat(auction.currentBidPrice || auction.initialBid) +
  parseFloat(auction.incrementBid);


    try { console.log(user);
      await axios.post("/api/auction/bid", {
        auctionId: auction.auctionId,
        auctionSku: auction.auctionSku,
        auctionName: auction.auctionName,
        userName: user.name,
        userEmail: user.email,
        userMobile: user.mobile,
        bidAmount,
      });

      router.push({
        pathname: `/auction/success`,
        query: { auctionId: auction.auctionId },
      });
    } catch (err) {
      alert("Bid failed. Please try again.");
    }
  };

  if (!auction) return <div className="p-6">Loading auction...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{auction.auctionName}</h1>
      <p className="text-gray-600 mb-1">Brand: {auction.brand}</p>
      <p className="text-gray-600 mb-1">Category: {auction.category}</p>
      <p className="text-gray-600 mb-1">
      Current Bid Price: ₹{
  (parseFloat(auction.currentBidPrice) + parseFloat(auction.initialBid)).toFixed(2)
}
      </p>
      <p className="text-gray-600 mb-3">{auction.description}</p>

      <div className="mb-4 text-lg font-semibold">
        Status:{" "}
        <span className={status === "Live" ? "text-green-600" : "text-gray-500"}>
          {status}
        </span>
        {status === "Live" && remainingTime && (
          <span className="ml-4 text-sm text-blue-600">
            ⏳ Ends in: {remainingTime}
          </span>
        )}
      </div>

      {status === "Live" && (
        <button
          onClick={handleBidNow}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Bid Now
        </button>
      )}

      {status === "Coming Soon" && (
        <div className="text-sm italic text-gray-500">Auction has not started yet.</div>
      )}

      {status === "Auction Ended" && (
        <div className="text-sm italic text-red-500">Auction has ended.</div>
      )}
    </div>
  );
}
