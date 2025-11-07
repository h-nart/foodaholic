import React from 'react';
import './RecipeHero.scss';

interface RecipeHeroProps {
  title: string;
  image: string;
  readyInMinutes: number | null;
  servings: number | null;
  summary: string;
  instructions: string;
}

export const RecipeHero: React.FC<RecipeHeroProps> = ({
  title,
  image,
  readyInMinutes,
  servings,
  summary,
  instructions,
}) => {
  return (
    <>
      <div className="recipe-hero">
        <img
          src={image}
          alt={title}
          className="recipe-hero__image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/556x370?text=No+Image';
          }}
        />
        <div className="recipe-hero__content">
          <h1 className="recipe-hero__title">{title}</h1>

          <div className="recipe-meta">
            {readyInMinutes && (
              <div className="recipe-meta__item" aria-label={`Ready in ${readyInMinutes} minutes`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{readyInMinutes} minutes</span>
              </div>
            )}

            {servings && (
              <div className="recipe-meta__item" aria-label={`Serves ${servings}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{servings} servings</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="recipe-content">
        {summary && (
          <section className="recipe-section" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="recipe-section__title">
              Summary
            </h2>
            <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: summary }} />
          </section>
        )}

        {instructions && (
          <section className="recipe-section" aria-labelledby="instructions-heading">
            <h2 id="instructions-heading" className="recipe-section__title">
              Instructions
            </h2>
            <div className="recipe-instructions" dangerouslySetInnerHTML={{ __html: instructions }} />
          </section>
        )}
      </div>
    </>
  );
};

