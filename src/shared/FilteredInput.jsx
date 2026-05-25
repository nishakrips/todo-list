function FilteredInput({ filterTerm, onFilterChange }) {
  return (
    <div>
      <label htmlFor="filterInput">Search todos:</label>
      <input
        id="filterInput"
        type="text"
        placeholder="Search by title..."
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  )
}

export default FilteredInput
