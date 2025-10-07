import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaStore,
  FaIndustry,
  FaTree,
  FaMountain,
  FaWarehouse,
} from "react-icons/fa";

interface PropertyCategoriesProps {
  onCategorySelect: (category: string) => void;
}

interface PropertyStat {
  property_type__name: string;
  total_properties: number;
}

const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  onCategorySelect,
}) => {
  const navigate = useNavigate();
  const [propertyStats, setPropertyStats] = useState<PropertyStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}properties/stats/property-type/`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("API Response Data:", data);
          if (Array.isArray(data)) {
            setPropertyStats(data);
          } else {
            // console.error("API returned non-array data:", data);
            setPropertyStats([]);
          }
        } else {
          // console.error("Failed to fetch property categories:", response.status);
          setPropertyStats([]);
        }
      } catch (error) {
        // console.error('Error fetching property stats:', error);
        setPropertyStats([]);
      }
    };

    fetchStats();
  }, []);

  // console.log("Property Stats:", propertyStats);

  const handleCategorySelect = (category: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      onCategorySelect(category);
    }
  };

  const categories = [
    {
      icon: FaHome,
      title: "House",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaBuilding,
      title: "Apartment",
      // color: "text-accent",
      // bgColor: "bg-accent/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Plots",
      color: "text-real-estate-success",
      // bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaStore,
      title: "Commercial",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaIndustry,
      title: "Retail",
      color: "text-real-estate-warning",
      // bgColor: "bg-real-estate-warning/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaBuilding,
      title: "PentHouse",
      // color: "text-accent",
      // bgColor: "bg-accent/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaMountain,
      title: "Vacation",
      // color: "text-purple-600",
      // bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaWarehouse,
      title: "Villa",
      color: "text-real-estate-success",
      // bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-purple-600/20",
    },
    {
      icon: FaIndustry,
      title: "Industrial",
      // color: "text-purple-600",
      // bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20",
    },
  ].map((category) => {
    const stat = propertyStats.find((s) => {
      const apiName = s.property_type__name.toLowerCase();
      const categoryName = category.title.toLowerCase();
      // console.log("Matching:", { apiName, categoryName });
      return apiName === categoryName;
    });
    return {
      ...category,
      count: stat ? `${stat.total_properties}+` : "0+",
    };
  });

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-1/3 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-1/4 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore by{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
              Property Type
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect property from our diverse collection of real
            estate options
          </p>
        </div>

        {/* Property Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              onClick={() => handleCategorySelect(category.title)}
              className="group cursor-pointer bg-white/30 backdrop-blur-md border border-gray-200/40 rounded-3xl hover:shadow-xl hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="flex flex-col items-center justify-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white mb-3 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <category.icon className="text-3xl" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-purple-600 transition-colors mb-1">
                  {category.title}
                </h3>

                {/* Count */}
                {/* <p className="text-sm text-gray-500">{category.count}</p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
