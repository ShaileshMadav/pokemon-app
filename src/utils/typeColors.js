// Pokemon type to color mapping
export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

// Get primary type color (first type)
export function getPokemonColor(types) {
  if (!types || types.length === 0) {
    return TYPE_COLORS.normal;
  }
  return TYPE_COLORS[types[0].type.name] || TYPE_COLORS.normal;
}

// Get gradient for dual-type Pokemon
export function getPokemonGradient(types) {
  if (!types || types.length === 0) {
    return TYPE_COLORS.normal;
  }

  if (types.length === 1) {
    return getPokemonColor(types);
  }

  const color1 = TYPE_COLORS[types[0].type.name] || TYPE_COLORS.normal;
  const color2 = TYPE_COLORS[types[1].type.name] || TYPE_COLORS.normal;
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

// Get type badge color (lighter version for badges)
export function getTypeBadgeColor(typeName) {
  return TYPE_COLORS[typeName] || TYPE_COLORS.normal;
}
