# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 application built with Vite that displays Pokemon cards with filtering and routing capabilities. The application fetches data from the PokeAPI and presents it in a responsive grid layout.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run Oxlint for code quality
- `npm run preview` - Preview production build locally

## Architecture & Structure

### Key Directories
- `src/pages/` - Top-level page components (PokemonList, PokemonDetail)
- `src/components/` - Reusable UI components (PokemonCard, PokemonGrid, Loading, ErrorMessage)
- `src/hooks/` - Custom React hooks (usePokemonList, usePokemon)
- `src/api/` - API integration layer (pokeapi.js)
- `src/utils/` - Helper functions (helpers.js, typeColors.js)
- `src/styles/` - Global CSS and CSS modules
- `src/assets/` - Static assets

### Data Flow
1. **API Layer** (`src/api/pokeapi.js`):
   - Centralized API calls to PokeAPI
   - Data formatting functions (`formatPokemonData`)
   - Functions for fetching lists and individual Pokemon

2. **Hooks** (`src/hooks/`):
   - `usePokemonList`: Fetches and manages list of Pokemon
   - `usePokemon`: Fetches and manages single Pokemon data
   - Both handle loading, error states, and caching

3. **Components**:
   - `PokemonList` (page): Uses `usePokemonList` hook and renders `PokemonGrid`
   - `PokemonGrid`: Renders grid of `PokemonCard` components
   - `PokemonCard`: Individual card component with stats display

4. **Routing**:
   - React Router DOM v7.18.4
   - Routes defined in `src/App.jsx`
   - Nested routing: `/` (list) and `/pokemon/:id` (detail)

### Styling Approach
- CSS Modules for component-scoped styles
- Global styles in `src/styles/global.css`
- Utility functions for dynamic styling (`getPokemonGradient` in `typeColors.js`)

### Key Design Patterns
1. **Container/Presenter**: Pages fetch data via hooks, pass to presentational components
2. **Custom Hooks**: Abstract data fetching and state management
3. **API Abstraction**: Centralized API layer with formatted responses
4. **Error Boundaries**: Graceful error handling with retry functionality

## Development Notes

### Adding New Features
1. **New API endpoints**: Add to `src/api/pokeapi.js`
2. **New hooks**: Create in `src/hooks/` following existing patterns
3. **New components**: Create in `src/components/` with CSS modules
4. **New pages**: Create in `src/pages/` and add route in `App.jsx`

### Data Structure
Pokemon objects follow this structure (from `formatPokemonData`):
```javascript
{
  id: number,
  name: string,
  sprite: string,          // Official artwork
  spriteAnimated: string,  // Animated sprite
  types: Array<{ type: { name: string } }>,
  stats: Array<{ stat: { name: string }, base_stat: number }>,
  height: number,
  weight: number,
  abilities: Array<{ ability: { name: string } }>,
  moves: Array<{ move: { name: string } }>  // First 10 moves
}
```

### Type Safety
While not using TypeScript, follow consistent prop patterns:
- Components receive minimal, typed props
- API functions document expected response shapes
- Utility functions have clear input/output expectations

### Performance Considerations
- Lazy loading images in `PokemonCard`
- Parallel API calls in `fetchPokemonList`
- Limit moves data to first 10 for performance
- Memoization through React hooks

## Testing & Quality
- Oxlint configured with React rules
- Follow React Hooks rules strictly
- Consistent component export patterns
