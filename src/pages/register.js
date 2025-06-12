import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styles from "../styles/RegistrationForm.module.css";
import Link from 'next/link';
import Message from "../components/Message";

const RegistrationForm = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setTimeout(() => router.push("/login"), 1500);
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

      <label>Preferable Category:</label>
      <select {...register("preferableCategory", { required: "Category is required" })}>
        <option value="">Select Category</option>
        <option value="Men Wear">Men Wear</option>
        <option value="Women Wear">Women Wear</option>
        <option value="Kids Wear">Kids Wear</option>
        <option value="Mix lot -Mens/womens/Kids/Footwear/ Accessories">Mix lot -Mens/womens/Kids/Footwear/ Accessories</option>
        <option value="Electronic items-TV/Fridge/AC/Washing Machine">Electronic items-TV/Fridge/AC/Washing Machine</option>
      </select>
      {errors.preferableCategory && <span className={styles.error}>{errors.preferableCategory.message}</span>}

      <label>Company Name:</label>
      <input {...register("companyName", { required: "Company Name is required" })} type="text" />
      {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}

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
      <input {...register("gst")} type="text" placeholder="Add your GST" />

      <label>Customer Type:</label>
      <select {...register("customerType", { required: "Customer type is required" })}>
        <option value="">Select Type</option>
        <option value="Buyer">Buyer</option>
        <option value="Seller">Seller</option>
        <option value="Manufacturer">Manufacturer</option>
        <option value="Buyer-Seller">Buyer-Seller</option>
      </select>
      {errors.customerType && <span className={styles.error}>{errors.customerType.message}</span>}

      <label>Turnover:</label>
      <select {...register("turnover", { required: "Turnover is required" })}>
        <option value="">Select Turnover</option>
        <option value="Upto 10lacs">Upto 10lacs</option>
        <option value="10lacs to 25lacs">10lacs to 25lacs</option>
        <option value="25lacs to 50lacs">25lacs to 50lacs</option>
        <option value="50lacs to 1Cr">50lacs to 1Cr</option>
        <option value="1cr to 2cr">1cr to 2cr</option>
        <option value="2cr to 5cr">2cr to 5cr</option>
        <option value="5cr to 10cr">5cr to 10cr</option>
        <option value="10cr to 50Cr above">10cr to 50Cr above</option>
      </select>
      {errors.turnover && <span className={styles.error}>{errors.turnover.message}</span>}

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
        Existing User? <Link href="/login" className={styles.signupLink}>Sign In</Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
