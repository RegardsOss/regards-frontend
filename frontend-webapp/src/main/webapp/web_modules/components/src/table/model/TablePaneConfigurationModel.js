/**
* LICENSE_PLACEHOLDER
**/

/**
 * Table pane configuration shape model
 */
export default {
  // adds tabs buttons to results table
  resultsTabsButtons: React.PropTypes.arrayOf(React.PropTypes.node),
  // shows a custom table header area instand of results count, just above columns
  customTableHeaderArea: React.PropTypes.node,
  // should show parameters button?
  showParameters: React.PropTypes.bool.isRequired,
  // Display table header toolbar ?
  displayTableHeader: React.PropTypes.bool,
  // adds custom table options on tabs bar right side
  customTableOptions: React.PropTypes.arrayOf(React.PropTypes.node),
  // adds table context actions on tabs bar center
  contextOptions: React.PropTypes.arrayOf(React.PropTypes.node),
  // Table advanced options, displayed as children in 'Plus' Menu
  advancedOptions: React.PropTypes.arrayOf(React.PropTypes.node),
}
