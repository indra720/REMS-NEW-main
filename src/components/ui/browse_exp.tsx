import React, { useState, useEffect } from "react";
import { IndianRupee } from "lucide-react";
import axios from "../../lib/axios";
import { BASE_URL } from "../../lib/constants";
import darjeeling7Img from '../../assets/images/darjeeling7.jpg';
import gulmarg8Img from '../../assets/images/gulmarg8.jpg';
import honeymoonImg from '../../assets/images/honeymoon.png';
import mussoorieImg from '../../assets/images/mussoorie.jpg';
import auli9Img from '../../assets/images/auli9.jpg';
import ranikhet3Img from '../../assets/images/ranikhet3.jpg';
import munnar2Img from '../../assets/images/munnar2.jpg';
import ladhakImg from '../../assets/images/ladhak.jpg';
import goaImg from '../../assets/images/goa.jpg';
import udaipurImg from '../../assets/images/udaipur.jpg';
import delhiImg from '../../assets/images/delhi.jpg';
import citybreakImg from '../../assets/images/citybreak.png';
import adventrueImg from '../../assets/images/adventrue.jpg';
import all_exclusiveImg from '../../assets/images/all_exclusive.jpg';
import beachImg from '../../assets/images/beach.jpg';
import countryImg from '../../assets/images/country.jpg';
import familyImg from '../../assets/images/family.jpg';
import foodImg from '../../assets/images/food.jpg';
import luxury_roomImg from '../../assets/images/luxury_room.jpg';
import shoppingImg from '../../assets/images/shopping.jpg';
import skiImg from '../../assets/images/ski.jpg';
import spaImg from '../../assets/images/spa.jpg';
import villaImg from '../../assets/images/villa.jpg';
import placeholderImg from '../../assets/images/placeholder.svg';
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

  const propertydata = activeTab === 'Domestic' ? domesticProperties : internationalProperties;

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
    <div className="  flex justify-center items-center min-h-screen bg-white py-8">
      <div className="bg-white rounded-2xl shadow-border shadow-2xl p-8 w-full max-w-6xl">
        <div className="group flex flex-col md:flex-row md:items-center md:justify-between mb-6 ">
          <h2 className="text-4xl font-light mb-4 md:mb-0">
            Browse by <strong className="font-bold">Experience</strong>
          </h2>
          <div className="flex gap-8  justify-center  text-lg font-semibold ">
            <span
              className={`cursor-pointer ${
                activeTab === "International"
                  ? "text-purple-600 border-b-2 border-putext-purple-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("International")}
            >
              INTERNATIONAL
            </span>
            <span
              className={`cursor-pointer ${
                activeTab === "Domestic"
                  ? "text-purple-600 border-b-2 border-putext-purple-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Domestic")}
            >
              DOMESTIC
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Experiences grid (always show 4 boxes as before) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {Array.isArray(propertydata) && propertydata.slice(0,4).map((property) => (
              <div
                key={property.id}
                className="relative rounded-xl overflow-hidden shadow h-64 flex items-end"
                style={{
                  backgroundImage: `url(${property.images && property.images.length > 0 ? property.images[0].image : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative z-10 p-5">
                  <div className="text-2xl font-bold text-white drop-shadow transition-all duration-200">
                    {property.title}
                  </div>
                  {property.price && (
                    <div className="text-base sm:text-lg text-white mt-1 transition-all duration-200 flex items-center">
                      {property.description}
                      <span className="font-bold transition-all duration-200 ml-1 flex items-center">
                        {formatPrice(property.price, activeTab === "Domestic" ? "₹" : "$")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Right: Experience List (scrolling, changes on tab) */}
          <div className="bg-white rounded-xl shadow p-6 w-full lg:w-[420px] flex flex-col gap-4 h-[536px] overflow-y-auto border">
            <div className="flex justify-end pr-2 pb-2">
              <span className="text-xs font-bold text-gray-500 tracking-wider">
                STARTS FROM
              </span>
            </div>
            {Array.isArray(propertydata) && propertydata.map((property) => (
              <div
                key={property.id}
                className="py-3 border-b last:border-b-0"
              >
                {/* Main container */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* This part contains Image, Name, and Price (for mobile) */}
                  <div className="flex items-start md:justify-start md:flex-grow gap-3">
                    <img
                      src={property.images && property.images.length > 0 ? property.images[0].image : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500'}
                      alt={property.title}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 items-end md:items-start">
                      <div className="font-semibold text-lg text-gray-900 transition-all duration-200 text-right md:text-left">
                        {property.title}
                      </div>
                      {/* Price for mobile view, below name */}
                      <div className="md:hidden mt-1">
                        <span className="bg-gray-100 rounded-full px-2 py-1 text-gray-600 font-semibold text-xs transition-all duration-200 flex items-center w-fit">
                          {formatPrice(property.price, activeTab === "Domestic" ? "₹" : "$")}
                        </span>
                      </div>
                      {/* Places for desktop view */}
                      <div className="hidden md:block text-gray-500 text-sm">
                        {property.location}
                      </div>
                    </div>
                  </div>

                  {/* Price for desktop view */}
                  <div className="hidden md:block flex-shrink-0">
                    <span className="bg-gray-100 rounded-full px-3 py-2 text-gray-700 font-semibold text-base transition-all duration-200 flex items-center">
                      {formatPrice(property.price, activeTab === "Domestic" ? "₹" : "$")}
                    </span>
                  </div>
                </div>

                {/* Places for mobile view */}
                <div className="md:hidden text-gray-500 text-sm mt-2">
                  {property.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse_exp;