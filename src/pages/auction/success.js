import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();
  const { auctionId } = router.query;

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Bid Placed Successfully!</h1>
      <p className="mb-6">Your bid has been submitted for auction: {auctionId}</p>
      <div className="flex justify-center gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => router.push(`/auction/${auctionId}`)}
        >
          Bid Again
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
