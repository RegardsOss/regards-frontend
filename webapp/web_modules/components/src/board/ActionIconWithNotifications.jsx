/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Badge from 'material-ui/Badge'
import { ShowableAtRender } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import styles from './styles/styles'

/**
* Card action icon, showing notificatations count (usable as board item action icon, for sub categories)
*/
class ActionIconWithNotifications extends React.Component {
  static propTypes = {
    notificationsCount: PropTypes.number,
    icon: PropTypes.element.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    iconStyle: PropTypes.object, // CSS styles to apply, or none if default styles should be used
    // eslint-disable-next-line react/forbid-prop-types
    badgeStyle: PropTypes.object, // CSS styles to apply, or none if default styles should be used
  }

  static defaultProps = {
    notificationsCount: 0,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      notificationsCount, icon, iconStyle, badgeStyle,
    } = this.props
    // render styles, as not provided by a dynamic module
    let usedIconStyle = iconStyle
    let usedBadgeStyle = badgeStyle
    if (!usedIconStyle || !usedBadgeStyle) {
      // compute theme style
      const { actionIconWithNotifications: { badgeStyles: themeBadgeStyle, iconStyles: themeIconStyle } } = styles(this.context.muiTheme)
      // used theme style when not user specified
      usedIconStyle = usedIconStyle || themeIconStyle
      usedBadgeStyle = usedBadgeStyle || themeBadgeStyle
    }

    return (
      <div>
        <ShowableAtRender show={!!notificationsCount}>
          <Badge
            badgeContent={notificationsCount}
            badgeStyle={usedBadgeStyle}
            primary
          />
        </ShowableAtRender>
        {React.cloneElement(icon, {
          // clone element to center it in parent button
          style: usedIconStyle,
        })}
      </div>
    )
  }
}
export default ActionIconWithNotifications
