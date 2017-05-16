/**
 * LICENSE_PLACEHOLDER
 **/

const AccessRight = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    accessLevel: PropTypes.string,
    dataAccessRight: PropTypes.shape({
      pluginConfiguration: PropTypes.number,
      dataAccessLevel: PropTypes.string,
    }),
    dataset: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
    qualityFilter: PropTypes.shape({
      maxScore: PropTypes.number,
      minScore: PropTypes.number,
      qualityLevel: PropTypes.string,
    }),
  }).isRequired,
})
export default AccessRight

