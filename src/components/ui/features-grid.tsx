import React from 'react';
import { Shield, Users, MapPin, Smartphone, Gift, Clock, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  { icon: Shield, title: "Verified Listings", description: "All properties are thoroughly verified for your safety and peace of mind", color: "from-blue-400 to-blue-500" },
  { icon: Users, title: "Trusted Agents", description:"Work with licensed agents you can rely on", color: "from-purple-400 to-purple-500" },
  { icon: MapPin, title: "Prime Locations", description: "Explore properties in the most desirable neighborhoods", color: "from-teal-400 to-teal-500" },
  { icon: Heart, title: "Best Price Guarantee", description: "Find your dream home at the right price", color: "from-red-400 to-red-500" },
  { icon: Star, title: "Premium Listings", description: "Access exclusive properties not listed elsewhere", color: "from-yellow-400 to-yellow-500" },
  { icon: Clock, title: "24/7 Support", description: "Our team is always ready to assist you with queries", color: "from-green-400 to-green-500" },
  { icon: Smartphone, title: "Mobile Friendly", description: "Browse and book properties easily from any device", color: "from-indigo-400 to-indigo-500" },
  { icon: Gift, title: "Special Offers", description: "Get access to discounts, deals, and property promos", color: "from-pink-400 to-pink-500" }
];

export const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      {/* Decorative gradient shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-500 text-white border-none inline-flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
            Make Your <span className='text-indigo-600'>Dream Home a Reality</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore verified properties, trusted agents, and exclusive deals designed to make home buying seamless and exciting.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative border-0 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Animated underline on hover */}
                  <div className="mt-3 h-1 w-10 mx-auto bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
