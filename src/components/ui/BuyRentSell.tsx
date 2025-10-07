import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Key,
  DollarSign,
  TrendingUp,
  MapPin,
  Camera,
  Play,
  Heart,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";

const BuyRentSell = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "sell">("buy");
  const [properties, setProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}properties/ai-properties/`);
        const data = await response.json();
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const buyProperties = properties.filter((p) => p.category === "Sale");
  const rentProperties = properties.filter((p) => p.category === "Rent");

  const sellServices = [
    {
      icon: Home,
      title: "Free Property Valuation",
      description:
        "Get an accurate market value of your property with our AI-powered valuation tool",
      color: "bg-gradient-to-r from-purple-600 to-indigo-500",
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description:
        "High-quality photos and virtual tours to showcase your property at its best",
      color: "bg-gradient-to-r from-pink-500 to-orange-400",
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description:
        "Comprehensive market insights to price your property competitively",
      color: "bg-gradient-to-r from-green-400 to-teal-500",
    },
  ];

  const formatPrice = (price: number) =>
    `₹${price?.toLocaleString("en-IN") || "N/A"}`;

  const renderPropertyCard = (property: any) => (
    <div
      key={property.id}
      className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500"
    >
      {/* Image */}
      <div
        className="w-full h-64 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${
            property.images?.[0]?.image ||
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.featured && (
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg">
              Featured
            </Badge>
          )}
          {property.hasVideo && (
            <Badge className="bg-white/90 text-purple-600 flex items-center gap-1">
              <Play className="w-3 h-3" /> Video
            </Badge>
          )}
        </div>

        {/* Heart */}
        <Heart className="absolute top-4 right-4 text-white w-6 h-6" />
      </div>

      {/* Card Content */}
      <CardContent className="p-6 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-500" />
          {property.location}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-purple-600 font-extrabold" />{" "}
            {property.price}
          </span>
          <span className="text-gray-500">{property.property_status}</span>
        </div>

        <div className="grid grid-cols-3 text-center text-sm mb-4">
          <div>
            <div className="font-bold text-gray-900 group-hover:text-purple-600">
              {property.bedrooms}
            </div>
            <div className="text-gray-400">Beds</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 group-hover:text-purple-600">
              {property.bathrooms}
            </div>
            <div className="text-gray-400">Baths</div>
          </div>
          <div>
            <div className="font-bold text-gray-900 group-hover:text-purple-600">
              {property.area_sqft}
            </div>
            <div className="text-gray-400">Area sqft</div>
          </div>
        </div>

        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {property.amenities.slice(0, 3).map((amenity: any) => (
              <span
                key={amenity.id}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-medium shadow-sm hover:scale-105 transition-transform duration-300"
              >
                {amenity.amenity}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1 bg-white border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all"
            onClick={() => navigate(`/property/${property.slug}`)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-purple-600"
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </div>
  );

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            Buy, Rent, or{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Sell Properties
            </span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Find your dream home, rent the perfect property, or sell your
            property with confidence.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          {[
            { id: "buy", label: "Buy Properties", icon: Home },
            { id: "rent", label: "Rent Properties", icon: Key },
            { id: "sell", label: "Sell Property", icon: DollarSign },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "buy" | "rent" | "sell")}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-purple-600 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "buy" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {buyProperties.slice(0, 3).map(renderPropertyCard)}
          </div>
        )}

        {activeTab === "rent" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {rentProperties.slice(0, 3).map(renderPropertyCard)}
          </div>
        )}

        {activeTab === "sell" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {sellServices.map((service, idx) => (
              <Card
                key={idx}
                className="p-8 text-center rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${service.color}`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500">{service.description}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyRentSell;
