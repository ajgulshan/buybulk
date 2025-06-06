import Head from "next/head";

export default function Shipping() {
  return (
    <>
      <Head>
        <title>Shipping Policies - BuyBulk</title>
      </Head>
      <main className="bg-white max-w-6xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6 text-center">Shipping Policies</h1>

        <p className="mb-4">
          We try to deliver the products purchased from BuyBulk in excellent condition and in the fastest time. Also, 
          for all subsequent purchases, we will deliver the order to your doorstep. A shipping fee will apply (depending 
          on the orders).
        </p>

        <p>
          We will charge courier charges for both pickup and delivery of the product if you go for an exchange in the same order.
        </p>
      </main>
    </>
  );
}
