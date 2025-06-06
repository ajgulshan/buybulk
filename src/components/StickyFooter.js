import Link from 'next/link';

export default function StickyFooter() {
  return (
    <div className="fixed bottom-0 w-full bg-gray-200 py-3 px-4 sm:px-6 lg:px-8 shadow-inner z-50 border-t border-gray-300">
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 sm:gap-2 justify-items-center">
        {/* Value Shopee Catalogue */}
        <Link href="/catalogue">
          <img
            src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/56e2972a-dbdb-4d9e-4982-b54e4bb3e000/public"
            alt="Value Shopee Catalogue"
            title="Value Shopee Catalogue"
            className="w-24 sm:w-32 lg:w-60 hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>

        {/* Deal From Others Catalogue O*/}
        <Link href="/household">
          <img
            src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/b3034396-f780-4355-2ac1-03289bf0aa00/public"
            alt="Deal From Others"
            title="Deal From Others"
            className="w-24 sm:w-32 lg:w-60 hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>

        {/* Sell Your Surplus */}
        <Link href="/catalog">
          <img
            src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/41899dcc-3b30-46bf-bea6-62738ed9b700/public"
            alt="Sell Your Surplus"
            title="Sell Your Surplus"
            className="w-24 sm:w-32 lg:w-60 hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>

        {/* Auction */}
        <Link href="/auction">
          <img
            src="https://imagedelivery.net/ibm2_-Mss4Mf0pfD1NqVFw/b3034396-f780-4355-2ac1-03289bf0aa00/public"
            alt="Auction"
            title="Auction"
            className="w-24 sm:w-32 lg:w-60 hover:scale-105 transition-transform cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
