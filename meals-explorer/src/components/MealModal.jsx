import React from 'react';

const MealModal = ({ meal, onClose }) => {
  if (!meal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />
        <h2 className="modal-title">{meal.strMeal}</h2>
        <div className="modal-meta">
          <span>🍲 {meal.strCategory || 'N/A'}</span>
          <span>🌎 {meal.strArea || 'N/A'}</span>
          {meal.strTags && <span>🏷️ {meal.strTags}</span>}
        </div>
        <div className="modal-instructions">
          <strong>📖 Instructions:</strong>
          <p>{meal.strInstructions || 'No instructions available.'}</p>
        </div>
        {meal.strYoutube && (
          <div style={{ marginTop: '1rem' }}>
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" 
               style={{ color: 'var(--button-primary)' }}>▶️ Watch on YouTube</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealModal;