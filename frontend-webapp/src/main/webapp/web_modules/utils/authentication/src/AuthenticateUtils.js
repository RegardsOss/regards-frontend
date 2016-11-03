export const isAuthenticated = (authentication) => {
  let authenticated = false
  if (authentication
    && authentication.authenticateDate
    && authentication.user
    && authentication.user.expires_in) {
    authenticated = authentication.authenticateDate + (authentication.user.expires_in * 1000) > Date.now()
    authenticated = authenticated && (authentication.user.name !== undefined) && authentication.user.name !== 'public'
  }

  return authenticated
}
