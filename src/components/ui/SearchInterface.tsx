import { useState } from "react";
import { Search, MapPin, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const SearchInterface = () => {
  const navigate = useNavigate();
  const [activeSearchTab, setActiveSearchTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownValue, setDropdownValue] = useState("all-residential");
  const [loading, setLoading] = useState(false);

  const searchTabs = ["Buy", "Rent", "New Launch", "Commercial", "Plots/Land", "Projects", "Post Property"];
  const popularSearches = ["Jaipur", "Bangalore", "Chennai", "Mumbai", "Hyderabad", "Pune", "Delhi NCR", "Ahmedabad"];

  const getPlaceholderText = () => {
    switch (activeSearchTab) {
      case "Buy": return 'Search "Hyderabad"';
      case "Rent": return 'Search for rental properties "Mumbai"';
      case "New Launch": return 'Search new projects "Bangalore"';
      case "Commercial": return 'Search commercial spaces "Delhi"';
      case "Plots/Land": return 'Search plots/land "Chennai"';
      case "Projects": return 'Search projects "Pune"';
      case "Post Property": return 'Enter property details';
      default: return 'Search location';
    }
  };

  const getDropdownOptions = () => {
    switch (activeSearchTab) {
      case "Buy":
      case "Rent":
        return [
          { value: "all-residential", label: "All Residential" },
          { value: "Apartment", label: "Apartments" },
          { value: "Villa", label: "Villas" },
          { value: "Plot", label: "Plots" },
        ];
      case "New Launch":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "Apartment Projects", label: "Apartment Projects" },
          { value: "Villa Projects", label: "Villa Projects" },
        ];
      case "Commercial":
        return [
          { value: "all-commercial", label: "All Commercial" },
          { value: "Office Space", label: "Office Space" },
          { value: "Retail Space", label: "Retail Space" },
          { value: "Warehouse", label: "Warehouse" },
        ];
      case "Plots/Land":
        return [
          { value: "all-plots", label: "All Plots/Land" },
          { value: "Residential Plot", label: "Residential Plots" },
          { value: "Commercial Plot", label: "Commercial Plots" },
          { value: "Agricultural Land", label: "Agricultural Land" },
        ];
      case "Projects":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "Ongoing Projects", label: "Ongoing Projects" },
          { value: "Completed Projects", label: "Completed Projects" },
        ];
      case "Post Property":
        return [
          { value: "property-type", label: "Select Property Type" },
          { value: "Residential", label: "Residential" },
          { value: "Commercial", label: "Commercial" },
        ];
      default:
        return [{ value: "all-residential", label: "All Residential" }];
    }
  };

  const getDropdownValue = (tab) => {
    switch (tab) {
      case "Buy":
      case "Rent":
        return "all-residential";
      case "New Launch":
      case "Projects":
        return "all-projects";
      case "Commercial":
        return "all-commercial";
      case "Plots/Land":
        return "all-plots";
      case "Post Property":
        return "property-type";
      default:
        return "all-residential";
    }
  };

  const getButtonText = () => {
    return activeSearchTab === "Post Property" ? "Post Free Ad" : "Search";
  };

  // Handle search with navigation
  const handleSearch = () => {
    setLoading(true);
    
    if (activeSearchTab === "Post Property") {
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.set('title', searchQuery);
      if (dropdownValue) searchParams.set('type', dropdownValue);
      navigate(`/post-property?${searchParams.toString()}`);
    } else {
      // Create search parameters
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.set('location', searchQuery);
      if (activeSearchTab === "Commercial" && dropdownValue && dropdownValue !== 'all-commercial') {
        searchParams.set('property_status', dropdownValue);
      } else if (dropdownValue && dropdownValue !== 'all-residential') {
        searchParams.set('type', dropdownValue);
      }

      let backendCategory = activeSearchTab;
      if (activeSearchTab === "Buy") {
        backendCategory = "Sale";
      }
      // For 'Rent', it's already 'Rent', so no change needed

      if (backendCategory) searchParams.set('category', backendCategory);
      if (activeSearchTab === "New Launch") searchParams.set('new_launch', 'true');
      
      // console.log("SearchInterface: Navigating with URL params:", searchParams.toString());
      // Navigate to Index2 with search parameters
      navigate(`/search?${searchParams.toString()}`);
    }
    
    setLoading(false);
  };

  // Handle popular search clicks
  const handlePopularSearch = (location) => {
    setSearchQuery(location);
    const searchParams = new URLSearchParams();
    searchParams.set('location', location);
    if (activeSearchTab === "Commercial" && dropdownValue && dropdownValue !== 'all-commercial') {
      searchParams.set('property_status', dropdownValue);
    } else if (dropdownValue && dropdownValue !== 'all-residential') {
      searchParams.set('type', dropdownValue);
    }

    let backendCategory = activeSearchTab;
    if (activeSearchTab === "Buy") {
      backendCategory = "Sale";
    }
    // For 'Rent', it's already 'Rent', so no change needed

    if (backendCategory) searchParams.set('category', backendCategory);
    if (activeSearchTab === "New Launch") searchParams.set('new_launch', 'true');
    // console.log("SearchInterface: Navigating with URL params (popular search):", searchParams.toString());
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
   <div className="w-full max-w-6xl mx-auto px-4">
  <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
    
    {/* Decorative Gradient Shapes */}
    <div className="absolute -top-16 -z-10 -left-16 w-64 h-64 bg-gradient-to-tr from-purple-300 to-cyan-300 rounded-full opacity-30 animate-pulse"></div>
    <div className="absolute -bottom-16 -z-10 -right-16 w-72 h-72 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full opacity-30 animate-pulse"></div>

    {/* Tabs */}
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {searchTabs.map((tab) => (
        <Button
          key={tab}
          variant={activeSearchTab === tab ? "default" : "ghost"}
          className={cn(
            "px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg",
            activeSearchTab === tab
              ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg hover:scale-105"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:text-purple-600"
          )}
          onClick={() => {
            setActiveSearchTab(tab);
            setDropdownValue(getDropdownValue(tab));
          }}
        >
          {tab}
          {tab === "New Launch" && (
            <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          )}
          {tab === "Post Property" && (
            <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold shadow-sm">
              FREE
            </span>
          )}
        </Button>
      ))}
    </div>

    {/* Search Fields */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-purple-400" />
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={getPlaceholderText()}
          className="pl-12 pr-20 sm:pr-24 h-14 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base shadow-md bg-white/80 backdrop-blur-sm transition-all duration-300"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full">
            <MapPin className="h-4 w-4 text-cyan-500" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full">
            <Mic className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>

      <Select
        value={dropdownValue}
        onValueChange={(value) => setDropdownValue(value)}
      >
        <SelectTrigger className="w-full sm:w-56 h-14 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base shadow-md bg-white/80 backdrop-blur-sm transition-all duration-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {getDropdownOptions().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-2xl h-14 px-8 shadow-xl hover:scale-105 transform transition-transform duration-200 w-full sm:w-auto"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : getButtonText()}
      </Button>
    </div>

  </div>
</div>

  );
};

export default SearchInterface;