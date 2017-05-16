/**
* LICENSE_PLACEHOLDER
**/

/**
 * Table pane configuration shape model
 */
export default {
  // adds tabs buttons to results table
  resultsTabsButtons: PropTypes.arrayOf(PropTypes.node),
  // shows a custom table header area instand of results count, just above columns
  customTableHeaderArea: PropTypes.node,
  // should show parameters button?
  showParameters: PropTypes.bool.isRequired,
  // Display table header toolbar ?
  displayTableHeader: PropTypes.bool,
  // adds custom table options on tabs bar right side
  customTableOptions: PropTypes.arrayOf(PropTypes.node),
  // adds table context actions on tabs bar center
  contextOptions: PropTypes.arrayOf(PropTypes.node),
  // Table advanced options, displayed as children in 'Plus' Menu
  advancedOptions: PropTypes.arrayOf(PropTypes.node),
}
