import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import CatalogPromo from "../components/CatalogPromo";
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Banner />
      <main className={`${styles.container} ${styles.main}`}>
        <h2>Welcome to E-Auction</h2>
        <p>Discover our amazing services and solutions designed just for you with best and Auctions Styling Products.</p>
        <div className={styles.live}>
          <a href="/auction" className={styles.button}>Live Auctions</a>
        </div>
        
        {/* Catalog Promo Section */}
        <CatalogPromo />
        <h2>Our Catalog</h2>
        <p>Discover our amazing services and solutions designed just for you with best and Catalog Styling Products.</p>
        <div className={styles.live}>
          <a href="/new-arrival" className={styles.button}>New Arrivals</a>
        </div>
        {/* Video Section */}
        <div className={styles.videoContainer}>
          <video className={styles.responsiveVideo} controls autoPlay loop muted>
            <source src="/uploads/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}
