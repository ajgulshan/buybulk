'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/Footer.module.css";
import '../styles/globals.css';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Footer */}
      <footer className={styles.desktopFooter}>
        <div className={styles.footerContent}>
          {/* Column 1: Logo + Address */}
          <div className={styles.column}>
            <Image src="/auction.png" alt="Logo" width={80} height={80} />
            <p className={styles.address}>123 Street Name,<br />City, State, ZIP</p>
          </div>

          {/* Column 2: About Us + Links */}
          <div className={styles.column}>
          <h4><strong>About Us</strong></h4>
            <hr />
            <Link href="/aboubt">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>

          {/* Column 3: Quick Links */}
          <div className={styles.column}>
          <h4><strong>Quick Links</strong></h4>
            <hr />
            <Link href="/shipping">Shipping Policy</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>

          {/* Column 4: Support */}
          <div className={styles.column}>
          <h4><strong>Support Us</strong></h4>
            <hr />
            <div className={styles.socials}>
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
              <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
              <Image src="/twiter.png" alt="Twitter" width={24} height={24} />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <div className={styles.mobileFooterWrapper}>
        <div className={styles.footerToggle} onClick={() => setIsOpen(!isOpen)}>
          <span className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`}>˄</span>
        </div>

        {isOpen && (
          <div className={styles.mobileFooter}>
            <Image src="/auction.jpeg" alt="Logo" width={60} height={60} className={styles.mobileLogo} />
            <p className={styles.address}>123 Street Name,<br />City, State, ZIP</p>

            <h4><strong>About Us</strong></h4>
            <hr />
            <Link href="/aboubt">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/terms">Terms & Conditions</Link>

            <h4><strong>Quick Links</strong></h4>
            <hr />
            <Link href="/shipping">Shipping Policy</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Refund Policy</Link>

            <h4><strong>Support Us</strong></h4>
            <hr />
            <div className={styles.socials}>
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
              <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
              <Image src="/twiter.png" alt="Twitter" width={24} height={24} />
            </div>
          </div>
        )}
      </div>
      {/* Footer Bottom Bar */}
    <div className={styles.footerBottom}>
      <p>© 2025 YourWebsiteName. All rights reserved.</p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    </>
  );
}
