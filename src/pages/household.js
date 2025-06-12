
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Household() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    fetch("/api/getHousehold")
      .then((res) => res.json())
      .then((data) => {
        // console.log("📦 Full product list:", data.products);
        setProducts(data.products || []);
        setFiltered(data.products || []);

        // Collect unique categories from fetched data
        const uniqueCategories = [
          ...new Set(
            data.products.flatMap((item) =>
              item.category ? item.category.split(",") : []
            )
          ),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.category
            ?.toUpperCase()
            .split(",")
            .map((c) => c.trim())
            .includes(selectedCategory.toUpperCase())
        )
      );
    }
  }, [selectedCategory, products]);
  

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">BUYBULK HOUSE CATALOGUE</h1>

      {/* Mobile Filter Button and Clear */}
      <div className="md:hidden flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShowFilterModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow"
        >
          Filter Category
        </button>
        {selectedCategory !== "All" && (
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-red-600 bg-white border border-red-600 px-3 py-2 rounded-full shadow hover:bg-red-50"
          >
            ❌ Clear
          </button>
        )}
      </div>

      {/* Mobile Filter Modal */}
      {showFilterModal && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-sm">
            <h2 className="text-lg font-bold mb-4">Select Category</h2>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setShowFilterModal(false);
              }}
              className="text-sm text-red-500 underline mb-4"
            >
              ❌ Clear Filter
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowFilterModal(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded mb-2 ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {cat.toUpperCase()}

              </button>
            ))}
            <button
              onClick={() => setShowFilterModal(false)}
              className="block w-full mt-4 bg-red-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Layout: Sidebar + Grid */}
      <div className="flex flex-col md:flex-row">
        {/* Left Filter - Desktop Only */}
        <div className="hidden md:block md:w-1/4 bg-white p-4 shadow-md rounded-md mr-4">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <button
            onClick={() => setSelectedCategory("All")}
            className={`block w-full text-left px-3 py-2 rounded mb-2 ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 rounded mb-2 ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
          
        {filtered
          .filter((p) => parseInt(p.quantity) > parseInt(p.moq)) // ✅ Only show if quantity > moq
          .map((p) => (
            <Link href={`/pdp/${p.id}`} key={p.id}>
              <div className="cursor-pointer bg-white shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-4 rounded-2xl text-center transform hover:scale-105 relative">
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
                <p className="text-sm text-orange-600 uppercase">{p.category}</p>
                <h2 className="text-md font-semibold">{p.name}</h2>
                <p className="text-md text-green-600 font-bold">Rs {p.price_per_piece}</p>
              </div>
            </Link>
        ))}

        </div>
      </div>
    </div>
  );
}
