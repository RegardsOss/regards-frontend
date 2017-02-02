/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 */
export default React.PropTypes.shape({
  type: React.PropTypes.string,
  coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
})
