import { useEffect, useState } from "react";
import Link from "next/link";

export default function Catalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/getProducts")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Full product list:", data.products);
        setProducts(data.products || []);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">BuyBulk Catalogue</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link href={`/pdp/${p.id}`} key={p.id}>
            <div
              className="bg-white shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-4 rounded-2xl text-center transform hover:scale-105 cursor-pointer"
            >
              <div className="w-full h-56 bg-white mb-3 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={`/uploads/sku/${p.sku}imgd.jpg`}
                  alt={p.name}
                  className="object-contain h-full w-full"
                />
              </div>
              <h2 className="text-md font-semibold">{p.name}</h2>
              <p className="text-sm text-orange-600">MOQ {p.moq}pcs</p>
              <p className="text-md text-green-600 font-bold">Rs {p.price_per_piece}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
