/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DefaultIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'
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
    title: PropTypes.node.isRequired, // TODO: a nice refactor here would be to use keys instead of messages!!! (stack context)
    message: PropTypes.node,
    // pointer of the constructor of the icon
    Icon: PropTypes.func,
    // Generally a button. Will be displayed under the message
    action: PropTypes.element,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    style: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
    },
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      style, title, message, Icon, action,
    } = this.props
    const { muiTheme, moduleTheme: { noContent } } = this.context
    return (
      // External layout from user API
      <div style={style}>
        {/* Inner layout */}
        <div style={noContent.wrapper} className="selenium-noResult">
          <Icon color={muiTheme.components.noData.icon.color} style={noContent.iconStyle} />
          <div style={noContent.titleWrapper}>
            {title || <FormattedMessage id="no.content.information.title" />}
          </div>
          <div style={noContent.messageWrapper}>
            {message}
          </div>
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

export default withModuleStyle(styles, true)(NoContentComponent)
