import './FilterBar.css';

function FilterBar({ setFilter }) {
  return (
    <div className="filter-bar">
      <button
        className="filter-button"
        onClick={() => setFilter('Recommended')}
      >
        Recommended
      </button>
      <select className="filter-select">
        <option value="">Type</option>
        <option value="Offer">Offer</option>
        <option value="Request">Request</option>
      </select>
      <select className="filter-select">
        <option value="">Recent</option>
        <option value="Recent">last week</option>
        <option value="Recommended"> last month</option>
      </select>
    </div>
  );
}

export default FilterBar;
