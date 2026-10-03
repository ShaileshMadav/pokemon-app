import { usePokemonList } from '../hooks/usePokemonList';
import PokemonGrid from '../components/PokemonGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import styles from './PokemonList.module.css';

export default function PokemonList() {
  const { pokemon, loading, error, refetch } = usePokemonList(151, 0);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        <p className={styles.subtitle}>Discover all 151 Generation I Pokémon</p>
      </header>
      <PokemonGrid pokemonList={pokemon} />
    </div>
  );
}
