import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="pokeball-loader">
        <div className="pokeball">
          <div className="pokeball-top"></div>
          <div className="pokeball-middle"></div>
          <div className="pokeball-bottom"></div>
          <div className="pokeball-button"></div>
        </div>
      </div>
      <p className="loading-text">Loading Pokemon...</p>
    </div>
  );
}
