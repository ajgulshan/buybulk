import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Contact.module.css";

export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     setSubmitted(true);
//  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <h1>Contact Us</h1>
        <p>Feel free to reach out to us with any questions!</p>

        {/* {submitted ? (
          <p className={styles.success}>Thank you! Your message has been received.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />

            <button type="submit" className={styles.button}>Send Message</button>
          </form>
        )} */}

        <div className={styles.contactInfo}>
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>
      </main>
    </div>
  );
}
