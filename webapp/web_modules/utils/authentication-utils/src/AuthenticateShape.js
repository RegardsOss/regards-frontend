/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
/** Authentication result shape */
export const AuthenticateResultShape = PropTypes.shape({
  project: PropTypes.string,
  scope: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  access_token: PropTypes.string.isRequired, // eslint wont fix: as externally provided
  token_type: PropTypes.string,
  expires_in: PropTypes.number.isRequired,
  jti: PropTypes.string,
})

export const AuthenticateShape = PropTypes.shape({
  error: PropTypes.shape({
    loginError: PropTypes.string,
    hasError: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.number,
  }),
  isFetching: PropTypes.bool,
  authenticateDate: PropTypes.number,
  authenticateExpirationDate: PropTypes.number,
  sessionLocked: PropTypes.bool,
  result: AuthenticateResultShape,
})

export const errorTypes = [
  'ACCESS_GRANTED',
  'ACCOUNT_UNKNOWN',
  'ACCOUNT_PENDING',
  'ACCOUNT_INACTIVE',
  'ACCOUNT_INACTIVE_PASSWORD',
  'ACCOUNT_LOCKED',
  'USER_UNKNOWN',
  'USER_WAITING_ACCOUNT_ACTIVE',
  'USER_WAITING_ACCESS',
  'USER_WAITING_EMAIL_VERIFICATION',
  'USER_ACCESS_DENIED',
  'USER_ACCESS_INACTIVE',
  'UNKNOWN_ERROR',
]

export const AuthenticationErrorShape = PropTypes.oneOf(errorTypes)
