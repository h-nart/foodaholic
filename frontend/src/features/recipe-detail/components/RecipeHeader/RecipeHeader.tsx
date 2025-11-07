import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeHeader.scss';

export const RecipeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [showMiniSearch, setShowMiniSearch] = useState(false);
  const [miniSearchQuery, setMiniSearchQuery] = useState('');

  const handleMiniSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (miniSearchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(miniSearchQuery.trim())}`);
    }
  };

  return (
    <header className="recipe-header">
      <div className="container">
        <div className="recipe-header__content">
          <button
            onClick={() => navigate(-1)}
            className="recipe-header__back-button"
            aria-label="Go back to previous page"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </button>

          <h1 className="recipe-header__logo">
            <span role="img" aria-label="Food">
              🍳
            </span>{' '}
            Foodaholic
          </h1>

          <div className="recipe-header__search">
            {showMiniSearch ? (
              <form onSubmit={handleMiniSearch} className="mini-search-form">
                <input
                  type="search"
                  className="mini-search-input"
                  placeholder="Search recipes..."
                  value={miniSearchQuery}
                  onChange={(e) => setMiniSearchQuery(e.target.value)}
                  autoFocus
                  aria-label="Search for recipes"
                />
                <button
                  type="submit"
                  className="mini-search-submit"
                  aria-label="Submit search"
                  disabled={!miniSearchQuery.trim()}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowMiniSearch(true)}
                className="search-toggle-button"
                aria-label="Open search"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

