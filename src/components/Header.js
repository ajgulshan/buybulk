import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "../styles/Header.module.css";
export default function Header() {
const [loggedIn, setLoggedIn] = useState(false);
const router = useRouter();

useEffect(() => {
  setLoggedIn(!!localStorage.getItem('token'));
}, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/auction.png" alt="Auction" width={120} height={50} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/new-arrival">NewArrival</Link></li>
          <li><Link href="/auction">Auction</Link></li>
          <li><Link href="/profile">Profile</Link></li>

          {/* {loggedIn ? <a href="/profile">Profile</a> : <ul><li><a href="/login">Login</a></li> <li><a href="/register">Register</a></li></ul>} */}
        </ul>
      </nav>
    </header>
  );
};