import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} My Website. All Rights Reserved.</p>
    </footer>
  );
}
