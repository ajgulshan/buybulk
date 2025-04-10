import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, user!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}