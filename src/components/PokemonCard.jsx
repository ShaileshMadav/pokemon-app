import { Link } from 'react-router-dom';
import { getPokemonGradient } from '../utils/typeColors';
import { formatPokemonName, formatStatName } from '../utils/helpers';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon }) {
  const background = getPokemonGradient(pokemon.types);

  // Get key stats to display on card
  const hp = pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  const attack = pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
  const defense = pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
  const speed = pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className={styles.cardLink}>
      <div className={styles.card} style={{ background }}>
        <div className={styles.cardHeader}>
          <span className={styles.pokemonId}>#{String(pokemon.id).padStart(3, '0')}</span>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={styles.typeBadge}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className={styles.pokemonImage}
            loading="lazy"
          />
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.pokemonName}>{formatPokemonName(pokemon.name)}</h3>

          <div className={styles.stats}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>HP</span>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBar}
                  style={{ width: `${Math.min(hp / 1.5, 100)}%` }}
                />
              </div>
              <span className={styles.statValue}>{hp}</span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>ATK</span>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBar}
                  style={{ width: `${Math.min(attack / 1.5, 100)}%` }}
                />
              </div>
              <span className={styles.statValue}>{attack}</span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>DEF</span>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBar}
                  style={{ width: `${Math.min(defense / 1.5, 100)}%` }}
                />
              </div>
              <span className={styles.statValue}>{defense}</span>
            </div>

            <div className={styles.statRow}>
              <span className={styles.statLabel}>SPD</span>
              <div className={styles.statBarContainer}>
                <div
                  className={styles.statBar}
                  style={{ width: `${Math.min(speed / 1.5, 100)}%` }}
                />
              </div>
              <span className={styles.statValue}>{speed}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
