/**
* LICENSE_PLACEHOLDER
**/

/**
 * Static table configuration: all table properties that are parts of graphic configuration
 */
export default {
  displayColumnsHeader: PropTypes.bool,
  lineHeight: PropTypes.number, // defaults to theme when not provided
  cellsStyle: PropTypes.objectOf(PropTypes.string),
  displayCheckbox: PropTypes.bool,
  displaySelectAll: PropTypes.bool,
  onSortByColumn: PropTypes.func,
  minRowCount: PropTypes.number,
}
