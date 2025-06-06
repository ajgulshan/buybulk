import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function LiveAuction() {
  const [currentBid, setCurrentBid] = useState(100);
  const [bids, setBids] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // in seconds
  const [auctionEnded, setAuctionEnded] = useState(false);
  const bidRef = useRef(null);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setAuctionEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Socket listeners
  useEffect(() => {
    socket.on('init', ({ currentBid, bids }) => {
      setCurrentBid(currentBid);
      setBids(bids);
    });

    socket.on('newBid', (bid) => {
      setCurrentBid(bid.bid);
      setBids(prev => [...prev, bid]);
    });
  }, []);

  const placeBid = () => {
    const bid = parseInt(bidRef.current.value);
    if (auctionEnded) return;
    if (bid > currentBid) {
      socket.emit('placeBid', bid);
      bidRef.current.value = '';
    } else {
      alert("Bid must be higher than current bid.");
    }
  };

  // Convert seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="container">
      <h1>🧥 Live Hoodie Auction</h1>
      <img src="/pexels-kaip-996329.jpg" alt="hoodie" width="500" />
      <p><strong>Current Bid:</strong> ₹{currentBid}</p>
      <p className="timer">⏰ Time Left: {formatTime(timeLeft)}</p>

      <input type="number" ref={bidRef} placeholder="Enter your bid" disabled={auctionEnded} />
      <button onClick={placeBid} disabled={auctionEnded}>
        {auctionEnded ? 'Auction Ended' : 'Place Bid'}
      </button>

      <h3>Bid History</h3>
      <ul>
        {bids.map((b, i) => (
          <li key={i}>₹{b.bid} at {b.time}</li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          text-align: center;
          font-family: sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }
        .timer {
          font-size: 20px;
          color: ${auctionEnded ? 'red' : 'green'};
          margin-bottom: 10px;
        }
        input {
          padding: 10px;
          margin: 10px;
        }
        button {
          background: ${auctionEnded ? '#888' : '#0070f3'};
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: ${auctionEnded ? 'not-allowed' : 'pointer'};
        }
      `}</style>
    </div>
  );
}