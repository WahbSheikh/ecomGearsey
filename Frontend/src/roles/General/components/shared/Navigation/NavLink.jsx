import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, icon, label, badge, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      to={to}
      className={`nav-link ${isActive ? "nav-link--active" : ""}`}
      onClick={handleClick}
    >
      {icon && <span className="nav-link__icon">{icon}</span>}
      <span className="nav-link__label">{label}</span>
      {badge !== undefined && badge !== null && (
        <span className="nav-link__badge">{badge}</span>
      )}
    </Link>
  );
};

export default NavLink;
