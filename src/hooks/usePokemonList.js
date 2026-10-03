import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../api/pokeapi';

export function usePokemonList(limit = 151, offset = 0) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemon() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(limit, offset);

        if (isMounted) {
          setPokemon(data);
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
  }, [limit, offset]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(limit, offset);
      setPokemon(data);
    } catch (err) {
      setError(err.message || 'Failed to load Pokemon');
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, refetch };
}
