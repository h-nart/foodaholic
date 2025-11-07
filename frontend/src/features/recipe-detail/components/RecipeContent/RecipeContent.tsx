import React from 'react';
import './RecipeContent.scss';

interface RecipeContentProps {
  summary?: string;
  instructions?: string;
}

export const RecipeContent: React.FC<RecipeContentProps> = ({ summary, instructions }) => {
  return (
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
  );
};

