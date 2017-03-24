/**
* LICENSE_PLACEHOLDER
**/

/**
 * Static table configuration: all table properties that are parts of graphic configuration
 */
export default {
  displayColumnsHeader: React.PropTypes.bool,
  lineHeight: React.PropTypes.number.isRequired,
  cellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
  displayCheckbox: React.PropTypes.bool,
  onSortByColumn: React.PropTypes.func,
}
