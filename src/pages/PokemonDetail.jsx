import { useParams, useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { getPokemonGradient, getTypeBadgeColor } from '../utils/typeColors';
import { formatPokemonName, formatStatName, getStatColor } from '../utils/helpers';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import styles from './PokemonDetail.module.css';

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, species, loading, error, refetch } = usePokemon(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!pokemon) {
    return <ErrorMessage message="Pokemon not found" onRetry={() => navigate('/')} />;
  }

  const background = getPokemonGradient(pokemon.types);

  return (
    <div className={styles.container} style={{ background }}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        ← Back to Pokédex
      </button>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.imageSection}>
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className={styles.pokemonImage}
            />
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.header}>
            <div>
              <span className={styles.pokemonId}>#{String(pokemon.id).padStart(3, '0')}</span>
              <h1 className={styles.pokemonName}>{formatPokemonName(pokemon.name)}</h1>
              {species && <p className={styles.genera}>{species.genera}</p>}
            </div>
            <div className={styles.types}>
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={styles.typeBadge}
                  style={{ background: getTypeBadgeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {species?.description && (
            <p className={styles.description}>{species.description}</p>
          )}

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Height</span>
              <span className={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Weight</span>
              <span className={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Base Stats</h2>
            <div className={styles.statsContainer}>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className={styles.statRow}>
                  <span className={styles.statName}>{formatStatName(stat.stat.name)}</span>
                  <div className={styles.statBarContainer}>
                    <div
                      className={styles.statBar}
                      style={{
                        width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                        background: getStatColor(stat.base_stat)
                      }}
                    />
                  </div>
                  <span className={styles.statValue}>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Abilities</h2>
            <div className={styles.abilitiesContainer}>
              {pokemon.abilities.map((ability) => (
                <span key={ability.ability.name} className={styles.abilityBadge}>
                  {formatPokemonName(ability.ability.name)}
                  {ability.is_hidden && <span className={styles.hiddenTag}> (Hidden)</span>}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Moves</h2>
            <div className={styles.movesContainer}>
              {pokemon.moves.map((move) => (
                <span key={move.move.name} className={styles.moveBadge}>
                  {formatPokemonName(move.move.name)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
