/**
 * LICENSE_PLACEHOLDER
 **/

const AccessRight = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    accessLevel: React.PropTypes.string,
    dataAccessRight: React.PropTypes.shape({
      pluginConfiguration: React.PropTypes.number,
      dataAccessLevel: React.PropTypes.string,
    }),
    dataset: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
    })),
    qualityFilter: React.PropTypes.shape({
      maxScore: React.PropTypes.number,
      minScore: React.PropTypes.number,
      qualityLevel: React.PropTypes.string,
    }),
  }).isRequired,
})
export default AccessRight

