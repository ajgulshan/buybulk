import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/RegistrationForm.module.css";

const RegistrationForm = () => {
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [city, setCity] = useState("");

  // Function to fetch city based on pincode (Dummy function, replace with actual API)
  const fetchCityByPincode = async (pincode) => {
    if (pincode.length === 6) {
      // Example: Set city manually (Replace this with an actual API)
      const cityData = {
        "110001": "New Delhi",
        "400001": "Mumbai",
        "560001": "Bangalore"
      };
      setCity(cityData[pincode] || "Unknown City");
      setValue("city", cityData[pincode] || "Unknown City");
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    //e.preventDefault();
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Registration Form</h2>

      {/* Name Field */}
      <label>Name:</label>
      <input {...register("name", { required: "Name is required" })} type="text" />
      {errors.name && <span className={styles.error}>{errors.name.message}</span>}

      {/* Gender Field */}
      <label>Gender:</label>
      <select {...register("gender", { required: "Gender is required" })}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <span className={styles.error}>{errors.gender.message}</span>}

      {/* Email Field */}
      <label>Email:</label>
      <input
        {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email format" } })}
        type="email"
      />
      {errors.email && <span className={styles.error}>{errors.email.message}</span>}

      {/* Mobile Number Field */}
      <label>Mobile Number:</label>
      <input
        {...register("mobile", { required: "Mobile number is required", pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" } })}
        type="text"
      />
      {errors.mobile && <span className={styles.error}>{errors.mobile.message}</span>}

      {/* GST Number Field (Optional) */}
      <label>GST Number:</label>
      <input {...register("gst")} type="text" placeholder="Optional" />

      {/* Customer Type Field */}
      <label>Customer Type:</label>
      <select {...register("customerType", { required: "Customer type is required" })}>
        <option value="">Select Type</option>
        <option value="individual">Individual</option>
        <option value="business">Business</option>
      </select>
      {errors.customerType && <span className={styles.error}>{errors.customerType.message}</span>}

      {/* Address Field */}
      <label>Address:</label>
      <textarea {...register("address", { required: "Address is required" })}></textarea>
      {errors.address && <span className={styles.error}>{errors.address.message}</span>}

      {/* Pincode Field */}
      <label>Pincode:</label>
      <input
        {...register("pincode", { required: "Pincode is required", pattern: { value: /^[0-9]{6}$/, message: "Pincode must be 6 digits" } })}
        type="text"
        onBlur={(e) => fetchCityByPincode(e.target.value)}
      />
      {errors.pincode && <span className={styles.error}>{errors.pincode.message}</span>}

      {/* City Field (Auto-filled) */}
      <label>City:</label>
      <input {...register("city")} type="text" value={city} readOnly />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;