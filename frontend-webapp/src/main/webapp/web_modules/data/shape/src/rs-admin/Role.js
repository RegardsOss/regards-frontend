const Role = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    parentRole: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
    isDefault: PropTypes.bool,
    isNative: PropTypes.bool,
    authorizedAddresses: PropTypes.arrayOf(PropTypes.string),
  }),
})

const RoleList = PropTypes.objectOf(Role)
const RoleArray = PropTypes.arrayOf(Role)

export default { Role, RoleList, RoleArray }
