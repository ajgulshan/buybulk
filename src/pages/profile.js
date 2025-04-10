import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else router.push('/login');
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
    router.push('/login');
  };

  return user ? (
    <div>
      <h1>Welcome, {user.phoneNumber}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : null;
}
