import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../styles/CatalogForm.module.css";

export default function CatalogForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append(key, data[key][0]); // file
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.status === 409) {
        alert(result.error); // SKU already exists
      } else if (!res.ok) {
        alert(result.message || "Something went wrong");
      } else {
        alert("Product added successfully!");
        setMessage("Product added successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <h2 className={styles.heading}>Add Product</h2>

      <label>Name:</label>
      <input className={styles.input}{...register("name", { required: "Name is required" })} type="text" />
      {errors.name && <span className={styles.error}>{errors.name.message}</span>}

      <label>SKU:</label>
      <input className={styles.input}{...register("sku", { required: "SKU is required" })} type="text" />
      {errors.sku && <span className={styles.error}>{errors.sku.message}</span>}

      <label>Brand:</label>
      <select className={styles.select}{...register("brand", { required: "Brand is required" })}>
        <option value="">Select Brand</option>
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
        <option value="Brand C">Brand C</option>
      </select>
      {errors.brand && <span className={styles.error}>{errors.brand.message}</span>}

      <label>MRP:</label>
      <input className={styles.input}{...register("mrp", { required: "MRP is required" })} type="number" />
      {errors.mrp && <span className={styles.error}>{errors.mrp.message}</span>}

      <label>Offer Price:</label>
      <input className={styles.input}{...register("offerPrice", { required: "Offer Price is required" })} type="number" />
      {errors.offerPrice && <span className={styles.error}>{errors.offerPrice.message}</span>}

      <label>Quantity:</label>
      <input className={styles.input}{...register("quantity", { required: "Quantity is required" })} type="number" />
      {errors.quantity && <span className={styles.error}>{errors.quantity.message}</span>}

      <label>Verified:</label>
      <div className={styles.radioGroup}>
        <label><input className={styles.input} {...register("verified", { required: true })} type="radio" value="yes" /> Yes</label>
        <label><input className={styles.input}{...register("verified", { required: true })} type="radio" value="no" /> No</label>
      </div>
      {errors.verified && <span className={styles.error}>Verification status is required</span>}

      <label>Description:</label>
      <textarea className={styles.textarea}{...register("description", { required: "Description is required" })}></textarea>
      {errors.description && <span className={styles.error}>{errors.description.message}</span>}

      <label>Image:</label>
      <input className={styles.input}{...register("image", { required: "Image is required" })} type="file" accept="image/*" />
      {errors.image && <span className={styles.error}>{errors.image.message}</span>}

      <button className={styles.button}>Submit</button>
      {message && <p className={styles.success}>{message}</p>}
    </form>
  );
}
