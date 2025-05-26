import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InquiryBtn from "../components/InquiryBtn";


export default function PhotographerProfile() {
  const { id } = useParams(); // get id from URL
  const [photographer, setPhotographer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const selected = data.photographers.find(p => p.id === Number(id));
        if (!selected) throw new Error("Photographer not found");
        setPhotographer(selected);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, [id]);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!photographer) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Name & Bio */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 ">{photographer.name}</h1>
        <p className="text-gray-600 mt-2">{photographer.bio}</p>
      </div>

      {/* Styles & Tags */}
      <div className="flex flex-wrap gap-2">
        {photographer.styles.map((style) => (
          <span
            key={style}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {style}
          </span>
        ))}
        {photographer.tags.map((tag) => (
          <span
            key={tag}
            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className="text-lg font-semibold">Price: ₹{photographer.price}</p>
      </div>

      {/* Gallery */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gallery</h2>
        <div className="grid grid-cols-2 gap-5">
          {photographer.portfolio.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Photo ${i + 1}`}
              className="rounded-lg object-cover h-82 w-full"
            />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-6">
          {photographer.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-blue-200 p-6 rounded-lg shadow-sm space-y-1"
            >
              <p className="font-bold text-[20px] ">{review.name}</p>
              <p className="text-yellow-500">
                {"★".repeat(Math.round(review.rating)) + "☆".repeat(5 - Math.round(review.rating))}
              </p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-800">{review.date}</p>
              
            </div>
            
          ))}
        </div>
      </div>
    <InquiryBtn className="p-3 font-bold"  />
    </div>
  );
}
