import { useState } from "react";
import { useRouter } from "next/router"; // ✅ Import useRouter
import { useForm } from "react-hook-form";
import styles from "../styles/RegistrationForm.module.css";
import Link from 'next/link';
import Message from "../components/Message";

const RegistrationForm = () => {
  const router = useRouter(); // ✅ Initialize router
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [city, setCity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch city based on pincode (Dummy function, replace with actual API)
  // const fetchCityByPincode = async (pincode) => {
  //   if (pincode.length === 6) {
  //     const cityData = {
  //       "110001": "New Delhi",
  //       "400001": "Mumbai",
  //       "560001": "Bangalore"
  //     };
  //     setCity(cityData[pincode] || "Unknown City");
  //     setValue("city", cityData[pincode] || "Unknown City");
  //   }
  // };

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        setErrorMessage(result.error || "Something went wrong");
      } else {
        setSuccessMessage("User registered successfully!");
        setTimeout(() => {
          router.push("/login"); // ✅ Redirect to login
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong!");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2><strong>Registration Form</strong></h2>

      <label>Name:</label>
      <input {...register("name", { required: "Name is required" })} type="text" />
      {errors.name && <span className={styles.error}>{errors.name.message}</span>}

      <label>Gender:</label>
      <select {...register("gender", { required: "Gender is required" })}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <span className={styles.error}>{errors.gender.message}</span>}

      <label>Email:</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email format" }
        })}
        type="email"
      />
      {errors.email && <span className={styles.error}>{errors.email.message}</span>}

      <label>Mobile Number:</label>
      <input
        {...register("mobile", {
          required: "Mobile number is required",
          pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" }
        })}
        type="text"
      />
      {errors.mobile && <span className={styles.error}>{errors.mobile.message}</span>}

      <label>GST Number:</label>
      <input {...register("gst")} type="text" placeholder="Optional" />

      <label>Customer Type:</label>
      <select {...register("customerType", { required: "Customer type is required" })}>
        <option value="">Select Type</option>
        <option value="Buyer">Buyer</option>
        <option value="Seller">Seller</option>
        <option value="Manufacturer">Manufacturer</option>
        <option value="both">Buyer-Seller</option>
      </select>
      {errors.customerType && <span className={styles.error}>{errors.customerType.message}</span>}

      <label>Address:</label>
      <textarea {...register("address", { required: "Address is required" })}></textarea>
      {errors.address && <span className={styles.error}>{errors.address.message}</span>}

      <label>Pincode:</label>
      <input
        {...register("pincode", {
          required: "Pincode is required",
          pattern: { value: /^[0-9]{6}$/, message: "Pincode must be 6 digits" }
        })}
        type="text"
      />
      {errors.pincode && <span className={styles.error}>{errors.pincode.message}</span>}

      <label>City:</label>
      <input {...register("city", { required: "City is required" })} type="text" />
      {errors.city && <span className={styles.error}>{errors.city.message}</span>}
      <Message type="success" text={successMessage} />
      <Message type="error" text={errorMessage} />

      <button type="submit">Register</button>
      <p className={styles.signupText}>
        Existing User?
        <Link href="/login" className={styles.signupLink}>Sign In</Link>
      </p>

    </form>
  );
};

export default RegistrationForm;