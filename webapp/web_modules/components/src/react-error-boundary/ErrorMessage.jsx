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
 **/
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import compose from 'lodash/fp/compose'
import { withErrorBoundary } from './with-error-boundary'
import messages from './i18n'

class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string,
      stack: PropTypes.string,
    }),
    errorInfo: PropTypes.shape({
      componentStack: PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static PAGE_STYLE = {
    textAlign: 'center',
  }

  static DETAIL_STYLE = { whiteSpace: 'pre-wrap' }

  render() {
    const { intl } = this.context
    const { error, errorInfo } = this.props
    return (
      <div style={ErrorMessage.PAGE_STYLE}>
        <h2>
          {intl.formatMessage({ id: 'react-error-boundary.title' })}
        </h2>
        {intl.formatMessage({ id: 'react-error-boundary.continue' })}
        <a href={`${GATEWAY_HOSTNAME}/`}>
          {intl.formatMessage({ id: 'react-error-boundary.redirect' })}
        </a>

        <details style={ErrorMessage.DETAIL_STYLE}>
          {error && error.toString()}
          {errorInfo && errorInfo.componentStack}
        </details>
      </div>
    )
  }
}

// Compose messages with calling context => any component below will have both
export default compose(withI18n(messages), withErrorBoundary)(ErrorMessage)
