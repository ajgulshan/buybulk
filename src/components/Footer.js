import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} My Website. All Rights Reserved.</p>
      <div className={styles.contact}>
        <p>Email: <a href="mailto:test@email.com">test@email.com</a></p>
        <p>Contact: <a href="tel:+9191919191">+91 9191919191</a></p>
      </div>
    </footer>
  );
}
