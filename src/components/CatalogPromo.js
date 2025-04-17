import styles from "../styles/CatalogPromo.module.css";
import Link from "next/link";

const CatalogPromo = () => {
    return (
        <section className={styles.container}>
          <div className={styles.cardWrapper}>
            <Link href="/new-arrival" className={styles.card}>
              <div className={styles.imageContainer}>
                <img src="/uploads/cloth.jpeg" alt="New Arrival Left" />
              </div>
            </Link>
            <Link href="/new-arrival" className={styles.card}>
              <div className={styles.imageContainer}>
                <img src="/uploads/cloth.jpeg" alt="New Arrival Right" />
              </div>
            </Link>
          </div>
        </section>
      );
    };

export default CatalogPromo;
