export const filterShape = React.PropTypes.shape({
  // unique in filters list: filter key
  filterKey: React.PropTypes.string.isRequired,
  // label for filter display
  filterLabel: React.PropTypes.string.isRequired,
  // Open search query corresponding to that filer
  openSearchQuery: React.PropTypes.string.isRequired,
})

export const filterListShape = React.PropTypes.arrayOf(filterShape)
