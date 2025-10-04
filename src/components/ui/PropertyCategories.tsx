import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";
import { useEffect, useState } from 'react';
import { 
  FaHome, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaStore, 
  FaIndustry, 
  FaTree, 
  FaMountain, 
  FaWarehouse 
} from 'react-icons/fa';

interface PropertyCategoriesProps {
  onCategorySelect: (category: string) => void;
}

interface PropertyStat {
  property_type__name: string;
  total_properties: number;
}

const PropertyCategories: React.FC<PropertyCategoriesProps> = ({ onCategorySelect }) => {
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
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaBuilding,
      title: "Apartment",
      // color: "text-accent",
      // bgColor: "bg-accent/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Plots",
      color: "text-real-estate-success",
      // bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaStore,
      title: "Commercial",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaIndustry,
      title: "Retail",
      color: "text-real-estate-warning",
      // bgColor: "bg-real-estate-warning/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaBuilding,
      title: "PentHouse",
      // color: "text-accent",
      // bgColor: "bg-accent/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaMountain,
      title: "Vacation",
      // color: "text-purple-600",
      // bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaWarehouse,
      title: "Villa",
      color: "text-real-estate-success",
      // bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-purple-600/20"
    },
    {
      icon: FaIndustry,
      title: "Industrial",
      // color: "text-purple-600",
      // bgColor: "bg-purple-600/10",
      hoverColor: "hover:bg-purple-600/20"
    }
  ].map(category => {
    const stat = propertyStats.find(s => {
      const apiName = s.property_type__name.toLowerCase();
      const categoryName = category.title.toLowerCase();
      // console.log("Matching:", { apiName, categoryName });
      return apiName === categoryName;
    });
    return {
      ...category,
      count: stat ? `${stat.total_properties}+` : '0+'
    };
  });

  return (
    <section className="py-0 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden mt-5">
      {/* Background Elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore by 
            <span className="bg-gradient-hero bg-clip-text  text-purple-600 "> Property Type</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect property from our diverse collection of real estate options
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6 m-5">
          {categories.map((category, index) => (
            <Card 
              key={index}
              onClick={() => handleCategorySelect(category.title)}
              className={`group cursor-pointer hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-secondary/20 border border-border/30 animate-fade-in ${category.hoverColor}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-2 text-center">
                <div className={`w-16 h-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                  <category.icon className="text-2xl group-hover:[transform:rotateY(180deg)] transition-transform duration-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;