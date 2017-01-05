const ConnectivityCheck = React.PropTypes.shape({
  content: React.PropTypes.shape({
    projectConnectionId: React.PropTypes.number,
    connectivity: React.PropTypes.symbol,
    message: React.PropTypes.string,
    lastCheck: React.PropTypes.string,
  }),
})

export default ConnectivityCheck
export const ConnectivityCheckList = React.PropTypes.objectOf(ConnectivityCheck)
