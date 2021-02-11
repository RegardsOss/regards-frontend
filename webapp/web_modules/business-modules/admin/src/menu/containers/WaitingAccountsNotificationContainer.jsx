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
import { AdminInstanceClient } from '@regardsoss/client'
import NotificationCountContainer from './NotificationCountContainer'

// default client selectors instance
const accountWaitingSelectors = AdminInstanceClient.getAccountWaitingSelectors()

/**
* Shows users waiting access notification count
*/
class WaitingAccountsNotificationContainer extends React.Component {
  countEntities = (state) => accountWaitingSelectors.getSize(state)

  render() {
    // instantiate refresh handler and notification displayer
    return <NotificationCountContainer entitiesCounter={this.countEntities} {...this.props} />
  }
}
export default WaitingAccountsNotificationContainer
