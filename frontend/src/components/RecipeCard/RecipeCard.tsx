import React from 'react';
import { Link } from 'react-router-dom';
import type { RecipeSummary } from '../../types';
import './RecipeCard.scss';

interface RecipeCardProps {
  recipe: RecipeSummary;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card" aria-label={`View ${recipe.title} recipe`}>
      <div className="recipe-card__image-container">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-card__image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/312x231?text=No+Image';
          }}
        />
      </div>
      
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        
        <div className="recipe-card__meta">
          {recipe.readyInMinutes && (
            <div className="recipe-card__badge recipe-card__badge--time" aria-label={`Ready in ${recipe.readyInMinutes} minutes`}>
              <svg className="recipe-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
          
          {recipe.servings && (
            <div className="recipe-card__badge recipe-card__badge--servings" aria-label={`Serves ${recipe.servings}`}>
              <svg className="recipe-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {recipe.cuisines && recipe.cuisines.length > 0 && (
          <div className="recipe-card__tags" aria-label="Cuisines">
            {recipe.cuisines.slice(0, 3).map((cuisine) => (
              <span key={cuisine} className="recipe-card__tag">
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {recipe.dishTypes && recipe.dishTypes.length > 0 && (
          <div className="recipe-card__dish-types">
            <span className="recipe-card__dish-type">
              {recipe.dishTypes[0]}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
