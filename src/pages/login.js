import { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Message from "../components/Message";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const sendOtp = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const res = await fetch("/api/sendOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccessMessage(data.message || "OTP sent successfully");
      setSessionId(data.sessionId);
      setStep(2);
    } else if(phone.length!=10){
      setErrorMessage("Invalid Phone Number, it should be 10 digit");
    } else {
      setErrorMessage(data.error || "Something went wrong. Please try again.");
    }
  };

  const verifyOtp = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const res = await fetch("/api/verifyOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp, sessionId }),
    });
    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.error || "Invalid OTP or verification failed");
    } else {
      setSuccessMessage(data.message || "Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("bb", data.encryptedUser);
      localStorage.setItem("bbn", JSON.stringify(data.cuser));
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login with OTP</h2>

        <Message type="success" text={successMessage} />
        <Message type="error" text={errorMessage} />

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

        <p style={styles.signupText}>
          New User? <Link href="/register" style={styles.signupLink}>Sign Up</Link>
        </p>
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
  signupText: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.95rem",
    color: "#333",
  },
  signupLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px",
  },
};
