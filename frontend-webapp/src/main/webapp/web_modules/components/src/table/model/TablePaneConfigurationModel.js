/**
* LICENSE_PLACEHOLDER
**/

/**
 * Table pane configuration shape model
 */
export default {
  // adds tabs buttons to results table
  resultsTabsButtons: React.PropTypes.arrayOf(React.PropTypes.node),
  // adds custom table options, nearside parmaeters
  customTableOptions: React.PropTypes.arrayOf(React.PropTypes.node),
  // shows a custom table header area instand of results count, just above columns
  customTableHeaderArea: React.PropTypes.node,
  // should show parameters button?
  showParameters: React.PropTypes.bool.isRequired,
  // Display table header toolbar ?
  displayTableHeader: React.PropTypes.bool,
}
