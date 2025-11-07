import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
        <span className="text-font-main font-bold text-sm">G</span>
      </div>
      <span className="text-2xl font-bold uppercase tracking-wide text-font-main">
        Gearsey
      </span>
    </Link>
  );
}

export default Logo;
