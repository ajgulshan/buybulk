import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';
import Message from '../components/Message'; // ✅ Import Message component

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for message

  useEffect(() => {
    const token = localStorage.getItem('token');
    const encrypted = localStorage.getItem('bbn');

    if (token && encrypted) {
      try {
        const userData = JSON.parse(encrypted);
        setUser(userData);
      } catch (err) {
        console.error("Invalid user data in localStorage");
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bbn');
    setUser(null);
    setSuccessMessage("Logged out successfully ✅"); // ✅ Show message
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>👤 Profile</h1>

      {/* ✅ Success Message */}
      <Message type="success" text={successMessage} />

      {!user ? (
        <div className={styles.card}>
          <button className={styles.btn} onClick={() => router.push('/login')}>Login</button>
          <p className={styles.note}>For existing user</p>
          <button className={styles.btn} onClick={() => router.push('/register')}>Register</button>
          <p className={styles.note}>For new user</p>
        </div>
      ) : (
        <div className={styles.card}>
          <h2>Welcome, {user.name} 👋</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Video Section */}
      <div className={styles.videoContainer}>
        <video className={styles.responsiveVideo} controls autoPlay loop muted>
          <source src="/uploads/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
