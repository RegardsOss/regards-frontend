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
import DefaultIcon from 'mdi-material-ui/EmoticonOutline'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Displays wide no content message (icon, title and message)
 * In order to adapt its parent size, style is defined as, flexGrow/flexShrink: 1. That can be
 * overriden using style property but flex layouting  properties should be preserved for
 * children to resize correctly.
 * @author Raphaël Mechali
 */
export class NoContentComponent extends React.Component {
  static propTypes = {
    titleKey: PropTypes.string,
    titleParameters: PropTypes.objectOf(PropTypes.any), // title message parameters
    messageKey: PropTypes.string,
    messageParameters: PropTypes.objectOf(PropTypes.any), // main message parameters
    // Icon constructor
    Icon: PropTypes.func,
    // No data action, generally a button, that will be displayed under the no data message
    action: PropTypes.element,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    style: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    titleKey: 'default.no.content.title',
    style: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
    },
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      style, Icon, action,
      titleKey, titleParameters, messageKey, messageParameters,
    } = this.props
    const { intl: { formatMessage }, muiTheme, moduleTheme: { noContent } } = this.context
    return (
      // External layout from user API
      <div style={style}>
        {/* Inner layout */}
        <div style={noContent.wrapper} className="selenium-noResult">
          <Icon color={muiTheme.components.noData.icon.color} style={noContent.iconStyle} />
          <div style={noContent.titleWrapper}>
            {formatMessage({ id: titleKey }, titleParameters)}
          </div>
          {
            messageKey ? (
              <div style={noContent.messageWrapper}>
                {formatMessage({ id: messageKey }, messageParameters)}
              </div>) : null
          }
          {action ? (
            <div style={noContent.actionWrapper}>
              {action}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default compose(withI18n(messages, true), withModuleStyle(styles, true))(NoContentComponent)
