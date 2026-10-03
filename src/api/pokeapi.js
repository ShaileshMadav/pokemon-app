const BASE_URL = 'https://pokeapi.co/api/v2';

// Format Pokemon data from API response
function formatPokemonData(data) {
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    spriteAnimated: data.sprites.front_default,
    types: data.types,
    stats: data.stats,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    moves: data.moves.slice(0, 10) // Limit to first 10 moves for performance
  };
}

// Fetch list of Pokemon with their basic details
export async function fetchPokemonList(limit = 151, offset = 0) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }

    const data = await response.json();

    // Fetch detailed data for each Pokemon in parallel
    const pokemonPromises = data.results.map(pokemon => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      return fetchPokemonById(id);
    });

    const pokemonList = await Promise.all(pokemonPromises);
    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}

// Fetch single Pokemon by ID or name
export async function fetchPokemonById(id) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with ID: ${id}`);
    }

    const data = await response.json();
    return formatPokemonData(data);
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    throw error;
  }
}

// Fetch Pokemon species data (for additional info like description)
export async function fetchPokemonSpecies(id) {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species with ID: ${id}`);
    }

    const data = await response.json();

    // Get English description
    const flavorText = data.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );

    return {
      description: flavorText?.flavor_text.replace(/\f/g, ' ') || 'No description available',
      genera: data.genera.find(g => g.language.name === 'en')?.genus || '',
      evolutionChainUrl: data.evolution_chain?.url
    };
  } catch (error) {
    console.error(`Error fetching Pokemon species ${id}:`, error);
    throw error;
  }
}

// Search Pokemon by name
export async function searchPokemonByName(name) {
  try {
    const formattedName = name.toLowerCase().trim();
    return await fetchPokemonById(formattedName);
  } catch (error) {
    console.error(`Error searching for Pokemon: ${name}`, error);
    throw error;
  }
}
