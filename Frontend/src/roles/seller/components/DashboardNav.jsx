import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DashboardNav.css";

const DashboardNav = ({
  items,
  orientation = "horizontal",
  className = "",
}) => {
  const location = useLocation();

  return (
    <nav className={`dashboard-nav dashboard-nav--${orientation} ${className}`}>
      <ul className="dashboard-nav__list">
        {items.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={index} className="dashboard-nav__item">
              <Link
                to={item.to}
                className={`dashboard-nav__link ${
                  isActive ? "dashboard-nav__link--active" : ""
                }`}
              >
                {item.icon && (
                  <span className="dashboard-nav__icon">{item.icon}</span>
                )}
                <span className="dashboard-nav__label">{item.label}</span>
                {item.badge !== undefined && item.badge !== null && (
                  <span className="dashboard-nav__badge">{item.badge}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardNav;
