import React from "react";

const Filter = ({ filters, setSelectFilter }) => {
  const setFilter = (value) => {
    filters && filters.map((f) => f.name === value && setSelectFilter(f));
  };
  return (
    <form>
      <p>
        Select issues by filter:
        <select name="filter" onChange={(e) => setFilter(e.target.value)}>
          {filters &&
            filters.map((filter) => (
              <option key={filter.id}>{filter.name}</option>
            ))}
        </select>
      </p>
    </form>
  );
};

export default Filter;
