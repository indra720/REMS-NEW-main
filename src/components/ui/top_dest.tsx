import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../lib/constants';

interface TopDestProps {
  onCitySelect: (city: string) => void;
}

interface LocationStat {
  city: string;
  total_properties: number;
  image: string;
}

export const TopDest: React.FC<TopDestProps> = ({ onCitySelect }) => {
  const navigate = useNavigate();
  const [locationStats, setLocationStats] = useState<LocationStat[]>([]);

  useEffect(() => {
    const fetchLocationStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}properties/stats/location/`);
        const data = await response.json();
        setLocationStats(data || []);
      } catch (error) {
        // console.error('Error fetching location stats:', error);
      }
    };

    fetchLocationStats();
  }, []);


  const handleCityClick = (city: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      onCitySelect(city);
    }
  };

  return (
    <section className="w-full py-16 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
          Top Popular <span className="text-purple-500">Real Estate Cities</span>
        </h3>

        <div className="flex justify-center mb-10">
          <div className="w-32 border-t-2 border-gray-400 relative flex items-center justify-center">
            <span className="absolute left-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute right-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-2xl text-gray-400 select-none">
              ✧
            </span>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-6 justify-center">
          {locationStats.map((dest) => (
            <div
              key={dest.city}
              className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
              onClick={() => handleCityClick(dest.city)}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg mb-2 border-4 border-white transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-xl">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0 text-center truncate w-24 sm:w-28 group-hover:text-blue-600 transition-colors duration-200">
                {dest.city}
              </h4>
              <p className="text-gray-500 text-[10px] sm:text-xs text-center truncate w-24 sm:w-28 group-hover:text-blue-400 transition-colors duration-200">
                {dest.total_properties} Properties
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}