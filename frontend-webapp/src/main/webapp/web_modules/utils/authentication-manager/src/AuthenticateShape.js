/**
 * LICENSE_PLACEHOLDER
 */
export default PropTypes.shape({
  error: PropTypes.shape({
    loginError: PropTypes.string,
    hasError: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.number,
  }),
  isFetching: PropTypes.bool,
  authenticateDate: PropTypes.number,
  sessionLocked: PropTypes.bool,
  result: PropTypes.shape({
    project: PropTypes.string,
    scope: PropTypes.string,
    sub: PropTypes.string,
    role: PropTypes.string,
    access_token: PropTypes.string,
    token_type: PropTypes.string,
    expires_in: PropTypes.number,
    jti: PropTypes.string,
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

export const AuthenticationErrorShape = PropTypes.oneOf(errorTypes)
