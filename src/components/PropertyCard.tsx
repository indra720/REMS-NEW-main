import { formatPrice } from '@/lib/utils';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRupeeSign, faSquare, faBed, faBath, faHome } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactUsPopup from './ContactUsPopup';

interface Property {
  id: number;
  images: { image: string; caption: string; is_primary: boolean }[];
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  property_type: number;
  slug: string;
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const primaryImage = property.images.find(img => img.is_primary)?.image || '/placeholder.svg';
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  return (
    <>
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <CardHeader className="p-0">
          <img src={primaryImage} alt={property.title} className="w-full h-48 object-cover rounded-t-lg" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold mb-2">{property.title}</CardTitle>
          <CardDescription className="text-gray-600 mb-4 line-clamp-2">{property.description}</CardDescription>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />{property.location}</p>
            <p>{formatPrice(parseFloat(property.price), "₹")}</p>
            <p><FontAwesomeIcon icon={faSquare} className="mr-2 text-purple-500" />{property.area_sqft} sqft</p>
            <p><FontAwesomeIcon icon={faBed} className="mr-2 text-red-500" />{property.bedrooms} Beds</p>
            <p><FontAwesomeIcon icon={faBath} className="mr-2 text-teal-500" />{property.bathrooms} Baths</p>
            <p><FontAwesomeIcon icon={faHome} className="mr-2 text-orange-500" />{property.furnishing}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <Button 
            className="bg-purple-600 text-white hover:bg-purple-700 flex-1"
            onClick={() => setIsContactPopupOpen(true)}
          >
            Contact
          </Button>
          <Link to={`/property/${property.slug}`} className="flex-1">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <ContactUsPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
    </>
  );
};

export default PropertyCard;
