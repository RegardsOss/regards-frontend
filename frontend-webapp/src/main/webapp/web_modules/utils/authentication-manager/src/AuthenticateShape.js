/**
 * LICENSE_PLACEHOLDER
 */
export default React.PropTypes.shape({
  isFetching: React.PropTypes.bool,
  user: React.PropTypes.shape({
    expires_in: React.PropTypes.number,
  }),
  authenticateDate: React.PropTypes.number,
})

export const errorTypes = [
  'ACCOUNT_UNKNOWN',
  'ACCOUNT_PENDING',
  'ACCOUNT_ACCEPTED',
  'ACCOUNT_INACTIVE',
  'ACCOUNT_LOCKED',
  'USER_UNKNOWN',
  'USER_WAITING_ACCESS',
  'USER_ACCESS_DENIED',
  'USER_ACCESS_INACTIVE',
  'UNKNOWN_ERROR',
]

export const AuthenticationErrorShape = React.PropTypes.oneOf(errorTypes)
