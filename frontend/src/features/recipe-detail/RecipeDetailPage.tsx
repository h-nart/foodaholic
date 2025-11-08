import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeHeader, RecipeHero, RecipeContent, RecipeDetails } from './components';
import { useNutritionCalculator } from './hooks';
import './RecipeDetailPage.scss';

export const RecipeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    recipe,
    loading,
    excludedIngredientIds,
    onRemoveIngredient,
    onRestoreIngredient,
  } = useNutritionCalculator();

  if (loading) {
    return (
      <div className="recipe-detail-page">
        <div className="recipe-detail-page__loading" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <span>Loading recipe details...</span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-page">
        <div className="recipe-detail-page__error">
          <h2>Recipe not found</h2>
          <button onClick={() => navigate('/')} className="button button--primary">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <RecipeHeader />

      <main id="main-content" className="recipe-detail-page__main">
        <div className="container">
          <RecipeHero
            title={recipe.title}
            image={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
          />

          <div className="recipe-detail-content">
            <RecipeContent summary={recipe.summary} instructions={recipe.instructions} />

            <aside className="recipe-sidebar">
              <RecipeDetails
                ingredients={recipe.extendedIngredients}
                nutrition={recipe.nutrition}
                excludedIds={excludedIngredientIds}
                onRemoveIngredient={onRemoveIngredient}
                onRestoreIngredient={onRestoreIngredient}
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

