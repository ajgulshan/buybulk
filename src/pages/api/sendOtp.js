// pages/api/sendOtp.js
export default async function handler(req, res) {
  const { phone } = req.body;

  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
    );
    const data = await response.json();

    console.log("2Factor response:", data);

    if (data.Status !== "Success") {
      throw new Error("OTP failed to send");
    }

    res.status(200).json({ message: "OTP sent successfully", sessionId: data.Details });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
}
