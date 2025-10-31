import React from "react";
import { Car } from "lucide-react";

function AuthHeader({ isLogin }) {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
          <Car className="h-8 w-8 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">
        {isLogin ? "Welcome back" : "Create your account"}
      </h2>
      <p className="text-gray-400">
        {isLogin
          ? "Sign in to your Gearsey account"
          : "Join the ultimate car parts marketplace"}
      </p>
    </div>
  );
}

export default AuthHeader;
