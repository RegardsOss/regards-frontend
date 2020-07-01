/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import Badge from 'material-ui/Badge'

/**
* Container for observable list counts (fetches the results on timer, to show the notifications count changes)
*/
class NotificationCountContainer extends React.Component {
  static propTypes = {
    notificationsCount: PropTypes.number.isRequired,
    // used in map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesCounter: PropTypes.func.isRequired,
    // required, see workaround comment in render method
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  render() {
    const { notificationsCount, style } = this.props
    /* workaround material UI MenuItem uses style directly on contained components,
    which is terribly wrong and forces this container to report it here */
    return notificationsCount ? <Badge className="selenium-notificationCount" badgeContent={notificationsCount} style={style} primary /> : null
  }
}

const mapStateToProps = (state, { entitiesCounter }) => ({
  notificationsCount: entitiesCounter(state),
})

export default connect(mapStateToProps, null)(NotificationCountContainer)
