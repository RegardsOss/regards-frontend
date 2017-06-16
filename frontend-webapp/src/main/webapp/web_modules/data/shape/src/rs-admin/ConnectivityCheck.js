/**
 * LICENSE_PLACEHOLDER
 **/
const ConnectivityCheck = PropTypes.shape({
  content: PropTypes.shape({
    projectConnectionId: PropTypes.number,
    connectivity: PropTypes.symbol,
    message: PropTypes.string,
    lastCheck: PropTypes.string,
  }),
})
const ConnectivityCheckList = PropTypes.objectOf(ConnectivityCheck)

export default {
  ConnectivityCheck,
  ConnectivityCheckList,
}
