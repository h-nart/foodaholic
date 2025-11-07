import React from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for recipes...',
}) => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="sr-only">
        Search for recipes
      </label>
      <input
        id="search-input"
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        Enter recipe name or ingredients to search
      </span>
      <svg
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
};

