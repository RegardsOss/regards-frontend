const ConnectivityCheck = PropTypes.shape({
  content: PropTypes.shape({
    projectConnectionId: PropTypes.number,
    connectivity: PropTypes.symbol,
    message: PropTypes.string,
    lastCheck: PropTypes.string,
  }),
})

export default ConnectivityCheck
export const ConnectivityCheckList = PropTypes.objectOf(ConnectivityCheck)
