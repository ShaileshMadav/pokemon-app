// Helper function to capitalize first letter
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format stat name for display
export function formatStatName(statName) {
  const statMap = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  return statMap[statName] || capitalize(statName);
}

// Get stat color based on value
export function getStatColor(value) {
  if (value >= 100) return '#4CAF50'; // Green for high stats
  if (value >= 70) return '#8BC34A'; // Light green for good stats
  if (value >= 50) return '#FFC107'; // Yellow for medium stats
  if (value >= 30) return '#FF9800'; // Orange for low stats
  return '#F44336'; // Red for very low stats
}

// Extract Pokemon ID from URL
export function getPokemonIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

// Format Pokemon name (remove hyphens, capitalize)
export function formatPokemonName(name) {
  return name
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}
