import FilterInput from "./FilteredInput.jsx"
import StatusFilter from "./StatusFilter.jsx"

function Toolbar({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
  filterTerm,
  onFilterChange,
}) {
  return (
    <section className="toolbar" aria-label="Todo toolbar">
      <div className="toolbar-top-row">
        <div className="toolbar-group toolbar-group--sort-by">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="creationDate">Creation Date</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="toolbar-group toolbar-group--sort-direction">
          <label htmlFor="sort-direction">Order:</label>
          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="toolbar-group toolbar-group--status">
          <StatusFilter />
        </div>
      </div>
      <div className="toolbar-bottom-row">
        <div className="toolbar-group toolbar-group--search">
          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
    </section>
  )
}

export default Toolbar
