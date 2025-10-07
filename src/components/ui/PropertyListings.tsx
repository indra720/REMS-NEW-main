import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Camera, MapPin, IndianRupee } from "lucide-react";
import { BASE_URL } from "../../lib/constants";

const PropertyListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(BASE_URL + "properties/top-ai-properties/");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-gradient-to-r from-indigo-400 to-teal-400 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-purple-600 uppercase text-sm font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Premium Collection
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold mt-3 text-gray-900">
            Featured{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
              Properties
            </span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Handpicked luxury properties with premium amenities.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.slice(0, 3).map((property, index) => (
            <Card
              key={property.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/20 backdrop-blur-lg border border-white/20 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-t-3xl">
                {property.images?.length ? (
                  <img
                    src={property.images[0].image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <Badge
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${
                    property.category?.toLowerCase() === "rent"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {property.category}
                </Badge>
                <Heart className="absolute top-3 right-3 text-white w-6 h-6 cursor-pointer" />
              </div>

              {/* Card Content */}
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {property.title}
                </h3>
                <div className="flex justify-between items-center text-gray-500 mb-4 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {property.location}
                  </span>
                  <span>
                    {property.listed_on
                      ? new Date(property.listed_on).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center gap-1">
                    <IndianRupee /> {property.price}
                  </span>
                  <span className="text-gray-700 font-semibold">
                    {property.property_status}
                  </span>
                  {property.type === "rent" && (
                    <span className="text-gray-500 text-sm">/month</span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                      {property.bedrooms}
                    </div>
                    <div className="text-gray-500">Beds</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                      {property.bathrooms}
                    </div>
                    <div className="text-gray-500">Baths</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                      {property.area_sqft}
                    </div>
                    <div className="text-gray-500">Area</div>
                  </div>
                </div>

                {property.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {property.amenities.slice(0, 3).map((amenity: any) => (
                      <Badge
                        key={amenity.id}
                        variant="secondary"
                        className="px-3 py-1 bg-purple-600 text-white rounded-full"
                      >
                        {amenity.amenity}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-auto">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl hover:from-purple-700 hover:to-indigo-600 transition-all duration-300"
                    size="sm"
                    onClick={() => navigate(`/property/${property.slug}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl hover:from-purple-700 hover:to-indigo-600 transition-all duration-300"
                    size="sm"
                    onClick={() => navigate("/contact")}
                  >
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 space-y-4">
          <Button
            size="lg"
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore All Properties
          </Button>
          <p className="text-gray-500">
            Join 50,000+ satisfied customers who found their dream homes
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
