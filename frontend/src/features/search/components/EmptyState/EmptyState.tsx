import React from 'react';
import './EmptyState.scss';

interface EmptyStateProps {
  type: 'initial' | 'no-results' | 'loading';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  if (type === 'loading') {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <span>Searching for recipes...</span>
      </div>
    );
  }

  if (type === 'no-results') {
    return (
      <div className="empty-state" role="status">
        <svg
          className="empty-state__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <h2>No recipes found</h2>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  // Initial state
  return (
    <div className="empty-state" role="status">
      <svg
        className="empty-state__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
      <h2>Start your recipe search</h2>
      <p>Enter a recipe name or ingredient to discover delicious dishes.</p>
    </div>
  );
};

