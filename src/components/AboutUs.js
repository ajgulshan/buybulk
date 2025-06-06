export default function AboutUs() {
    return (
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* INTRO */}
          <p className="text-gray-800 text-base leading-7 mb-6">
            Reinforced with industry experience and echoed with a belief of creating value in the ecosystem, 
            BuyBulk has been conceptualised by analysing the needs of organising and streamlining one 
            of the biggest unorganised industry of inventory liquidation and contemplated to implement the 
            solutions considering the ground practicalities.
          </p>
  
          <p className="text-gray-800 text-base leading-7 mb-6">
            Inventory liquidation is now considered a strategy, rather than the last resort. Considering the same, 
            BuyBulk has evolved to provide Liquidation Solutions to strategically transform a burden into a 
            valued opportunity.
          </p>
  
          <p className="text-gray-800 text-base leading-7 mb-6">
            We connect a diverse and passionate community of sellers, buyers & businesses, fostering mutual growth, 
            thereby ushering in positive socio-economic changes. We envisage to be a reliable company destination 
            for buying/selling any kind of goods - unsold/aged/customer returned/off shelves/off fashion/surplus 
            making it a hassle-free activity.
          </p>
  
          <p className="text-gray-800 text-base leading-7 mb-6">
            This is what we do and we strive to be the best at it.
          </p>
  
          <p className="text-gray-800 text-base leading-7 mb-6">
            Our fast, easy process is designed to respect your time and solve your challenging problems. We also 
            believe in presenting you a fair and competitive offer for your product. One time or as many 
            transactions as you need us for in the future we’ll be there for you, fast and reliable and with a 
            fair price for your merchandise.
          </p>
  
          <p className="text-gray-800 text-base leading-7 mb-10">
            At BuyBulk, we’ve built our spotless reputation through hard work, honesty, and treating clients 
            like friends. We’re ready to help trading liquidation stock round the clock.
          </p>
  
          {/* BULLET POINTS */}
          <ul className="list-none space-y-3 text-gray-800 text-base leading-7">
            {[
              "360 degree solution to trade inventory available for liquidation",
              "Brand protection & channel conflict management",
              "Personalized customer service",
              "Can liquidate products in virtually any condition",
              "Can liquidate assorted & mixed lots",
              "Free warehousing available when appropriate",
              "Flexible & fast payout options",
              "Free up space & resources and establish an ongoing liquidation channel for your excess inventory",
              "Multiple liquidation options available to cater to specific needs",
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500 text-xl leading-none">›</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  