import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import CatalogPromo from "../components/CatalogPromo";
import Head from 'next/head';
import Link from 'next/link';
import AnythingToEverything from "@/components/AnythingToEverything";
import BuyersGuide from "@/components/BuyersGuide";
import SellersGuide from "@/components/SellersGuide";
import PopupModal from "@/components/PopupModal";

export default function Home() {
  return (
    <div bg-white > 
    <PopupModal />
      <div>
        <AnythingToEverything />
      </div>
    <main bg-white >
      <BuyersGuide />
      <SellersGuide />
    </main>
      {/* <Banner />
      <main className={`${styles.container} ${styles.main}`}>
        <h2>Welcome to E-Auction</h2>
        <p>Discover our amazing services and solutions designed just for you with best and Auctions Styling Products.</p>
        <div className={styles.live}>
          <a href="/auction" className={styles.button}>Live Auctions</a>
        </div>
        
        <CatalogPromo />
        <h2>Our Catalog</h2>
        <p>Discover our amazing services and solutions designed just for you with best and Catalog Styling Products.</p>
        <div className={styles.live}>
          <a href="/new-arrival" className={styles.button}>New Arrivals</a>
        </div>

        <div className={styles.videoContainer}>
          <video className={styles.responsiveVideo} controls autoPlay loop muted>
            <source src="/uploads/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main> */}

      {/* ✅ WhatsApp Floating Button */}
      <a
        href="https://wa.me/919741132528?text=Hi"
        className={styles.whatsappButton}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src="/whatsapp-icon.png" alt="WhatsApp" className={styles.whatsappIcon} />
      </a>
    </div>
  );
}
