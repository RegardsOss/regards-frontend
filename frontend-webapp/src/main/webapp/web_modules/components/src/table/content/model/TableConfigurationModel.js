/**
* LICENSE_PLACEHOLDER
**/

/**
 * Static table configuration: all table properties that are parts of graphic configuration
 */
export default {
  displayColumnsHeader: PropTypes.bool,
  lineHeight: PropTypes.number.isRequired,
  cellsStyle: PropTypes.objectOf(PropTypes.string),
  displayCheckbox: PropTypes.bool,
  onSortByColumn: PropTypes.func,
}
