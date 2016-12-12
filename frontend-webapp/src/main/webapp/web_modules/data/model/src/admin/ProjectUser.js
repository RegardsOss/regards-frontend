export default React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    role_id: React.PropTypes.string,
    email: React.PropTypes.string,
    lastupdate: React.PropTypes.string,
    lastconnection: React.PropTypes.string,
    status: React.PropTypes.string,
  }),
})
