import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch("/api/protectedRoute", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setUser(data.user);
          setLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, user #{user.id}</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
