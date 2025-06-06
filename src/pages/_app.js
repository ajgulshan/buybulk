import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyFooter from '../components/StickyFooter';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      
      <div className="bg-white min-h-screen text-gray-800">
      <Component {...pageProps} />
    </div>
      <StickyFooter />
      <Footer />
    </>
  );
}

export default MyApp;
