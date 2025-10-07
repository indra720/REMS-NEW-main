import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X, Clock, MapPin, IndianRupee, Heart, Share2, Eye, Bed, Bath, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../lib/constants";

const VideoPlayerModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  const absoluteVideoUrl = new URL(videoUrl, window.location.origin).href;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors"
        >
          <X size={32} />
        </button>
        <video controls autoPlay className="w-full rounded-2xl shadow-2xl">
          <source src={absoluteVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const VideoTours = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setProperties(staticVideoData);
        setLoading(false);
        return;

        // Uncomment when backend is ready
        // const response = await fetch(`${BASE_URL}properties/`);
        // if (response.ok) {
        //   const data = await response.json();
        //   setProperties(data.slice(0, 4));
        // }
      } catch (error) {
        setProperties(staticVideoData);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const staticVideoData = [
    {
      id: 1,
      title: "Luxurious Cabin in the Woods",
      slug: "luxurious-cabin-in-the-woods",
      images: [{ image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500" }],
      location: "Aspen, Colorado",
      price: "2,500,000",
      description: "A stunning cabin with modern amenities, nestled in the heart of the mountains.",
      property_status: "For Sale",
      bedrooms: 4,
      bathrooms: 3,
      area_sqft: "3,200",
      listed_on: "2025-09-28",
      duration: "2:30",
    },
    {
      id: 2,
      title: "Modern Estate with Ocean View",
      slug: "modern-estate-with-ocean-view",
      images: [{ image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500" }],
      location: "Malibu, California",
      price: "12,500,000",
      description: "Experience coastal living at its finest in this breathtaking modern estate.",
      property_status: "For Sale",
      bedrooms: 6,
      bathrooms: 8,
      area_sqft: "10,500",
      listed_on: "2025-09-25",
      duration: "4:15",
    },
    {
      id: 3,
      title: "Downtown Apartment with a View",
      slug: "downtown-apartment-with-a-view",
      images: [{ image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500" }],
      location: "New York, New York",
      price: "4,800,000",
      description: "A chic and stylish apartment in the heart of the city, with panoramic views.",
      property_status: "For Sale",
      bedrooms: 2,
      bathrooms: 2,
      area_sqft: "1,800",
      listed_on: "2025-09-22",
      duration: "3:05",
    },
    {
      id: 4,
      title: "Spacious Penthouse with Rooftop Pool",
      slug: "spacious-penthouse-with-rooftop-pool",
      images: [{ image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500" }],
      location: "Miami, Florida",
      price: "8,900,000",
      description: "The ultimate in luxury living, this penthouse boasts a private rooftop pool and stunning city views.",
      property_status: "For Sale",
      bedrooms: 5,
      bathrooms: 6,
      area_sqft: "6,000",
      listed_on: "2025-09-20",
      duration: "5:20",
    },
  ];

  const featuredProperty = properties.length > 0 ? properties[0] : null;

  const handleDetailsNavigation = (slug, videoUrl, propertyData) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/property/${slug}`, {
        state: { videoUrl, propertyData },
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50/30 py-20 overflow-hidden">
      <VideoPlayerModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-200/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
              Immersive Experience
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
              Virtual Property
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Tours & Videos
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience properties like never before with our immersive virtual tours, 
            360° walkthroughs, and professional video showcases
          </p>
        </div>

        {/* Featured Property - Hero Card */}
        {loading ? (
          <div className="mb-20 flex items-center justify-center h-96">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 text-lg">Loading amazing properties...</p>
            </div>
          </div>
        ) : (
          featuredProperty && (
            <div className="mb-20">
              <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-lg hover:shadow-purple-200/50 transition-all duration-700 group">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image Section - 3 columns */}
                  <div className="lg:col-span-3 relative h-[400px] lg:h-auto overflow-hidden">
                    <img
                      src={featuredProperty.images?.[0]?.image || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"}
                      alt={featuredProperty.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="w-20 h-20 rounded-full bg-white/95 hover:bg-white text-purple-600 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 group/btn"
                        onClick={() => setSelectedVideo(featuredProperty.video_url)}
                      >
                        <Play className="w-8 h-8 fill-current group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg">
                        🔥 Featured
                      </Badge>
                      <Badge className="bg-white/95 text-gray-800 border-0 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                        {featuredProperty.property_status}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-6 right-6 flex gap-2">
                      <Button size="sm" variant="ghost" className="w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm">
                        <Heart className="w-4 h-4 text-gray-700" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm">
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </Button>
                    </div>

                    {/* Views Counter */}
                    <div className="absolute bottom-6 right-6">
                      <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm">
                        <Eye className="w-4 h-4" />
                        <span>12.5K views</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - 2 columns */}
                  <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                          {featuredProperty.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-6">
                          <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                          <span className="text-lg">{featuredProperty.location}</span>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{featuredProperty.price}
                          </span>
                          <span className="text-gray-500 text-sm">/ month</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {featuredProperty.description}
                        </p>
                      </div>

                      {/* Property Stats */}
                      <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Bed className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{featuredProperty.bedrooms}</div>
                          <div className="text-sm text-gray-500">Bedrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Bath className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{featuredProperty.bathrooms}</div>
                          <div className="text-sm text-gray-500">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Maximize2 className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{featuredProperty.area_sqft}</div>
                          <div className="text-sm text-gray-500">Sq Ft</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/cta"
                        onClick={() => setSelectedVideo(featuredProperty.video_url)}
                      >
                        <Play className="w-5 h-5 mr-2 group-hover/cta:scale-110 transition-transform" />
                        Watch Virtual Tour
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                        onClick={() => handleDetailsNavigation(featuredProperty.slug, featuredProperty.video_url, featuredProperty)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        )}

        {/* Property Grid */}
        {!loading && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">More Properties</h3>
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All →
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(1, 4).map((video, index) => (
                <Card
                  key={video.id}
                  className="group overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={video.images?.[0]?.image || video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        className="w-16 h-16 rounded-full bg-white/95 hover:bg-white text-purple-600 shadow-2xl hover:scale-110 transition-all duration-300"
                        onClick={() => setSelectedVideo(video.video_url)}
                      >
                        <Play className="w-6 h-6 fill-current" />
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge className="bg-purple-600/90 backdrop-blur-sm text-white border-0 px-3 py-1">
                        {video.property_status}
                      </Badge>
                      <Button size="sm" variant="ghost" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white p-0">
                        <Heart className="w-4 h-4 text-gray-700" />
                      </Button>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/70 backdrop-blur-sm text-white border-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{video.location}</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {video.bedrooms}
                        </div>
                        <div className="text-xs text-gray-500">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {video.bathrooms}
                        </div>
                        <div className="text-xs text-gray-500">Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {video.area_sqft}
                        </div>
                        <div className="text-xs text-gray-500">Sq Ft</div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{video.price}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold"
                        onClick={() => setSelectedVideo(video.video_url)}
                      >
                        View →
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 border-2 border-purple-600 bg-transparent text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDetailsNavigation(video.slug, video.video_url, video);
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => navigate("/contact")}
                      >
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default VideoTours;