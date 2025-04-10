import { useState, useEffect } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => console.log("reCAPTCHA solved", response),
        "expired-callback": () => {
          console.log("reCAPTCHA expired, resetting...");
          window.recaptchaVerifier = null;
        },
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendOtp = async () => {
    try {
      if (!phone.match(/^\+?[1-9]\d{6,14}$/)) {
        alert("Enter a valid phone number in international format (e.g., +919876543210)");
        return;
      }
      setLoading(true);

      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
        window.recaptchaVerifier.render();
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      setLoading(false);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!otp) {
        alert("Enter OTP");
        return;
      }
      setLoading(true);
      await confirmation.confirm(otp);
      alert("Login Successful!");
      window.location.reload();
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      alert("Invalid OTP. Try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Phone (+91...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp} disabled={loading}>Send OTP</button>

      {confirmation && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} disabled={loading}>Verify OTP</button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
