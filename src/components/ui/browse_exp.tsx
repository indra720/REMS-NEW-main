import React, { useState, useEffect } from "react";
import { IndianRupee } from "lucide-react";
import { BASE_URL } from "../../lib/constants";
import darjeeling7Img from "../../assets/images/darjeeling7.jpg";
import gulmarg8Img from "../../assets/images/gulmarg8.jpg";
import honeymoonImg from "../../assets/images/honeymoon.png";
import mussoorieImg from "../../assets/images/mussoorie.jpg";
import auli9Img from "../../assets/images/auli9.jpg";
import ranikhet3Img from "../../assets/images/ranikhet3.jpg";
import munnar2Img from "../../assets/images/munnar2.jpg";
import ladhakImg from "../../assets/images/ladhak.jpg";
import goaImg from "../../assets/images/goa.jpg";
import udaipurImg from "../../assets/images/udaipur.jpg";
import delhiImg from "../../assets/images/delhi.jpg";
import citybreakImg from "../../assets/images/citybreak.png";
import adventrueImg from "../../assets/images/adventrue.jpg";
import all_exclusiveImg from "../../assets/images/all_exclusive.jpg";
import beachImg from "../../assets/images/beach.jpg";
import countryImg from "../../assets/images/country.jpg";
import familyImg from "../../assets/images/family.jpg";
import foodImg from "../../assets/images/food.jpg";
import luxury_roomImg from "../../assets/images/luxury_room.jpg";
import shoppingImg from "../../assets/images/shopping.jpg";
import skiImg from "../../assets/images/ski.jpg";
import spaImg from "../../assets/images/spa.jpg";
import villaImg from "../../assets/images/villa.jpg";
import placeholderImg from "../../assets/images/placeholder.svg";
// This is a dummy comment to trigger re-compilation

import { internationalProperties as staticInternationalProperties } from "../../lib/static-data";

const Browse_exp = () => {
  const [activeTab, setActiveTab] = useState<"International" | "Domestic">(
    "Domestic"
  );

  const [domesticProperties, setDomesticProperties] = useState([]);
  const [internationalProperties, setInternationalProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domesticResponse = await fetch(
          BASE_URL + "properties/top-ai-properties/"
        );
        const domesticData = await domesticResponse.json();
        setDomesticProperties(Array.isArray(domesticData) ? domesticData : []);
        setInternationalProperties(staticInternationalProperties);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchData();
  }, []);

  const propertydata =
    activeTab === "Domestic" ? domesticProperties : internationalProperties;

  const formatPrice = (price, currency = "₹") => {
    const num = parseFloat(price);
    if (isNaN(num)) {
      return price;
    }
    if (num >= 10000000) {
      return `${currency} ${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `${currency} ${(num / 100000).toFixed(2)} Lac`;
    }
    return `${currency} ${num.toLocaleString("en-IN")}`;
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-40 -right-24 w-96 h-96 bg-gradient-to-r from-indigo-400 to-teal-400 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Browse by{" "}
            <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              Experience
            </span>
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Discover handpicked experiences for Domestic and International
            destinations
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mt-8 text-lg font-semibold">
            {["Domestic", "International"].map((tab) => (
              <span
                key={tab}
                className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-full font-semibold ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={() =>
                  setActiveTab(tab as "Domestic" | "International")
                }
              >
                {tab.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Grid: Featured Experiences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {Array.isArray(propertydata) &&
              propertydata.slice(0, 4).map((property) => (
                <div
                  key={property.id}
                  className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                >
                  {/* Property Image */}
                  <div
                    className="h-64 w-full bg-gray-200 rounded-t-3xl overflow-hidden relative"
                    style={{
                      backgroundImage: `url(${
                        property.images?.[0]?.image ||
                        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    {property.category && (
                      <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {property.category}
                      </span>
                    )}
                    {property.featured && (
                      <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Property Info */}
                  <div className="bg-white rounded-b-3xl p-6 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {property.title}
                    </h3>

                    {property.description && (
                      <p className="text-gray-600 text-sm text-wrap">
                        {property.description}
                      </p>
                    )}

                    {property.price && (
                      <p className="text-purple-600 font-bold text-lg">
                        {formatPrice(
                          property.price,
                          activeTab === "Domestic" ? "₹" : "$"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Right List: Scrollable Experiences */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-[490px] flex flex-col gap-4 h-[536px] border border-gray-100">
            <div className="flex justify-end pr-2 pb-2">
              <span className="text-xs font-bold text-gray-500 tracking-wider">
                STARTS FROM
              </span>
            </div>

            <div className="overflow-y-auto">
              {Array.isArray(propertydata) &&
                propertydata.map((property) => (
                  <div
                    key={property.id}
                    className="py-3 border-b last:border-b-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div className="flex items-start md:justify-start md:flex-grow gap-3">
                      <img
                        src={
                          property.images?.[0]?.image ||
                          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
                        }
                        alt={property.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col flex-1 items-end md:items-start">
                        <h4 className="font-semibold text-gray-900 text-right md:text-left">
                          {property.title}
                        </h4>
                        <div className="hidden md:block text-gray-500 text-sm">
                          {property.location}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-shrink-0">
                      <span className="bg-gray-100 rounded-full px-3 py-2 text-gray-700 font-semibold flex items-center">
                        {formatPrice(
                          property.price,
                          activeTab === "Domestic" ? "₹" : "$"
                        )}
                      </span>
                    </div>

                    <div className="md:hidden text-gray-500 text-sm mt-2">
                      {property.location}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Browse_exp;
