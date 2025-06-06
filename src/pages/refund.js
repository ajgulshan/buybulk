import Head from "next/head";

export default function Refund() {
  return (
    <>
      <Head>
        <title>Refunds & Cancellations Policies - BuyBulk</title>
      </Head>
      <main className="bg-white max-w-5xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6">Refunds & Cancellations Policies</h1>

        <p className="mb-4">
          BuyBulk 3-day returns allow you to exchange items purchased on BuyBulk for the defect within 3 days
          of receipt of the item. We only ask that you don&apos;t use the product and preserve its original condition,
          tags, and packaging. You are welcome to try on a product but please take adequate measures to preserve its
          condition.
        </p>

        <p className="mb-4">
          Once we receive your returned product, we will do a quality check of the product at our end and once the
          product passes the quality check we will exchange the product. If the picked-up product does not pass the
          quality check, we shall ship it back to you. If you choose to exchange the item for reason of a mismatch of
          size or receipt of a defective item, you will be provided with a replacement of the item, free of cost.
          However, all exchanges are subject to stock availability and subject to your address being serviceable for
          an exchange.
        </p>

        <p className="mb-4">
          Any new features or tools which are added to the current website shall also be subject to the Terms of
          Service.
        </p>

        <p>
          If you self-ship your returns, kindly pack the items securely to prevent any loss or damage during transit.
          For all self-shipped returns, we recommend you use a reliable courier service.
        </p>
      </main>
    </>
  );
}
