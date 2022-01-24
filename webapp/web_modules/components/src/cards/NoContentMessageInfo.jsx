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
import DefaultIcon from 'mdi-material-ui/EmoticonOutline'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import NoContentComponent from '../content/feedback/NoContentComponent'
import styles from './styles'

/**
 * Shows icon and messages for a no content area, shows area otherwise. Designed for easy integration within a parent flex box layout
 */
export class NoContentMessageInfo extends React.Component {
  static propTypes = {
    noContent: PropTypes.bool.isRequired,
    titleKey: PropTypes.string,
    titleParameters: PropTypes.objectOf(PropTypes.any), // title message parameters
    messageKey: PropTypes.string,
    messageParameters: PropTypes.objectOf(PropTypes.any), // main message parameters
    Icon: PropTypes.func,
    // No data action, generally a button, that will be displayed under the no data message
    action: PropTypes.element,
    children: PropTypes.node,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      titleKey, titleParameters, messageKey, messageParameters,
      Icon, action, noContent, children,
    } = this.props
    const { moduleTheme: { noDataContainerStyle } } = this.context
    return (
      <div style={noDataContainerStyle}>
        {
          noContent
            ? <NoContentComponent
                titleKey={titleKey}
                titleParameters={titleParameters}
                messageKey={messageKey}
                messageParameters={messageParameters}
                Icon={Icon}
                action={action}
            />
            : children
        }
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(NoContentMessageInfo)
