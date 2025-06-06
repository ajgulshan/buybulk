// // pages/auction.js
import styles from "../styles/Auction.module.css";

export default function Auction() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Auction Page</h1>
      <div className={styles.content}>
        <p className={styles.message}>
          This page is under construction. The auction functionality will be available soon.
        </p>
        <p className={styles.info}>
          Stay tuned for upcoming auctions and features!
        </p>
      </div>
    </div>
  );
}