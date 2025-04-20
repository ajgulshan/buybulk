import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/sendOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/verifyOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) {
      localStorage.setItem("token", data.token);
      // Redirect if needed
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login with OTP</h2>

        {step === 1 && (
          <>
            <input
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button style={styles.button} onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button style={styles.button} onClick={verifyOtp}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2",
    padding: "1rem",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "100%",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
