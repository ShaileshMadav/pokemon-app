import PokemonCard from './PokemonCard';
import styles from './PokemonGrid.module.css';

export default function PokemonGrid({ pokemonList }) {
  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
