// components/Message.js
import styles from "../styles/Message.module.css";

export default function Message({ type, text }) {
  if (!text) return null;

  return (
    <div className={`${styles.message} ${type === "success" ? styles.success : styles.error}`}>
      {text}
    </div>
  );
}
