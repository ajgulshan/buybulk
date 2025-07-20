import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BuybulkInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("bbn");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(token); // assume token is a simple JSON string
      const allowedNumbers = ["9534692414", "1234567890"];
      if (allowedNumbers.includes(user.mobile)) {
        setAuthorized(true);
        fetch("/api/get-buybulkinquiry")
          .then((res) => res.json())
          .then((data) => {
            setInquiries(data.inquiries || []);
            setLoading(false);
          });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/login");
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">BuyBulk Inquiries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Product ID</th>
              <th className="border px-2 py-1">Product Name</th>
              <th className="border px-2 py-1">SKU</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Offer Price</th>
              <th className="border px-2 py-1">Customer Name</th>
              <th className="border px-2 py-1">Contact Number</th>
              <th className="border px-2 py-1">Created At</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id}>
                <td className="border px-2 py-1">{i.id}</td>
                <td className="border px-2 py-1">{i.product_id}</td>
                <td className="border px-2 py-1">{i.product_name}</td>
                <td className="border px-2 py-1">{i.sku}</td>
                <td className="border px-2 py-1">{i.quantity}</td>
                <td className="border px-2 py-1">₹{i.offer_price_per_piece}</td>
                <td className="border px-2 py-1">{i.customer_name}</td>
                <td className="border px-2 py-1">{i.contact_number}</td>
                <td className="border px-2 py-1">
                  {new Date(i.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
