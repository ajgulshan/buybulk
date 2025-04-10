import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Banner />
      <main className={`${styles.container} ${styles.main}`}>
        <h2>Welcome to E-Auction</h2>
        <p>Discover our amazing services and solutions designed just for you with best and Auctions Styling Products.</p>
        <a href="#" className={styles.button}>Live Auctions</a>
        {/* Video Section */}
        <div className={styles.videoContainer}>
          <video className={styles.responsiveVideo} controls autoPlay loop muted>
            <source src="/auction.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}
