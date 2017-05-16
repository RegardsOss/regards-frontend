export const filterShape = PropTypes.shape({
  // unique in filters list: filter key
  filterKey: PropTypes.string.isRequired,
  // label for filter display
  filterLabel: PropTypes.string.isRequired,
  // Open search query corresponding to that filer
  openSearchQuery: PropTypes.string.isRequired,
})

export const filterListShape = PropTypes.arrayOf(filterShape)
