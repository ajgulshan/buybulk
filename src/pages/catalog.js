import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styles from "../styles/CatalogForm.module.css";
import Message from "../components/Message";
import { useRouter } from "next/router";

export default function CatalogForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [showCatalogType, setShowCatalogType] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const bbn = localStorage.getItem("bbn");
    if (!token && !bbn) {
      router.push("/profile");
    }
    if (bbn) {
      const user = JSON.parse(bbn);
      setMobile(user.mobile);

      if (["9534692414", "1234567890"].includes(user.mobile)) {
        setShowCatalogType(true);
      }
    }
  }, []);

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    for (const key in data) {
      if (key === "image" || key === "image1" || key === "image2") {
        if (data[key]?.[0]) formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    formData.append("bbn", localStorage.getItem("bbn"));

    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.message || "Something went wrong");
      } else {
        setSuccessMessage(result.message || "Product added successfully!");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setErrorMessage("Error submitting form: " + err.message);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h2 className={styles.heading}><strong>Add Catalog Product</strong></h2>

      <label>Product Name:</label>{errors.name && <span className={styles.error}>{errors.name.message}</span>}
      <input className={styles.input} {...register("name", { required: "Name is required" })} />
      

      <label>Price Per Piece:</label>      {errors.pricePerPiece && <span className={styles.error}>{errors.pricePerPiece.message}</span>}

      <input className={styles.input} type="number" {...register("pricePerPiece", { required: "Price per piece is required" })} />

      <label>Brand:</label>      {errors.brand && <span className={styles.error}>{errors.brand.message}</span>}

      <select className={styles.select} {...register("brand", { required: "Brand is required" })}>
        <option value="">Select Brand</option>
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
      </select>

      <label>MOQ (Min Order Quantity):</label>      {errors.moq && <span className={styles.error}>{errors.moq.message}</span>}

      <input className={styles.input} type="number" {...register("moq", { required: "MOQ is required" })} />

      <label>Total Quantity:</label>      {errors.quantity && <span className={styles.error}>{errors.quantity.message}</span>}

      <input className={styles.input} type="number" {...register("quantity", { required: "Quantity is required" })} />
      {showCatalogType && (
        <>
      <label>Verified:</label>      {errors.verified && <span className={styles.error}>Please select verification status</span>} 
      <div className={styles.radioGroup}>
        <label><input type="radio" value="yes" {...register("verified", { required: true })} /> Yes</label>
        <label><input type="radio" value="no" {...register("verified", { required: true })} /> No</label>
      </div>
      </>
      )}
      <label>City:</label>      {errors.city && <span className={styles.error}>{errors.city.message}</span>}

      <input className={styles.input} {...register("city", { required: "City is required" })} />

      <label>Address:</label>      {errors.address && <span className={styles.error}>{errors.address.message}</span>}

      <textarea className={styles.textarea} {...register("address", { required: "Address is required" })}></textarea>

      <label>State:</label>      {errors.state && <span className={styles.error}>{errors.state.message}</span>}

      <select className={styles.select} {...register("state", { required: "State is required" })}>
      <option value="">Select State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
        <option value="Delhi">Delhi</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Ladakh">Ladakh</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Puducherry">Puducherry</option>
      </select>

      <label>Category:</label>
      {errors.category && (
        <span className={styles.error}>{errors.category.message}</span>
      )}
      <select
        className={styles.select}
        {...register("category", { required: "Please select a category" })}
      >
        <option value="">Select Category</option>
        <option value="top">Top</option>
        <option value="pant">Pant</option>
        <option value="shirt">Shirt</option>
        <option value="tshirt">T-Shirt</option>
      </select>
      

      <label>Description:</label>      {errors.description && <span className={styles.error}>{errors.description.message}</span>}

      <textarea className={styles.textarea} {...register("description", { required: "Description is required" })}></textarea>

      <div className={styles.uploadSection}>
        <label className={styles.uploadLabel}>Main Image (Required):</label>
        {errors.image && <span className={styles.error}>{errors.image.message}</span>}

        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          {...register("image", { required: "Main image is required" })}
        />

        <label className={styles.uploadLabel}>Optional Image 1 (Max 2MB):</label>
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          {...register("image1")}
        />

        <label className={styles.uploadLabel}>Optional Image 2 (Max 2MB):</label>
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          {...register("image2")}
        />
      </div>
      {showCatalogType && (
        <>
          <label>Catalog Type:</label>
          <select className={styles.select} {...register("catalog", { required: true })} defaultValue="BuyBulk Self">
            <option value="BuyBulk Self">BuyBulk Self</option>
            <option value="BuyBulk Household">BuyBulk Household</option>
          </select>
        </>
      )}


      <Message type="success" text={successMessage} />
      <Message type="error" text={errorMessage} />
      <button className={styles.button}>Submit</button>
    </form>
  );
}
