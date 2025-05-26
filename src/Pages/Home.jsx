import React, { useState } from 'react';
import Card from '../components/PhotographerCard';

function Home({ searchQuery, photographers }) {
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 initially

  const normalizedSearch = (searchQuery || '').toLowerCase();

  const filteredPhotographers = photographers.filter(
    (photographer) =>
      photographer?.name?.toLowerCase().includes(normalizedSearch)
  );

  // Slice the array to only show `visibleCount` items
  const visiblePhotographers = filteredPhotographers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visiblePhotographers.length > 0 ? (
          visiblePhotographers.map((photographer) => (
            <Card key={photographer.id} photographer={photographer} />
          ))
        ) : (
          <p className="text-center text-gray-500">No photographers found.</p>
        )}
      </div>

      {/* Show Load More button only if there are more items to load */}
      {visibleCount < filteredPhotographers.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
