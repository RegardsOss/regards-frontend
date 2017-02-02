const Role = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    parentRole: React.PropTypes.shape({
      name: React.PropTypes.string,
      id: React.PropTypes.number,
    }),
    isDefault: React.PropTypes.bool,
    isNative: React.PropTypes.bool,
    authorizedAddresses: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
})

export default Role
