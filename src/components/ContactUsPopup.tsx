import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { BASE_URL } from "../lib/constants";
import axiosInstance from "../utils/axios"; // Import axiosInstance
import { useToast } from "../hooks/use-toast"; // Import useToast

interface ContactUsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsPopup: React.FC<ContactUsPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject, // Include subject
        message: formData.message, // Include message
        status: 'New'
      };

      const response = await axiosInstance.post(`${BASE_URL}leads/`, contactData);

      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Message Sent Successfully",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        onClose();
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-20">
      <Card className="w-full max-w-md m-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Contact Us</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name *</label>
              <Input 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input 
                type="tel" 
                placeholder="+91 98765 43210" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input 
                placeholder="Property inquiry" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea 
                placeholder="Tell us about your requirements..." 
                rows={3} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsPopup;
