import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth on mount
    const token = localStorage.getItem("bbn");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(token); // No JWT, just plain JSON string
      const allowedNumbers = ["9534692414", "1234567890"];
      if (allowedNumbers.includes(user.mobile)) {
        setAuthorized(true);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Token parse error:", err);
      router.push("/login");
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`/api/users?search=${search}`);
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authorized) {
      fetchUsers();
    }
  }, [search, authorized]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  if (!authorized) {
    return <p className="p-4">Checking access...</p>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
          className="border px-2 py-1"
        />
        <button onClick={clearSearch} className="bg-gray-200 px-2 py-1">
          Clear Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Mobile</th>
              <th className="border px-2 py-1">GST</th>
              <th className="border px-2 py-1">Company</th>
              <th className="border px-2 py-1">Customer Type</th>
              <th className="border px-2 py-1">City</th>
              <th className="border px-2 py-1">Preferred Categories</th>
              <th className="border px-2 py-1">Turnover</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-2 py-1">{u.name}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.mobile}</td>
                <td className="border px-2 py-1">{u.gst}</td>
                <td className="border px-2 py-1">{u.companyName}</td>
                <td className="border px-2 py-1">{u.customerType}</td>
                <td className="border px-2 py-1">{u.city}</td>
                <td className="border px-2 py-1">{u.preferableCategory}</td>
                <td className="border px-2 py-1">{u.turnover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
