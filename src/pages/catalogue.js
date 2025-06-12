import { useEffect, useState } from "react";
import Link from "next/link";

export default function Catalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getProducts")
      .then((res) => res.json())
      .then((data) => {
        // console.log("📦 Full product list:", data.products);
        setProducts(data.products || []);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">BUYBULK CATALOGUE</h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 mt-20 text-lg">
          We are coming Soon With your choice of Bulk Shopping
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link href={`/cat/${p.id}`} key={p.id}>
              <div className="relative bg-white shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-4 rounded-2xl text-center transform hover:scale-105 cursor-pointer">
                
                {/* ✅ Green Tick if verified */}
                {p.verified === 1 && (
                  <div className="absolute top-2 right-2 text-white rounded-full p-1">
                    ✅
                  </div>
                )}

                <div className="w-full h-56 bg-white mb-3 flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={`/uploads/sku/${p.sku}imgd.jpg`}
                    alt={p.name}
                    className="object-contain h-full w-full"
                  />
                </div>
                <h2 className="text-md font-semibold">{p.name}</h2>
                <p className="text-sm text-orange-600">MOQ {p.moq}pcs</p>
                <p className="text-md text-green-600 font-bold">₹ {p.price_per_piece}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
