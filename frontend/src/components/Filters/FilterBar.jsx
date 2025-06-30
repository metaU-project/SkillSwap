import { useState } from 'react';
import './FilterBar.css';

function FilterBar({ filter, setFilter }) {
    const handleFilter = (option, type) => {
        setFilter(prev => ({ ...prev, [type]: option }));
        setActiveFilter(type);
      };

    return (
        <div className="filter-bar">

            <button className="filter-button" >Recommended</button>
            <select
                value={filter.type || ''}
                onChange={(e) => handleFilter(e.target.value, 'type')}
                className="filter-select"
            >
                <option value="">Type</option>
                <option value="Offer">Offer</option>
                <option value="Request">Request</option>
            </select>
            <select
                value={filter.location || ''}
                onChange={(e) => handleFilter(e.target.value, 'location')}
                className="filter-select"
            >
                <option value="">Location</option>
                <option value="Remote">Remote</option>
                <option value="In Person">In Person</option>
            </select>

            <select
                value={filter.interest || ''}
                onChange={(e) => handleFilter(e.target.value, 'interest')}
                className="filter-select"
            >
                <option value="">Filter by Interest</option>
                <option value="Music">Music</option>
                <option value="Fitness">Fitness</option>
                <option value="Coding">Coding</option>
            </select>

            <select
                value={filter.sort || ''}
                onChange={(e) => handleFilter(e.target.value, 'sort')}
                className="filter-select"
            >
                <option value="">Recent</option>
                <option value="Recent">last week</option>
                <option value="Recommended"> last month</option>
            </select>
        </div>
    );
}

export default FilterBar;
