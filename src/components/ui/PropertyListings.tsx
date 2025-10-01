import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Grid,
  List,
  Heart,
  Camera,
  MapPin,
  IndianRupee,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "./use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";

const PropertyListings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          BASE_URL + "properties/top-ai-properties/"
        );
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        // console.error("Error fetching properties:", error);
        // toast({
        //   title: "Error fetching properties",
        //   description: "Could not fetch properties. Please try again later.",
        //   variant: "destructive",
        // });
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-gradient-hero bg-clip-text text-purple-600 text-lg font-semibold tracking-wide uppercase">
              Premium Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            Featured
            <span className="ml-3 bg-gradient-hero bg-clip-text text-purple-700">
              Properties
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Handpicked luxury properties with the highest appreciation potential
            and premium amenities
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.slice(0, 3).map((property: any, index: number) => (
            <Card
              key={property.id}
              className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img
                      src={property.images[0].image}
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <Badge
                      className={`absolute z-50 top-3 left-3 ${
                        property.category?.toLowerCase().trim() === "rent"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {property.category}
                    </Badge>
                    <Heart
                      className="absolute z-50 top-3 right-3 text-white"
                      size={24}
                    />
                  </>
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center justify-between text-muted-foreground mb-4">
                  <span className="text-sm flex justify-center items-center">
                    <MapPin className="w-4 h-4 mr-2  text-purple-500" />
                    {property.location}
                  </span>
                  <span>
                    {property.listed_on
                      ? new Date(property.listed_on).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl flex justify-center items-center font-bold bg-gradient-hero bg-clip-text text-purple-700">
                    <IndianRupee />
                    {property.price}
                  </span>
                  <span>{property.property_status}</span>
                  {property.type === "rent" && (
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {property.bedrooms}
                    </div>
                    <div className="text-muted-foreground">Beds</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {property.bathrooms}
                    </div>
                    <div className="text-muted-foreground">Baths</div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground group-hover:text-purple-600">
                      {property.area_sqft}
                    </div>
                    <div className="text-muted-foreground">Area</div>
                  </div>
                </div>
                {property.amenities && property.amenities.length > 0 && (
                  <div className="mt-4 mb-2 flex text-sm text-muted-foreground ">
                    <div className="flex flex-wrap justify-center gap-2">
                      {property.amenities.slice(0, 3).map((amenity: any) => (
                        <Badge
                          key={amenity.id}
                          variant="secondary"
                          className="px-2 py-1 text-white"
                        >
                          {amenity.amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Button
                    className=" bg-transparent  text-black font-semibold text-md hover:text-white border-2  hover:bg-purple-600  "
                    size="sm"
                    onClick={() => navigate(`/property/${property.slug}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-hero bg-purple-400 hover:bg-purple-600 text-white border-0"
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
        <div className="text-center space-y-6">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-12 py-6 text-lg"
          >
            Explore All Properties
          </Button>
          <p className="text-muted-foreground">
            Join 50,000+ satisfied customers who found their dream homes
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
