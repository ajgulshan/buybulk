import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function GetContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("bbn");
    if (!token) {
      router.push("/login"); // redirect if not logged in
      return;
    }
  
    try {
      const user = JSON.parse(token); // directly parse JSON
      const allowedNumbers = ["9534692414", "1234567890"];
      if (allowedNumbers.includes(user.mobile)) {
        setAuthorized(true);
        fetch("/api/get-contact")
          .then((res) => res.json())
          .then((data) => {
            setContacts(data.contacts || []);
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
      <h1 className="text-xl font-bold mb-4">Contact Submissions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Message</th>
              <th className="border px-2 py-1">Consent</th>
              <th className="border px-2 py-1">Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td className="border px-2 py-1">{c.id}</td>
                <td className="border px-2 py-1">{c.name}</td>
                <td className="border px-2 py-1">{c.email}</td>
                <td className="border px-2 py-1">{c.phone}</td>
                <td className="border px-2 py-1">{c.message}</td>
                <td className="border px-2 py-1">{c.consent ? "Yes" : "No"}</td>
                <td className="border px-2 py-1">
                  {new Date(c.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
