import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Pages/Home';
import PhotographerProfile from './Pages/PhotographerProfile';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [photographers, setPhotographers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    rating: '',
    styles: {},
    city: '',
    sortOption: '',
  });

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setPhotographers(data.photographers))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyAllFilters = () => {
    return photographers
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(p => {
        const { priceRange, rating, styles, city } = filters;

        // Price filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

        // Rating filter
        if (rating && p.rating < parseInt(rating)) return false;

        // City filter
        if (city && p.location !== city) return false;

        // Styles filter
        const activeStyles = Object.keys(styles).filter(k => styles[k]);
        if (activeStyles.length > 0 && !activeStyles.some(style => p.styles.includes(style))) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const { sortOption } = filters;
        if (sortOption === 'priceLowHigh') return a.price - b.price;
        if (sortOption === 'ratingHighLow') return b.rating - a.rating;
        if (sortOption === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  };

  const filteredPhotographers = applyAllFilters();

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} setSidebarOpen={setSidebarOpen} />
      <Sidebar
        photographers={photographers}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onFilterChange={handleFilterChange}
        
      />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home photographers={filteredPhotographers} />} />
          <Route path="/profile/:id" element={<PhotographerProfile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
