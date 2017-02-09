/**
 * LICENSE_PLACEHOLDER
 **/

const AccessGroup = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
      email: React.PropTypes.string,
    })),
    accessRights: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
    })),
    isPrivate: React.PropTypes.bool,
  }).isRequired,
})
export default AccessGroup
