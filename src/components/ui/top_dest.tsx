import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constants";
import { ArrowUpRight } from "lucide-react";

import delhiImg from "../../assets/images/delhi.jpg";
import mussoorieImg from "../../assets/images/mussoorie.jpg";
import udaipurImg from "../../assets/images/udaipur.jpg";
import ranikhet3Img from "../../assets/images/ranikhet3.jpg";
import munnar2Img from "../../assets/images/munnar2.jpg";
import auli9Img from "../../assets/images/auli9.jpg";
import gulmarg8Img from "../../assets/images/gulmarg8.jpg";
import darjeeling7Img from "../../assets/images/darjeeling7.jpg";
import goaImg from "../../assets/images/goa.jpg";
import ladhakImg from "../../assets/images/ladhak.jpg";

export const destinations = [
  {
    name: "Delhi",
    img: delhiImg,
    accommodations: "2,004 Houses",
    size: "large",
  },
  {
    name: "Kolkata",
    img: mussoorieImg,
    accommodations: "2,224 Villas",
    size: "medium",
  },
  {
    name: "Jaipur",
    img: udaipurImg,
    accommodations: "2,007 Plots",
    size: "medium",
  },
  {
    name: "Bangalore",
    img: ranikhet3Img,
    accommodations: "2,000 Apartments",
    size: "medium",
  },
  {
    name: "Chennai",
    img: munnar2Img,
    accommodations: "1,200 Flats",
    size: "large",
  },
  {
    name: "Ahmedabad",
    img: ladhakImg,
    accommodations: "500 Plots",
    size: "medium",
  },
  { name: "Pune", img: goaImg, accommodations: "1,550 Houses", size: "medium" },
  {
    name: "Kota",
    img: auli9Img,
    accommodations: "1,800 Flats",
    size: "medium",
  },
  {
    name: "Mumbai",
    img: gulmarg8Img,
    accommodations: "2,500 Plots",
    size: "small",
  },
  {
    name: "Hyderabad",
    img: darjeeling7Img,
    accommodations: "2,300 Villas",
    size: "medium",
  },
  {
    name: "Gujrat",
    img: gulmarg8Img,
    accommodations: "2,500 Plots",
    size: "small",
  },
];

interface TopDestProps {
  onCitySelect: (city: string) => void;
}

interface LocationStat {
  location: string;
  total_properties: number;
}

export const TopDest: React.FC<TopDestProps> = ({ onCitySelect }) => {
  const navigate = useNavigate();
  const [locationStats, setLocationStats] = useState<LocationStat[]>([]);
  const [cityCounts, setCityCounts] = useState<{ [key: string]: number }>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Fetch location stats
  useEffect(() => {
    const fetchLocationStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}properties/stats/location/`);
        const data = await response.json();
        setLocationStats(data);
      } catch (error) {
        console.error("Error fetching location stats:", error);
      }
    };
    fetchLocationStats();
  }, []);

  // Map stats to city counts
  useEffect(() => {
    if (locationStats.length > 0) {
      const counts: { [key: string]: number } = {};
      destinations.forEach((dest) => {
        const city = dest.name.toLowerCase();
        const total = locationStats
          .filter((stat) => stat.location?.toLowerCase().includes(city))
          .reduce((sum, stat) => sum + stat.total_properties, 0);
        counts[dest.name] = total;
      });
      setCityCounts(counts);
    }
  }, [locationStats]);

  // Handle city click
  const handleCityClick = (city: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/login");
    else onCitySelect(city);
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
        return "col-span-1 row-span-2";
      case "small":
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Explore Top{" "}
            <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              Real Estate Cities
            </span>
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover premium properties across India's most sought-after
            locations
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {destinations.map((dest, index) => {
            const count =
              cityCounts[dest.name] || Math.floor(Math.random() * 2500 + 500);

            return (
              <div
                key={dest.name}
                className={`${getSizeClasses(
                  dest.size
                )} group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500`}
                onClick={() => handleCityClick(dest.name)}
                onMouseEnter={() => setHoveredId(dest.name)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Grayscale Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gray-900/70 transition-all duration-500 ${
                    hoveredId === dest.name ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* City Name - Top Left (Always Visible) */}
                <div className="absolute top-4 left-4 z-20">
                  <h4 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                    {dest.name}
                  </h4>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Description & Details - Center (Shows on Hover) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white transition-all duration-500 z-10 ${
                    hoveredId === dest.name
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="space-y-3">
                    <p className="text-base md:text-lg font-medium">
                      {dest.accommodations}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {/* <span className="text-2xl md:text-3xl font-bold">{count}</span> */}
                      <span className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        Properties Available
                      </span>
                    </div>
                    <p className="text-sm opacity-90 mt-4">
                      Click to explore properties
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
