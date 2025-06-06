import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - BuyBulk</title>
      </Head>
      <main className="max-w-6xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6">PRIVACY POLICY</h1>

        <p className="mb-4">
          While organising this regime of leftover stock, we intended to outline the policy plain & simple. For the ease of 
          understanding & referencing purposes, we have categorised the same under three sections:
        </p>

        <h2 className="font-semibold mb-2">Your Personal Information may comprise the following:</h2>
        <ul className="list-disc list-inside text-yellow-600 mb-6 ml-4 space-y-1">
          <li>your name</li>
          <li>your email and mailing address</li>
          <li>your telephone number</li>
          <li>your payment processing details</li>
          <li>limited personal details</li>
          <li>Any other data as BuyBulk may require</li>
        </ul>

        <p className="mb-6">
          The following Privacy Policy sets forth our understanding with you on the collection, use and protection of your 
          Personal Information. Please read the entire Privacy Policy.
          <strong> YOUR USE OF THE WEBSITE CONSTITUTES YOUR CONSENT TO ALL THE TERMS AND CONDITIONS CONTAINED IN THIS 
          PRIVACY POLICY (AS AMENDED FROM TIME TO TIME) AND YOU SHALL BE BOUND BY THE SAME.</strong>
        </p>

        <h2 className="font-semibold mb-2">Usage of Information</h2>
        <p className="mb-2">Personal information will be used by buybulk for internal purposes including the following:</p>
        <ul className="list-disc list-inside text-yellow-600 mb-6 ml-4 space-y-1">
          <li>
            sending e-mails and updates, BuyBulk Annual Report, regular updates on the utilisation of donations by 
            BuyBulk, appreciation e-mails and other updates.
          </li>
          <li>
            maintaining an internal confidential database of all the Personal Information collected from donors and 
            prospective volunteers/employees
          </li>
          <li>
            evaluating and administering the Site and BuyBulks activities, responding to any problems that may 
            arise and gauging visitor trends on the Site.
          </li>
        </ul>

        <h2 className="font-semibold mb-2">COLLECTION</h2>
        <p>
          It has been utmost thought of to collect only the related relevant information facilitating the provision of services.
          Registration Information, Account Information, Browsing Information and surfing interests/ query generally relate to 
          business activities and together construed as business data which is undoubtedly, indispensable for users of the Sites 
          and providing the requisite solution based interface. In the event, users do not provide any or sufficient Business 
          Data marked as mandatory, we may not be able to complete the registration process or provide such users with our 
          products or services.
        </p>
        <h2 className="font-semibold mb-2">USAGE</h2>
        <p>
          The data collected from the users is predominantly used to verify the identity and managing your registration.
          Your details/ email is also used to provide alerts, communications, mailers and other marketing materials to 
          you relating to the offerings by us on the Sites from time to time. All other information collected is confidentially 
          stored and will not be disclosed unless needed as per the requirement of the law authorities or in case of any disputes.
        </p>
        <h2 className="font-semibold mb-2">SHARING</h2>
        <p>
        The most important aspect perceived under privacy is sharing of the information. We do not sell, lend, or otherwise distribute 
        your personal information to anyone for any reason. This includes your contact information, as well as specific order information. 
        The requisite information either partially or fully has to be passed on to the courier companies, credit card processing companies, 
        vendors, etc. to enable them to perform their functions related to your service/ product request. Apart from this usual business course, 
        data may also be needed to be shared with law authorities, or for the procedural safety concerns of the site, employees, management, and other business affiliates.
        </p>
      </main>
    </>
  );
}
