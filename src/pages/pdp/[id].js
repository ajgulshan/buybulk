import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PDP() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/getProductById?id=${id}`)
        .then((res) => res.json())
        .then(async (data) => {
          const sku = data.product.sku;

          const mainImage = `/uploads/sku/${sku}imgd.jpg`;
          const thumb1 = `/uploads/sku/${sku}imgda.jpg`;
          const thumb2 = `/uploads/sku/${sku}imgdb.jpg`;

          const imgExists = async (url) => {
            try {
              const res = await fetch(url, { method: "HEAD" });
              return res.ok;
            } catch {
              return false;
            }
          };

          const thumbs = [];
          if (await imgExists(thumb1)) thumbs.push(thumb1);
          if (await imgExists(thumb2)) thumbs.push(thumb2);

          const mainExists = await imgExists(mainImage);
          setSelectedImage(mainExists ? mainImage : "/uploads/sku/default.jpeg");
          setThumbnails(thumbs);
          setProduct(data.product);
        });
    }
  }, [id]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="flex md:flex-col gap-2 w-full md:w-[100px]">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                className={`cursor-pointer border-2 rounded-md ${
                  selectedImage === img ? "border-yellow-500" : "border-gray-200"
                }`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover", // cover to fill while cropping if needed
                  borderRadius: "0.375rem",
                }}
                onClick={() => {
                  const currentMain = selectedImage;
                  setSelectedImage(img);

                  // Reorder thumbnails to move selectedImage to thumbnails
                  setThumbnails((prev) => {
                    const newThumbs = prev.filter((t) => t !== img);
                    if (currentMain !== "/uploads/sku/default.jpeg") {
                      newThumbs.push(currentMain); // put previous main as new thumbnail
                    }
                    return newThumbs;
                  });
                }}
              />
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={selectedImage}
            alt={product.name}
            style={{
              width: "400px",
              height: "400px",
              objectFit: "contain", // keep aspect ratio, fit inside box
              borderRadius: "0.5rem",
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-green-600 text-xl font-semibold mb-1">
            Rs {product.price_per_piece}
          </p>
          <p className="text-gray-700 mb-1">MOQ: {product.moq}</p>
          <p className="text-gray-700 mb-1">Quantity: {product.quantity}</p>
          <p className="text-gray-700 mb-1">Brand: {product.brand}</p>
          <p className="text-gray-700 mb-1">City: {product.city}</p>
          <p className="text-gray-700 mb-1">State: {product.state}</p>
          <p className="text-gray-700 mb-1">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}
