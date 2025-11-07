import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeHeader, RecipeHero, RecipeContent, NutritionPanel, IngredientsPanel } from './components';
import { useNutritionCalculator } from './hooks';
import './RecipeDetailPage.scss';

export const RecipeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    recipe,
    loading,
    excludedIngredientIds,
    recalculatingNutrition,
    recalculationResult,
    onToggleExclude,
    onClearExcluded,
    onRecalculate,
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
              <NutritionPanel nutrition={recipe.nutrition} recalculationResult={recalculationResult} />

              <IngredientsPanel
                ingredients={recipe.extendedIngredients}
                excludedIds={excludedIngredientIds}
                onToggleExclude={onToggleExclude}
                onClearExcluded={onClearExcluded}
                onRecalculate={onRecalculate}
                isRecalculating={recalculatingNutrition}
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

