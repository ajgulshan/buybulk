import Image from 'next/image';

export default function BuyersGuide() {
  return (
    <section className="bg-[#f9f9f9] py-16 px-6">
      {/* Title */}
      <div className="howit text-center mx-auto">
        <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-4">
          How It Works?
        </h2>
        <div className="w-16 h-1 bg-red-500 mb-6 mx-auto"></div>
      </div>

      {/* CONTENT: Responsive layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* IMAGE: First on mobile, second on desktop */}
        <div className="relative w-full max-w-md h-[500px] mx-auto order-1 lg:order-2">
          <Image
            src="/image1.png"
            alt="Buyer's Guide Steps"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* TEXT: Second on mobile, first on desktop */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <h3 className="text-4xl font-serif font-semibold text-gray-800 mb-4">Buyer's Guide</h3>
          <div className="w-16 h-1 bg-red-500 mb-6"></div>
          <p className="text-gray-700 leading-7 text-base">
            Needless to highlight that purchasing/ buying/ producing is the most integral part
            of the business as it defines the course of action. No wonder, but BuyBulk Retails
            Pvt Ltd is a destination providing information of availability of the stock at the price
            that may provide unheard growth and margin...
            <br /><br />
            We understand that for a retailer/ wholesaler, it is absolutely not possible to identify
            the real time availability of the relevant stock; and thus, has to depend on few hubs,
            scattered geographically...
            <br /><br />
            Whether you’re a big retail/ wholesale set up, a regional chain, or even a flea marketer
            looking for an opportunity buy, please register us to be added to our affiliate list.
          </p>
        </div>
      </div>
    </section>
  );
}
