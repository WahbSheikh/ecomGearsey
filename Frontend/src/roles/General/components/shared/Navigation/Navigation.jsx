import React from "react";
import NavLink from "./NavLink";
import "./Navigation.css";

const Navigation = ({ items, orientation = "horizontal", className = "" }) => {
  return (
    <nav className={`navigation navigation--${orientation} ${className}`}>
      <ul className="navigation__list">
        {items.map((item, index) => (
          <li key={index} className="navigation__item">
            <NavLink
              to={item.to}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              onClick={item.onClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
