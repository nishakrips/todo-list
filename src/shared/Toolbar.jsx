import FilterInput from "./FilteredInput.jsx"
import StatusFilter from "./StatusFilter.jsx"
import styles from "./Toolbar.module.css"

function Toolbar({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
  filterTerm,
  onFilterChange,
}) {
  return (
    <section className={styles.toolbar} aria-label="Todo toolbar">
      <div className={styles.toolbarTopRow}>
        <div className={styles.toolbarGroup}>
          <label className={styles.toolbarLabel} htmlFor="sort-by">
            Sort by:
          </label>
          <select
            id="sort-by"
            className={styles.toolbarSelect}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="creationDate">Creation Date</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className={styles.toolbarGroup}>
          <label className={styles.toolbarLabel} htmlFor="sort-direction">
            Order:
          </label>
          <select
            id="sort-direction"
            className={styles.toolbarSelect}
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className={styles.toolbarGroup}>
          <StatusFilter />
        </div>
      </div>
      <div className={styles.toolbarBottomRow}>
        <div className={styles.toolbarGroup}>
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
