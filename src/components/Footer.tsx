import { Link } from "react-router-dom";
import { Building, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Award, Users, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 py-16 max-w-screen-2xl">

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-cyan-400" />
              <span className="font-bold text-2xl text-white">PropertyHub</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Your trusted partner in finding the perfect property. Buying, selling, and renting made simple and transparent with expert guidance.
            </p>
            <div className="space-y-2">
              {[
                { icon: <Phone className="h-4 w-4 text-cyan-400" />, bg: "bg-cyan-500/20", value: "+91 9876543210" },
                { icon: <Mail className="h-4 w-4 text-green-400" />, bg: "bg-green-500/20", value: "contact@propertyhub.com" },
                { icon: <MapPin className="h-4 w-4 text-purple-400" />, bg: "bg-purple-500/20", value: "123 Property Street, Mumbai, India" },
              ].map((contact, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className={`${contact.bg} p-2 rounded-full`}>{contact.icon}</div>
                  <span className="text-gray-200">{contact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Section */}
          {[
            {
              title: "Properties",
              color: "text-cyan-400",
              links: [
                { label: "Search Properties", to: "/search" },
                { label: "Add Property", to: "/add-property" },
                { label: "Post Property", to: "/post-property" },
                { label: "Book Visit", to: "/book-visit" },
                { label: "Price Trends", to: "/price-trends" },
                { label: "Area Converter", to: "/area-converter" },
              ],
            },
            {
              title: "Services & Tools",
              color: "text-green-400",
              links: [
                { label: "Our Services", to: "/our-services" },
                { label: "Investments", to: "/real-estate-investments" },
                { label: "Builders in India", to: "/builders-in-india" },
                { label: "Rent Receipt", to: "/rent-receipt" },
                { label: "Articles & News", to: "/articles" },
                { label: "Mobile Apps", to: "/mobile-apps" },
              ],
            },
            {
              title: "Support & Company",
              color: "text-purple-400",
              links: [
                { label: "About Us", to: "/about" },
                { label: "Contact Us", to: "/contact" },
                { label: "Customer Service", to: "/customer-service" },
                { label: "Careers", to: "/careers" },
                { label: "Testimonials", to: "/testimonials" },
                { label: "Feedback", to: "/feedback" },
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className={`font-bold text-lg ${section.color}`}>{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.to} 
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-8 bg-gray-800/50 rounded-2xl backdrop-blur-md border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-2xl mb-2 text-cyan-400">Stay Updated</h3>
            <p className="text-gray-300 text-base">
              Subscribe to get the latest property updates, market insights, and exclusive deals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 text-white">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Legal & Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="text-gray-400 text-center md:text-left">
            <p>© 2024 PropertyHub. All rights reserved.</p>
            <p className="text-sm mt-1">Making property dreams come true since 2020</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Follow us:</span>
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="icon"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
                asChild
              >
                <a href="#" aria-label={Icon.name}>
                  <Icon className="h-5 w-5 text-gray-200" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
