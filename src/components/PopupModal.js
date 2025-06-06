import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Link from 'next/link';



export default function PopupModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000); // 1-second delaya
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-0 rounded-lg shadow-lg relative w-full max-w-4xl mx-auto">
      
    
    {/* Close Button ABOVE Banner */}
    <button
      className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow-md transition z-10"
      onClick={() => setShow(false)}
    >
      ×
    </button>

    {/* Banner */}
    <Banner />

    {/* Grid with 4 Links */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 justify-items-center items-center">
      <Link href="/catalogue">
        <img
          src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/56e2972a-dbdb-4d9e-4982-b54e4bb3e000/public"
          alt="Value Shopee Catalogue"
          title="Value Shopee Catalogue"
          className="w-32 sm:w-40 lg:w-48 hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>

      <Link href="/household">
        <img
          src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/b3034396-f780-4355-2ac1-03289bf0aa00/public"
          alt="Deal From Others"
          title="Deal From Others"
          className="w-32 sm:w-40 lg:w-48 hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>

      <Link href="/catalog">
        <img
          src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/41899dcc-3b30-46bf-bea6-62738ed9b700/public"
          alt="Sell Your Surplus"
          title="Sell Your Surplus"
          className="w-32 sm:w-40 lg:w-48 hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>

      <Link href="/auction">
        <img
          src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/b3034396-f780-4355-2ac1-03289bf0aa00/public"
          alt="Auction"
          title="Auction"
          className="w-32 sm:w-40 lg:w-48 hover:scale-105 transition-transform cursor-pointer"
        />
      </Link>
    </div>
  </div>
</div>

  );
}
