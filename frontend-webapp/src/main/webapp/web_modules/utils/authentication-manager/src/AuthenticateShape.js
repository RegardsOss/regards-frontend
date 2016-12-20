export default React.PropTypes.shape({
  isFetching: React.PropTypes.bool,
  user: React.PropTypes.shape({
    expires_in: React.PropTypes.number,
  }),
  authenticateDate: React.PropTypes.number,
})
