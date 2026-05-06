import React from 'react';

const MealCard = ({ meal, onClick }) => {
  const truncate = (str, len = 50) => 
    str?.length > len ? str.substring(0, len) + '…' : str;

  return (
    <div className="meal-card" onClick={() => onClick(meal)}>
      <img 
        src={meal.strMealThumb || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={meal.strMeal}
        className="meal-image"
        loading="lazy"
      />
      <div className="meal-info">
        <div className="meal-title">
          {truncate(meal.strMeal, 25)}
          <span className="meal-category">{meal.strCategory || 'General'}</span>
        </div>
        <div className="meal-details">
          <span>🌍 {meal.strArea || 'Unknown'}</span>
          <span>🍽️ {meal.strTags?.split(',')[0] || 'Delicious'}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;