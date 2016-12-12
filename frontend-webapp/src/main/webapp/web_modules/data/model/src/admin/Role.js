export default React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    parentRole: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    isDefault: React.PropTypes.bool,
    isNative: React.PropTypes.bool,
    authorizedAddresses: [],
  }),
})
