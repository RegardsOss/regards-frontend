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
import FlatButton from 'material-ui/FlatButton'
import Badge from 'material-ui/Badge'
import { themeContextType } from '@regardsoss/theme'
import styles from './styles/styles'

/**
* Card action button, showing notificatations count
*/
class FlatButtonWithNotifications extends React.Component {
  static propTypes = {
    notificationsCount: PropTypes.number,
  }

  static defaultProps = {
    notificationsCount: 0,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      notificationsCount, ...otherProperties
    } = this.props
    const badgeContent = notificationsCount > 999 ? '1k+' : notificationsCount
    const { flatButtonWithNotifications: { flatButtonWithNotifications: flatButtonStyles, badgeStyles } } = styles(this.context.muiTheme)

    return (
      <FlatButton
        labelPosition="before"
        icon={notificationsCount ? (
          <Badge
            badgeContent={badgeContent}
            style={flatButtonStyles}
            badgeStyle={badgeStyles}
            primary
          />) : null}
        {...otherProperties}
      />)
  }
}
export default FlatButtonWithNotifications
