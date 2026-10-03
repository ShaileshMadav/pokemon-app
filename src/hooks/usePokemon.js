import { useState, useEffect } from 'react';
import { fetchPokemonById, fetchPokemonSpecies } from '../api/pokeapi';

export function usePokemon(id) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch both Pokemon data and species data in parallel
        const [pokemonData, speciesData] = await Promise.all([
          fetchPokemonById(id),
          fetchPokemonSpecies(id).catch(() => null) // Species is optional
        ]);

        if (isMounted) {
          setPokemon(pokemonData);
          setSpecies(speciesData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load Pokemon');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const refetch = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const [pokemonData, speciesData] = await Promise.all([
        fetchPokemonById(id),
        fetchPokemonSpecies(id).catch(() => null)
      ]);

      setPokemon(pokemonData);
      setSpecies(speciesData);
    } catch (err) {
      setError(err.message || 'Failed to load Pokemon');
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, species, loading, error, refetch };
}
