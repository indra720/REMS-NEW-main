import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

const CheckEmail = () => {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md space-y-6 text-center text-white">
        <MailCheck className="mx-auto h-24 w-24 text-green-400 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Check Your Email</h1>
        <p className="text-xl opacity-90">
          We've sent a verification link to your email address.
        </p>
        <p className="text-lg opacity-80">
          Please click the link in the email to activate your account.
        </p>
        <div className="mt-8">
          <Link to="/login" className="text-purple-300 hover:underline">
            Already verified? Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
