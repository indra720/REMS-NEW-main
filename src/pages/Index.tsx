import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { toast } from "react-toastify";
import {
  Building2,
  Search,
  MapPin,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Home,
  Calculator,
  PieChart,
  BarChart3,
  Play,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Award,
  Shield,
  Clock,
  IndianRupee,
  Mic,
  Camera,
  Video,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropertyCard2 from "@/components/ui/PropertyCard2";
import SearchInterface from "@/components/ui/SearchInterface";
import { SearchProvider, useSearch } from "../context/SearchContext";
import PropertyCategories from "@/components/ui/PropertyCategories";
import BuyRentSell from "@/components/ui/BuyRentSell";
import VideoTours from "@/components/ui/VideoTours";
import PropertyListings from "@/components/ui/PropertyListings";
import AIFeatures from "@/components/ui/AIFeatures";
import { TopDest, destinations } from "@/components/ui/top_dest";
import Browse_exp from "@/components/ui/browse_exp";
import { FeaturesGrid } from "@/components/ui/features-grid";
import { createPortal } from "react-dom";
import Header from "@/components/Header";
import {
  fetchProperties as fetchPropertiesAPI,
  fetchAIProperties,
} from "@/lib/api";
import { BASE_URL } from "@/lib/constants";
// import videoApartment from "@/Video/apartment.mp4";
import backgroundVideo from "@/assets/backgroundVideo.mp4";

import sharmaPriyaImg from "../assets/images/sharma_priya.jpg";
import amitkumarImg from "../assets/images/amitkumar.webp";
import anitapatelImg from "../assets/images/anita paterl.jpg";
import rajeshkumarImg from "../assets/images/rajesh.jpg";

// Define interfaces for type safety
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType: string;
  budget: string;
  location: string;
  message: string;
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  rent: string;
  images: { image: string }[]; // Changed to match PropertyCard2.tsx
  rating: number;
  tag: string;
  type: "sale" | "rent";
  bhk: string;
  area: string;
  furnished: string;
}

interface Agent {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  deals: string;
  image: string;
  phone: string;
  email: string;
}

