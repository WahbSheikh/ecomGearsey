import React from "react";

const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "analytics-card--blue",
    green: "analytics-card--green",
    purple: "analytics-card--purple",
    orange: "analytics-card--orange",
    red: "analytics-card--red",
  };

  return (
    <div className={`analytics-card ${colorClasses[color]}`}>
      <div className="analytics-card__header">
        <div className="analytics-card__icon">{icon}</div>
        <div className="analytics-card__content">
          <h4 className="analytics-card__title">{title}</h4>
          <p className="analytics-card__value">{value}</p>
          {subtitle && <p className="analytics-card__subtitle">{subtitle}</p>}
          {trend && (
            <p className={`analytics-card__trend ${trend.direction}`}>
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
