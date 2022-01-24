/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Displays wide loading message.
 * In order to adapt its parent size, style is defined as, flexGrow/flexShrink: 1. That can be
 * overriden using style property, but flex layouting  properties should be preserved for
 * children to resize correctly.
 * @author Raphaël Mechali
 */
export class ContentLoadingComponent extends React.Component {
  static DEFAULT_MESSAGES_KEYS = {
    LOADING_CONTENT: 'default.content.loading.message',
    LOADING_FILE: 'default.file.loading.message',
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // loading message key, required (by default: loading content message)
    loadingMessageKey: PropTypes.string,
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
    },
    loadingMessageKey: ContentLoadingComponent.DEFAULT_MESSAGES_KEYS.LOADING_CONTENT,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { style, loadingMessageKey } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        loading: {
          container, circle, message,
        },
      },
    } = this.context
    return (
      // External placement, using optional user style
      <div style={style}>
        {/* Internal placement: grow the whole size, report internal layout from styles */}
        <div style={container}>
          <CircularProgress size={circle.size} color={circle.color} thickness={circle.thickness} />
          <div style={message}>
            {formatMessage({ id: loadingMessageKey })}
          </div>
        </div>
      </div>)
  }
}

const withContext = compose(withI18n(messages, true), withModuleStyle(styles, true))(ContentLoadingComponent)
// report static methods to avoid import tricks for API users
withContext.DEFAULT_MESSAGES_KEYS = ContentLoadingComponent.DEFAULT_MESSAGES_KEYS
export default withContext
