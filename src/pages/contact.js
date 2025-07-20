// pages/contact.js
import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const [feedback, setFeedback] = useState({ type: "", text: "" }); // success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", formData);
      setFeedback({ type: "success", text: "Submitted successfully!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      console.error("Submit error:", error);
      setFeedback({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row w-full shadow-xl m-4">
        {/* Left Black Section */}
        <div className="bg-black text-white p-8 lg:w-1/2 flex flex-col gap-6">
          {/* Email */}
          <div className="flex items-start gap-4">
            <span className="text-yellow-400 text-2xl">✉️</span>
            <div>
              <h2 className="text-lg font-bold">Write to Us</h2>
              <a href="mailto:contact@buybulk.co.in" className="hover:underline">
                contact@buybulk.co.in
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <span className="text-yellow-400 text-2xl">📞</span>
            <div>
              <h2 className="text-lg font-bold">Call Us</h2>
              <a href="tel:08130497050" className="hover:underline">
                081304 97050
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-4">
            <span className="text-yellow-400 text-2xl">📍</span>
            <div>
              <h2 className="text-lg font-bold">Store Address</h2>
              <p>
                
                1st Floor, No. 60, Shirdi Sai Baba Mandir Rd, Halasuru,<br />
                 Cambridge Layout, Bengaluru,<br />
                  Karnataka 560008
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 lg:w-1/2 border border-red-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            LOOKING FORWARD TO HEARING FROM YOU
          </h2>

          {/* Feedback Message */}
          {feedback.text && (
            <p className={`mb-4 text-sm font-semibold ${feedback.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {feedback.text}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-red-500 px-4 py-2"
              />
            </div>
            <div>
              <label>Your Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-red-500 px-4 py-2"
              />
            </div>
            <div>
              <label>Your Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-red-500 px-4 py-2"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter a 10-digit mobile number"
              />
            </div>

            <div>
              <label>Message *</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-red-500 px-4 py-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <label>
                I Authorize BuyBulk to send notifications via SMS/Whatsapp/Email
              </label>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 font-bold hover:bg-yellow-600"
            >
              SUBMIT →
            </button>
          </form>
        </div>
      </div>

      {/* Google Map - Bangalore */}
      <div className="w-full mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.51182401333!2d77.55427869304726!3d12.971598723029368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c94c5d8f%3A0x7dd8f37d20aa77b8!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1664544651977"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
