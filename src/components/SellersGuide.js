import Image from 'next/image';

export default function SellersGuide() {
  return (
    <section className="bg-white px-4 py-10 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start gap-10">
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src="/image2.png" // Make sure image2.png is in /public folder
          alt="Seller's Guide"
          width={600} // Required to avoid runtime error
          height={600}
          className="object-contain"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-4xl font-serif font-semibold text-gray-800 mb-4">Seller's Guide</h3>
        <div className="w-16 h-1 bg-red-500 mb-6"></div>
        <p className="text-gray-700 leading-7">
          No need to worry for any kind of unsold/ aged/ offshelf/ discontinued/ surplus stock,
          rather convert it into fresh extra cash to use where it’s needed most. Get rid of all
          your excess stock in one/ multiple go. Our liquidation platform will facilitate the
          broadcast of your information (basis your mandate) and soon will get the interested buyers
          for your stock. Thereby, allow you to focus managing your business and making money.
          <br /><br />
          BuyBulk Retails Pvt Ltd has been designed to solve such inventory problems! Liquidate
          now and turn dead inventory into cash. We have helped inventory holders in turning
          liabilities into assets and arranged to liquidate goods across various categories and
          locations. Call us today or fill out the inventory submission form. BuyBulk Retails
          Pvt Ltd will quickly evaluate and broadcast among plethora of prospective buyers who will
          get back with a competitive offer. We can make the best deals because we pay in cash and
          always act quickly to make the purchase.
        </p>
      </div>
    </section>
  );
}
