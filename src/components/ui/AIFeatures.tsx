import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Search, Target, MapPin, DollarSign } from "lucide-react";

const AIFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Property Matching",
      description: "Our AI analyzes your preferences and behavior to recommend properties that perfectly match your needs and lifestyle.",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Price Prediction",
      description: "Get accurate price forecasts and market trends powered by machine learning algorithms and real-time data.",
      color: "text-accent"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Use natural language to search for properties. Just describe what you want, and our AI will find it.",
      color: "text-real-estate-success"
    },
    {
      icon: Target,
      title: "Investment Analysis",
      description: "AI-powered ROI calculations and investment potential analysis for each property in your portfolio.",
      color: "text-purple-600"
    },
    {
      icon: MapPin,
      title: "Neighborhood Insights",
      description: "Get detailed insights about neighborhoods including schools, crime rates, amenities, and future development plans.",
      color: "text-accent"
    },
    {
      icon: DollarSign,
      title: "Smart Financing",
      description: "AI recommends the best mortgage options and calculates optimal down payments based on your financial profile.",
      color: "text-real-estate-success"
    }
  ];

  return (
   <section className="py-16 bg-gray-950 relative overflow-hidden">
  {/* Background Shapes */}
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-40 right-20 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl animate-bounce"></div>
    <div className="absolute top-60 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    {/* Section Header */}
    <div className="text-center mb-20">
      <span className="text-sm font-bold tracking-widest uppercase text-blue-400 mb-2 inline-block animate-fadeIn">
        Next-Gen Technology
      </span>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 animate-fadeIn">
        Powered by{' '}
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Artificial Intelligence
        </span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
        Revolutionize real estate discovery with AI-driven insights, personalized recommendations, 
        and smart analytics for your perfect property.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 shadow-2xl transform transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/20 group animate-fadeIn"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

          <CardContent className="p-8 text-center relative z-10">
            <div className="mb-6 flex justify-center relative">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-500 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-glow transform transition-all duration-300 ${feature.color} border border-white/20`}>
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-blue-400">
              {feature.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              {feature.description}
            </p>

            <button className="mt-6 text-blue-400 font-semibold uppercase tracking-wider text-sm transition-all duration-300 group-hover:text-purple-400 hover:scale-105">
              Learn More →
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

  );
};

export default AIFeatures;