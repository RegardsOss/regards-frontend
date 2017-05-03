/**
 * LICENSE_PLACEHOLDER
 */
export default React.PropTypes.shape({
  error: React.PropTypes.shape({
    loginError: React.PropTypes.string,
    hasError: React.PropTypes.bool,
    type: React.PropTypes.string,
    message: React.PropTypes.string,
    status: React.PropTypes.number,
  }),
  isFetching: React.PropTypes.bool,
  authenticateDate: React.PropTypes.number,
  sessionLocked: React.PropTypes.bool,
  result: React.PropTypes.shape({
    project: React.PropTypes.string,
    scope: React.PropTypes.string,
    sub: React.PropTypes.string,
    role: React.PropTypes.string,
    access_token: React.PropTypes.number,
    token_type: React.PropTypes.string,
    expires_in: React.PropTypes.number,
    jti: React.PropTypes.string,
  }),
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
