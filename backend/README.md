## Design Decisions

1. Appropriately packaged for separation of concerns, e.g. distinct `model` and `dto` packages.
   - `model`: business entities used internally (e.g., `Ingredient` includes `calories` to better integrate with clients).
   - `dto`: API contracts and Spoonacular transfer objects to decouple external shapes from internal models.

2. APIs and usage examples (base path: `/api/recipes`):
   - Search
     - `GET /search?query=pasta&diet=vegan&maxReadyTime=30`
   - Recipe details
     - `GET /{id}`
   - Server-side calories (kept for centralized logic and logging capabilities, but UI prefers client-side)
     - `GET /{id}/calories?exclude=123&exclude=456`
     - `exclude`: optional

3. Caching with Caffeine
   - Recipe information responses are cached via Spring Cache + Caffeine to avoid redundant Spoonacular calls.
   - I used Caffeine for caching simplicity. In a production environment I'd use Redis for distributed caching and would use versioned keys.
   - Benefits: lower external API costs, faster response times.
   - `/calories` depends on `getDetails`; if `/calories` calls become intensive, repeatedly calling the external API would be wasteful.

4. Used OpenFeign
   - Declarative coding.
   - Future-proofing for microservice integration, e.g., discovery, load balancing.

5. `Ingredient` model includes `calories`
   - Unlike raw Spoonacular payloads, `Ingredient` contains `calories` to simplify client consumption and adjustments.

6. Quality and tests
   - JaCoCo for coverage (≈82%), Unit Tests, and Spring Boot tests for cache behavior.

## AI Reflection

1. It can bulk all logic into one class: I extracted `RecipeService` and `NutritionService` to isolate responsibilities.
2. It may prefer simpler technologies unless specifically encouraged otherwise: I asked it to use OpenFeign instead of RestTemplate.
3. AI may follow existing code too literally (DTO vs POJO modeling); I refactored and extracted logic to align with domain needs.
4. Requires careful review: It might do redundant checks or logic, hurting readability, e.g., [this PR](https://github.com/h-nart/foodaholic/commit/ec3e8764e558ec63bc0ead8b9f215c6f7c2b716d).
