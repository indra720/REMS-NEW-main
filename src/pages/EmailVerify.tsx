import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "@/lib/api"; // Import the authenticated axios instance
import { jwtDecode } from "jwt-decode"; // For decoding JWT token

const EmailVerify = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleProceedToDashboard = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // If no token, something went wrong or user needs to log in manually
      navigate('/login');
      return;
    }

    try {
      // Set the Authorization header for the authenticated API instance
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user details to get the role
      const response = await api.get('/auth/users/me/'); // Assuming this endpoint exists and returns user details
      const user = response.data;
      const userRole = user.role; // Assuming user object has a 'role' field

      // Store the full user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on role
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'agent':
          navigate('/agent');
          break;
        case 'owner':
          navigate('/owner');
          break;
        default:
          navigate('/dashboard'); // Default dashboard for regular users
          break;
      }
    } catch (error) {
     // console.error("Failed to fetch user details or role after verification:", error);
      // Fallback to login if role cannot be determined or API call fails
      navigate('/login');
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      if (!slug) {
        setError("No verification token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}verify-email/`, { token: slug });
        setLoading(false);
        setShowSuccessDialog(true); // Show dialog on success

        // Assuming the verify-email endpoint returns an access_token upon successful verification
        if (response.data && response.data.access_token) {
          localStorage.setItem('access_token', response.data.access_token);
        }

      } catch (err: any) {
        setError(err.response?.data?.detail || "Invalid or expired verification link.");
        setLoading(false);
      }
    };

    verifyEmail();
  }, [slug]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader className="animate-spin h-12 w-12 text-purple-600" />
          <h1 className="text-2xl font-bold mt-4">Verifying your email...</h1>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <XCircle className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
          <p className="text-muted-foreground">{error}</p>
          <Link to="/login">
            <Button className="mt-6">Go to Login</Button>
          </Link>
        </>
      );
    }

    return null; // Render nothing directly, the dialog will handle success
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {renderContent()}

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-green-600 flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Email Verified!
              </DialogTitle>
              <DialogDescription className="text-center">
                Your email verification is successful.
              </DialogDescription>
            </DialogHeader>
            <p className="text-muted-foreground mt-2">
              Welcome to Real Estate, for choosing your dream properties: house, villa, apartment.
            </p>
            <Button className="mt-6 w-full" onClick={handleProceedToDashboard}>
              Proceed to Dashboard
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmailVerify;