/**
 * LICENSE_PLACEHOLDER
 **/

const AccessGroup = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
      }),
    ),
    accessRights: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    isPrivate: PropTypes.bool,
  }).isRequired,
})

const AccessGroupList = PropTypes.objectOf(AccessGroup)


export default { AccessGroup, AccessGroupList }
