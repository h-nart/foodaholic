import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Select from '@radix-ui/react-select';
import * as Slider from '@radix-ui/react-slider';
import './AdvancedFilters.scss';

const DIET_OPTIONS = ['any', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 'Pescatarian', 'Paleo', 'Primal'];
const CUISINE_OPTIONS = ['any', 'African', 'American', 'British', 'Chinese', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Spanish', 'Thai', 'Vietnamese'];
const TYPE_OPTIONS = ['any', 'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
const INTOLERANCES = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

export interface FilterValues {
  diet: string;
  cuisine: string;
  type: string;
  selectedIntolerances: string[];
  includeIngredients: string;
  excludeIngredients: string;
  maxReadyTime: number[];
}

interface AdvancedFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: Partial<FilterValues>) => void;
  onClear: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onClear,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleIntoleranceToggle = (intolerance: string) => {
    const newIntolerances = filters.selectedIntolerances.includes(intolerance)
      ? filters.selectedIntolerances.filter((i) => i !== intolerance)
      : [...filters.selectedIntolerances, intolerance];
    onFilterChange({ selectedIntolerances: newIntolerances });
  };

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className="filters__toggle"
        aria-label={open ? 'Hide filters' : 'Show filters'}
      >
        <svg
          className="filters__toggle-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>Advanced Filters</span>
        <svg
          className={`filters__toggle-arrow ${open ? 'filters__toggle-arrow--open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Collapsible.Trigger>

      <Collapsible.Content className="filters__content">
        <div className="filters__grid">
          {/* Diet */}
          <div className="filter-group">
            <label htmlFor="diet-select" className="filter-group__label">
              Diet
            </label>
            <Select.Root
              value={filters.diet}
              onValueChange={(value) => onFilterChange({ diet: value })}
            >
              <Select.Trigger className="select-trigger" id="diet-select" aria-label="Select diet type">
                <Select.Value placeholder="Any diet" />
                <Select.Icon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport>
                    {DIET_OPTIONS.map((option) => (
                      <Select.Item key={option} value={option} className="select-item">
                        <Select.ItemText>{option === 'any' ? 'Any diet' : option}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Cuisine */}
          <div className="filter-group">
            <label htmlFor="cuisine-select" className="filter-group__label">
              Cuisine
            </label>
            <Select.Root
              value={filters.cuisine}
              onValueChange={(value) => onFilterChange({ cuisine: value })}
            >
              <Select.Trigger className="select-trigger" id="cuisine-select" aria-label="Select cuisine type">
                <Select.Value placeholder="Any cuisine" />
                <Select.Icon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport>
                    {CUISINE_OPTIONS.map((option) => (
                      <Select.Item key={option} value={option} className="select-item">
                        <Select.ItemText>{option === 'any' ? 'Any cuisine' : option}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Type */}
          <div className="filter-group">
            <label htmlFor="type-select" className="filter-group__label">
              Meal Type
            </label>
            <Select.Root
              value={filters.type}
              onValueChange={(value) => onFilterChange({ type: value })}
            >
              <Select.Trigger className="select-trigger" id="type-select" aria-label="Select meal type">
                <Select.Value placeholder="Any type" />
                <Select.Icon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="select-content">
                  <Select.Viewport>
                    {TYPE_OPTIONS.map((option) => (
                      <Select.Item key={option} value={option} className="select-item">
                        <Select.ItemText>{option === 'any' ? 'Any type' : option}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Max Ready Time */}
          <div className="filter-group filter-group--full">
            <label htmlFor="ready-time-slider" className="filter-group__label">
              Max Ready Time: {filters.maxReadyTime[0]} minutes
            </label>
            <Slider.Root
              className="slider"
              value={filters.maxReadyTime}
              onValueChange={(value) => onFilterChange({ maxReadyTime: value })}
              max={120}
              min={5}
              step={5}
              id="ready-time-slider"
              aria-label="Maximum ready time in minutes"
            >
              <Slider.Track className="slider__track">
                <Slider.Range className="slider__range" />
              </Slider.Track>
              <Slider.Thumb className="slider__thumb" aria-label="Drag to adjust time" />
            </Slider.Root>
          </div>

          {/* Intolerances */}
          <div className="filter-group filter-group--full">
            <span className="filter-group__label">Intolerances</span>
            <div className="checkbox-group" role="group" aria-label="Select intolerances">
              {INTOLERANCES.map((intolerance) => (
                <label key={intolerance} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.selectedIntolerances.includes(intolerance)}
                    onChange={() => handleIntoleranceToggle(intolerance)}
                    className="checkbox-input sr-only"
                  />
                  <span className={`checkbox-box ${filters.selectedIntolerances.includes(intolerance) ? 'checkbox-box--checked' : ''}`}>
                    {filters.selectedIntolerances.includes(intolerance) && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span>{intolerance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Include Ingredients */}
          <div className="filter-group filter-group--full">
            <label htmlFor="include-ingredients" className="filter-group__label">
              Include Ingredients
            </label>
            <input
              id="include-ingredients"
              type="text"
              className="filter-input"
              placeholder="e.g. chicken, tomatoes"
              value={filters.includeIngredients}
              onChange={(e) => onFilterChange({ includeIngredients: e.target.value })}
              aria-describedby="include-help"
            />
            <span id="include-help" className="filter-help">
              Comma-separated list
            </span>
          </div>

          {/* Exclude Ingredients */}
          <div className="filter-group filter-group--full">
            <label htmlFor="exclude-ingredients" className="filter-group__label">
              Exclude Ingredients
            </label>
            <input
              id="exclude-ingredients"
              type="text"
              className="filter-input"
              placeholder="e.g. nuts, shellfish"
              value={filters.excludeIngredients}
              onChange={(e) => onFilterChange({ excludeIngredients: e.target.value })}
              aria-describedby="exclude-help"
            />
            <span id="exclude-help" className="filter-help">
              Comma-separated list
            </span>
          </div>
        </div>

        <button
          className="filters__clear-button"
          onClick={onClear}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

