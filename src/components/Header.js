import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const menuRef = useRef();

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const goToProfile = () => router.push("/profile");

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuVisible && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuVisible]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className={styles.logoImg}
              src="/auction.jpeg"
              alt="Auction"
              width={120}
              height={50}
            />
          </Link>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.iconGroup}>
            <button onClick={toggleMenu} className={styles.iconButton}>
              &#9776;
            </button>

            <button onClick={goToProfile} className={styles.iconButton}>
              👤
            </button>
          </div>
        </div>

        {menuVisible && (
          <div ref={menuRef} className={styles.popupMenu}>
            <button onClick={() => setMenuVisible(false)} className={styles.closeButton}>
              ✕
            </button>
            <ul>
  <li>
    <Link href="/" onClick={() => setMenuVisible(false)}>HOME</Link>
  </li>
  <li>
    <Link href="/catalogue" onClick={() => setMenuVisible(false)}>BUYBULK CATALOGUE</Link>
  </li>
  <li>
    <Link href="/household" onClick={() => setMenuVisible(false)}>BUYBULK HOUSE CATALOGUE</Link>
  </li>
  <li>
    <Link href="/catalog" onClick={() => setMenuVisible(false)}>SELL YOUR SURPLUS</Link>
  </li>
  <li>
    <Link href="/auction" onClick={() => setMenuVisible(false)}>e-AUCTION</Link>
  </li>
  <li>
    <Link href="/contact" onClick={() => setMenuVisible(false)}>CONTACT-US</Link>
  </li>
  <li>
    <Link href="/auctionprofile" onClick={() => setMenuVisible(false)}>BULK PROFILE</Link>
  </li>
</ul>

          </div>
        )}
      </header>

      <div style={{ height: "3px", backgroundColor: "red", width: "100%" }}></div>
    </>
  );
}
