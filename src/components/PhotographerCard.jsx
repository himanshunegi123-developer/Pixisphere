import React from 'react';
import { Link } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition bg-white">
      {/* Profile Picture */}
      <img
        src={photographer.profilePic || 'https://via.placeholder.com/300'}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Name */}
      <h2 className="text-xl font-semibold mt-3">{photographer.name}</h2>

      {/* Location */}
      <p className="text-gray-600">📍 {photographer.location}</p>

      {/* Starting Price */}
      <p className="text-gray-800 font-medium mt-2">
        💰 Starting at ₹{photographer.price || 'N/A'}
      </p>

      {/* Rating */}
      <p className="text-yellow-600 font-semibold mt-1">
        ⭐ {photographer.rating || 'No Rating'}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {photographer.tags && photographer.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* View Profile Link */}
      <Link
        to={`/profile/${photographer.id}`}
        className="mt-4 block text-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Profile
      </Link>
    </div>
  );
};

export default PhotographerCard;
