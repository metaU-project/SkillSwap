import './FilterBar.css';

function FilterBar({ setFilter, setType, setRecency }) {
  return (
    <div className="filter-bar">
      <button
        className="filter-button"
        onClick={() => setFilter('Recommended')}
      >
        Recommended
      </button>
      <select
        className="filter-select"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Type</option>
        <option value="OFFER">Offer</option>
        <option value="REQUEST">Request</option>
      </select>
      <select
        className="filter-select"
        onChange={(e) => setRecency(e.target.value)}
      >
        <option value="">Recent</option>
        <option value="last_week">Last Week</option>
        <option value="last_month"> Last Month</option>
      </select>
    </div>
  );
}

export default FilterBar;
