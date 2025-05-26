// src/Pages/Home.jsx
import React from 'react';
import Card from '../components/PhotographerCard';

function Home({ searchQuery, photographers }) {
  // Ensure searchQuery is a string
  const normalizedSearch = (searchQuery || '').toLowerCase();

  // Filter photographers by search query (case-insensitive) with safety checks
  const filteredPhotographers = photographers.filter(
    (photographer) =>
      photographer?.name?.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredPhotographers.length > 0 ? (
        filteredPhotographers.map((photographer) => (
          <Card key={photographer.id} photographer={photographer} />
        ))
      ) : (
        <p className="text-center text-gray-500">No photographers found.</p>
      )}
    </div>
  );
}

export default Home;