interface PropertyService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const Index = () => {
  const navigate = useNavigate();
  const { setSearchParams } = useSearch(); // Get setSearchParams from context
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyType: "",
    budget: "",
    location: "",
    message: "",
  });
  const [properties, setProperties] = useState<any[]>([]);
  const [premiumProperties, setPremiumProperties] = useState<any[]>([]);
  const [activePremiumTab, setActivePremiumTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchInitialProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchPropertiesAPI();
      setProperties(data);
    } catch (error) {
      // console.error("Failed to fetch properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPremiumProperties = async () => {
    try {
      const data = await fetchAIProperties();
      // console.log("Premium Properties Data:", data);
      setPremiumProperties(data);
    } catch (error) {
      // console.error("Failed to fetch premium properties:", error);
    }
  };

  useEffect(() => {
    fetchInitialProperties();
    fetchPremiumProperties();
  }, []);

  const filteredPremiumProperties = premiumProperties.filter((property) => {
    if (activePremiumTab === "all") return true;
    return property.category.toLowerCase() === activePremiumTab;
  });

  // Function to handle phone calls
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    // toast.info(`Initiating Call: Calling ${phoneNumber}...`);
  };

  // Function to handle WhatsApp
  const handleWhatsApp = (
    phoneNumber: string,
    message: string = "Hi, I'm interested in your property services."
  ) => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    // toast.info("Redirecting to WhatsApp...");
  };

  // Function to handle email
  const handleEmail = (
    emailAddress: string,
    subject: string = "Property Inquiry"
  ) => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}`;
    // toast.info(`Composing email to ${emailAddress}...`);
  };

  // Function to handle voice search
  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onstart = () => {
        // toast.info("Listening... Please speak your search query.");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        // toast.info(`Searching for: "${transcript}"`);
        navigate(`/property-search?q=${encodeURIComponent(transcript)}`);
      };

      recognition.onerror = () => {
        // toast.error("Voice Search Error: Please try again or use text search.");
      };

      recognition.start();
    } else {
      // toast.error(
      //   "Voice Search Not Supported: Please use text search instead."
      // );
    }
  };

  // Function to handle image search
  const handleImageSearch = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // toast.info("Processing image for property search...");
        // Here you would typically upload to a service and get search results
        setTimeout(() => {
          // toast.success("Found similar properties! Redirecting to results...");
          navigate("/property-search?type=image");
        }, 2000);
      }
    };
    input.click();
  };

  // Function to handle virtual tour
  const handleVirtualTour = () => {
    // toast.info("Redirecting to virtual tour platform...");
    navigate("/book-visit?type=virtual");
  };

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.email) {
      // toast.error("Please fill in all required fields.");
      return;
    }

    // toast.success(
    //   "Callback Requested: Our team will contact you within 24 hours."
    // );

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      propertyType: "",
      budget: "",
      location: "",
      message: "",
    });
  };

  // Function to handle quick search filters
  const handleQuickFilter = (filterType: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("filter", filterType);
    navigate(`/property-search?${searchParams.toString()}`);
    // toast.info(`Searching for ${filterType}...`);
  };

  const featuredProperties: Property[] = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "Bandra West, Mumbai",
      price: "₹2,50,00,000",
      rent: "₹85,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
        },
      ],
      rating: 4.8,
      tag: "Featured",
      type: "sale",
      bhk: "3 BHK",
      area: "1,250 sq ft",
      furnished: "Fully Furnished",
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Whitefield, Bangalore",
      price: "₹1,80,00,000",
      rent: "₹45,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        },
      ],
      rating: 4.9,
      tag: "Premium",
      type: "sale",
      bhk: "4 BHK",
      area: "2,100 sq ft",
      furnished: "Semi Furnished",
    },
    {
      id: 3,
      title: "Cozy 2BHK Flat",
      location: "Koregaon Park, Pune",
      price: "₹95,00,000",
      rent: "₹32,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
        },
      ],
      rating: 4.6,
      tag: "Best Value",
      type: "rent",
      bhk: "2 BHK",
      area: "950 sq ft",
      furnished: "Furnished",
    },
    {
      id: 4,
      title: "Studio Apartment",
      location: "Gachibowli, Hyderabad",
      price: "₹45,00,000",
      rent: "₹18,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        },
      ],
      rating: 4.4,
      tag: "Ready to Move",
      type: "rent",
      bhk: "1 BHK",
      area: "600 sq ft",
      furnished: "Fully Furnished",
    },
    {
      id: 5,
      title: "Penthouse Suite",
      location: "Cyber City, Gurgaon",
      price: "₹4,50,00,000",
      rent: "₹1,20,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
        },
      ],
      rating: 4.9,
      tag: "Luxury",
      type: "sale",
      bhk: "4 BHK",
      area: "3,200 sq ft",
      furnished: "Designer Furnished",
    },
    {
      id: 6,
      title: "Service Apartment",
      location: "Indiranagar, Bangalore",
      price: "₹75,00,000",
      rent: "₹28,000/month",
      images: [
        {
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        },
      ],
      rating: 4.7,
      tag: "New Launch",
      type: "rent",
      bhk: "2 BHK",
      area: "1,100 sq ft",
      furnished: "Fully Furnished",
    },
  ];

  const agents: Agent[] = [
    {
      id: 1,
      name: "Rajesh Sharma",
      specialization: "Luxury Properties",
      experience: "8+ Years",
      rating: 4.9,
      deals: "500+ Deals",
      image: rajeshkumarImg,
      phone: "+91 98765 43210",
      email: "rajesh@realestate.com",
    },
    {
      id: 2,
      name: "Priya Patel",
      specialization: "Residential & Commercial",
      experience: "6+ Years",
      rating: 4.8,
      deals: "350+ Deals",
      image: sharmaPriyaImg,
      phone: "+91 87654 32109",
      email: "priya@realestate.com",
    },
    {
      id: 3,
      name: "Amit Kumar",
      specialization: "Investment Properties",
      experience: "10+ Years",
      rating: 4.9,
      deals: "600+ Deals",
      image: amitkumarImg,
      phone: "+91 76543 21098",
      email: "amit@realestate.com",
    },
  ];

  const propertyServices: PropertyService[] = [
    {
      icon: Calculator,
      title: "EMI Calculator",
      description: "Calculate your monthly EMI with our advanced calculator",
      color: "text-purple-500",
    },
    {
      icon: PieChart,
      title: "Property Valuation",
      description: "Get instant property value estimates using AI",
      color: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Market Trends",
      description: "Analyze real estate market trends and predictions",
      color: "text-purple-500",
    },
    {
      icon: Shield,
      title: "Legal Verification",
      description: "Complete legal verification and documentation support",
      color: "text-orange-500",
    },
  ];

  const headings: JSX.Element[] = [
    <>
      Find{" "}
      <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
        Exclusive Homes
      </span>{" "}
      That
      <br className="hidden sm:block" />
      <span className="block sm:inline">Fit Your Life Style</span>
    </>,
    <>
      Discover{" "}
      <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
        Dream Apartments
      </span>{" "}
      For Your Comfort
      <br className="hidden sm:block" />
    </>,
    <>
      Explore{" "}
      <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
        Modern Villas
      </span>{" "}
      Near
      <br className="hidden sm:block" />
      <span className="block sm:inline">The Cityscape</span>
    </>,
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // hide before change
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length);
        setAnimate(true); // show after change
      }, 300); // animation hide time
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [headings.length]);

  const handleCitySelect = (city: string) => {
    navigate(`/search?location=${encodeURIComponent(city)}`);
    // toast.info(`Searching for properties in ${city}...`);
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/search?type=${encodeURIComponent(category)}`);
  };

  const [propertydata, setpropertydata] = useState<any[]>([]);
  const propertiesdata = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${BASE_URL}properties/search/`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setpropertydata(data);
        // toast({
        //   title: "fetched data",
        //   description: "data fetched successfully",
        // });
      } else {
        // console.log("data not fetched");
      }
    } catch (error) {
      // console.log(error);
      // toast.error("Failed to fetch properties.");
    }
  };
  useEffect(() => {
    propertiesdata();
  }, []);

  return (
    <div className="bg-[white]">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
        {/* Background Image or Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={backgroundVideo}
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 md:px-10 flex flex-col items-center">
          {/* Heading */}
          <h1
            className={`text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-tight tracking-tight transition-all duration-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {headings[currentIndex]}
          </h1>

          <p className="text-gray-200 mt-5 text-base sm:text-lg md:text-xl max-w-2xl">
            Explore luxury apartments, modern villas, and premium properties
            near you.
          </p>

          {/* Search */}
          <div className="mt-10 w-full ">
            <SearchProvider>
              <SearchInterface />
            </SearchProvider>
          </div>

          {/* Scroll Hint */}
          <div className="mt-16 animate-bounce text-white/60 text-sm">
            ↓ Scroll to explore
          </div>
        </div>
      </section>

      <TopDest onCitySelect={handleCitySelect} />
      <BuyRentSell />
      <PropertyCategories onCategorySelect={handleCategorySelect} />

      {/* Video Tour Section */}
      <VideoTours />
      <Browse_exp />

      {/* Featured Properties with Enhanced Design */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-gradient-to-r from-indigo-400 to-teal-400 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              Premium{" "}
              <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                Properties
              </span>
            </h2>
            <p className="text-lg text-gray-500">
              Handpicked properties for sale and rent
            </p>

            {/* Tabs */}
            <div className="flex justify-center mt-8">
              <Tabs
                defaultValue="all"
                className="w-auto"
                onValueChange={(value) => setActivePremiumTab(value)}
              >
                <TabsList className="bg-white/30 backdrop-blur-md rounded-full p-1 shadow-md">
                  <TabsTrigger
                    value="all"
                    className="rounded-full px-6 py-2 text-gray-800 hover:text-white hover:bg-purple-600 transition-all duration-300"
                  >
                    All Properties
                  </TabsTrigger>
                  <TabsTrigger
                    value="sale"
                    className="rounded-full px-6 py-2 text-gray-800 hover:text-white hover:bg-purple-600 transition-all duration-300"
                  >
                    For Sale
                  </TabsTrigger>
                  <TabsTrigger
                    value="rent"
                    className="rounded-full px-6 py-2 text-gray-800 hover:text-white hover:bg-purple-600 transition-all duration-300"
                  >
                    For Rent
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPremiumProperties.slice(0, 3).map((property, index) => (
              <Card
                key={property.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/20 backdrop-blur-lg border border-white/20 transform hover:-translate-y-2 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <Heart className="top-3 right-3 text-white absolute z-50 w-6 h-6 cursor-pointer" />
                  <span
                    className={`top-3 left-3 absolute z-50 text-[12px] font-semibold py-1 px-3 rounded-2xl ${
                      property.category === "Rent"
                        ? "bg-green-500 text-white group-hover:bg-purple-600"
                        : "bg-yellow-600 text-black group-hover:bg-purple-600"
                    }`}
                  >
                    {property.category}
                  </span>
                  {property.images && property.images.length > 0 ? (
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
                      ₹{parseFloat(property.price).toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {property.property_status}
                    </span>
                    {activePremiumTab === "rent" && (
                      <span className="text-sm text-gray-500">/month</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
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

                  <div className="grid grid-cols-2 gap-3 mt-auto">
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

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link to="/property-search">
              <Button
                size="lg"
                className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Property Services Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              Property{" "}
              <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                Services
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Complete real estate solutions at your fingertips
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyServices.map((service, index) => (
              <Card
                key={index}
                onClick={() => {
                  if (service.title === "EMI Calculator")
                    navigate("/emi-calculator");
                  else if (service.title === "Property Valuation")
                    navigate("/property-valuation");
                  else if (service.title === "Market Trends")
                    navigate("/price-trends");
                  else if (service.title === "Legal Verification")
                    navigate("/our-services");
                }}
                className="group relative p-8 bg-white dark:bg-gray-900/60 border border-gray-200/20 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-3 hover:rotate-1 cursor-pointer"
              >
                {/* Floating Icon */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 
              ${
                index % 2 === 0
                  ? "bg-gradient-to-tr from-purple-500 to-pink-500"
                  : "bg-gradient-to-tr from-indigo-500 to-purple-500"
              } 
              shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <service.icon className="text-white text-4xl" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  size="sm"
                >
                  Try Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Agents Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">
              Meet Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                Expert Agents
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Trusted professionals to guide your property journey
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="relative bg-gradient-to-tr from-gray-800/80 to-gray-900/80 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center group"
              >
                {/* Profile Picture */}
                <div className="relative w-28 h-28 mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-400 text-white px-2 py-1 text-xs rounded-full flex items-center shadow-lg">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified
                  </span>
                </div>

                {/* Name & Specialization */}
                <h3 className="text-xl font-bold mb-1 text-white">
                  {agent.name}
                </h3>
                <p className="text-gradient font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                  {agent.specialization}
                </p>
                <p className="text-gray-300 mb-2">description here</p>

                {/* Stats */}
                <div className="flex justify-between w-full text-center text-gray-300 text-sm mb-4">
                  <div>
                    <div className="font-semibold text-white">
                      {agent.experience}
                    </div>
                    Years Exp.
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {agent.deals}
                    </div>
                    Deals Closed
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {agent.rating}
                    </div>
                    Rating
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:from-indigo-500 hover:via-pink-400 hover:to-purple-500 transition-all duration-300"
                    onClick={() => handleCall(agent.phone)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gray-800 border border-purple-500 text-purple-400 font-semibold rounded-lg shadow hover:bg-purple-500 hover:text-white transition-all duration-300"
                    onClick={() => navigate(`/agent/${agent.id}`)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyListings />
      <FeaturesGrid />

      {/* Enquiry Form Section */}
      {/* <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Get Expert Consultation
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with our property experts for personalized advice and
                assistance
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Free Property Consultation
                    </h3>
                    <p className="text-muted-foreground">
                      Get expert advice on buying, selling, or renting
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">24/7 Support</h3>
                    <p className="text-muted-foreground">
                      Round-the-clock assistance for all your queries
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Trusted Professionals</h3>
                    <p className="text-muted-foreground">
                      Verified agents with proven track records
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Request a Callback</CardTitle>
                <p className="text-muted-foreground">
                  Fill in your details and we'll get back to you
                </p>
              </CardHeader>

              <form onSubmit={handleFormSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Interest</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, propertyType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Looking to Buy</SelectItem>
                        <SelectItem value="sell">Want to Sell</SelectItem>
                        <SelectItem value="rent">Looking for Rent</SelectItem>
                        <SelectItem value="lease">Want to Lease Out</SelectItem>
                        <SelectItem value="investment">
                          Investment Opportunity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-property bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Request Callback
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    By submitting, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section> */}

      <AIFeatures />

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 overflow-hidden text-white">
        {/* Floating decorative circles */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-md text-white">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-white/70">
              Real experiences from real people who found their dream homes
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai, Maharashtra",
                rating: 5,
                text: "Amazing experience! Found my dream home in just 2 weeks. The virtual tour feature helped me narrow down my choices before visiting. Highly recommended!",
                img: sharmaPriyaImg,
              },
              {
                name: "Rajesh Kumar",
                location: "Bangalore, Karnataka",
                rating: 5,
                text: "Professional service and transparent pricing. The EMI calculator helped me plan my budget perfectly. Got the keys to my new villa last month!",
                img: rajeshkumarImg,
              },
              {
                name: "Anita Patel",
                location: "Pune, Maharashtra",
                rating: 4.8,
                text: "Great platform with genuine listings. The legal verification service gave me peace of mind. Smooth property registration process.",
                img: anitapatelImg,
              },
            ].map((customer, idx) => (
              <Card
                key={idx}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                {/* Customer avatar */}
                <div className="absolute -top-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                  <img
                    src={customer.img}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-12 flex flex-col items-center">
                  {/* Rating stars */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(customer.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-white/70">
                      {customer.rating}
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {customer.text}
                  </p>

                  {/* Customer info */}
                  <div>
                    <div className="font-semibold text-white">
                      {customer.name}
                    </div>
                    <div className="text-sm text-white/60">
                      {customer.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-full shadow-md transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                {/* <Star className="h-5 w-5" /> */}
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        {/* Subtle overlay for elegance */}
        <div className="absolute inset-0 bg-black/20 -z-10 rounded-3xl"></div>

        {/* Floating decorative circles */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
            Ready to Find Your Dream Home?
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl mb-10 text-white/90 leading-relaxed">
            Join thousands of satisfied customers who found their perfect
            property with us
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA */}
            <Link to="/login">
              <Button
                size="lg"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-purple-600 hover:text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
              >
                <Users className="h-5 w-5" />
                Get Started
              </Button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/book-visit">
              <Button
                size="lg"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-purple-600 hover:text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
              >
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
