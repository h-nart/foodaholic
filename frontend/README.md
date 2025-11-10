## Design Decisions

1. Radix for accessibility (a11y)
    - Uses Radix UI primitives to ensure accessible components, predictable focus states, keyboard navigation, and screen-reader support.

2. Project structure:
    - Feature-first structure under `src/features` for cohesive modules rather than a generic `pages` directory.
    - Barrel files (`index.ts`) provide simplified imports and clearer public APIs within features and shared modules.
    - Generic `src/components` and `src/hooks` host reusable building blocks; promotes composition, consistency, and easier testing.
    - `src/types` maps API request/response shapes to TypeScript types, plus shared domain types.
    - `src/api/client.ts` is an isolated HTTP client (Axios) separate from view/state logic.

3. Color theme for UX
    - A consistent color system defined in SCSS variables; promotes customizability.

4. Infinite scrolling for UX
    - Seamless exploration of results without pagination friction, implemented with `IntersectionObserver`.

5. Unified RecipeDetails experience
    - Combined nutrition details and ingredient list in a single `RecipeDetails` component.
    - One user-friendly toggle button per ingredient that switches icons (delete/restore).
    - Toast feedback shows the exact added/subtracted calories for immediate clarity.

6. Client-side ingredient exclusion/inclusion
    - Instant feedback: calorie totals update immediately without extra network calls.
    - Reduced server load: no need to recompute on every change.
    - Simpler API: the backend doesn’t need to track the user’s transient ingredient state.

## AI Reflection

1. Great for creating bulk HTML/JSX and CSS.
2. Great at producing accessible HTML patterns.
3. Tends to flatten file structure; I refactored to use barrels and a features-based project layout.
4. Often packs too much JSX into single components; I split into smaller reusable components.
