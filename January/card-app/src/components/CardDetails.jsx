import React from "react";
import "./CardDetails.css";
import { Star, Clock, Utensils } from 'lucide-react';

const CardDetails = ({ data }) => {
  const { image, name, cuisine, rating, prepTime, price } = data;
  
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? "star filled" : "star"}
        fill={index < Math.floor(rating) ? "#fbbf24" : "none"}
        stroke={index < Math.floor(rating) ? "#fbbf24" : "#9ca3af"}
      />
    ));
  };

  return (
    <div className="card-details">
      <div className="card-image-container">
        <img src={image} alt={name} />
        {price && <span className="price-tag">${price}</span>}
      </div>
      
      <div className="card-content">
        <h3 className="item-title">{name}</h3>
        
        <div className="card-info">
          <div className="info-item">
            <Utensils size={16} className="icon" />
            <span>{cuisine}</span>
          </div>
          
          {prepTime && (
            <div className="info-item">
              <Clock size={16} className="icon" />
              <span>{prepTime} mins</span>
            </div>
          )}
        </div>

        <div className="rating-container">
          <div className="stars">{renderStars(rating)}</div>
          <span className="rating-text">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;