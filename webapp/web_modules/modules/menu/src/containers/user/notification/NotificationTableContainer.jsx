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
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import {
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { notificationDetailsSelectors } from '../../../clients/NotificationClient'
import NotificationTableComponent from '../../../components/user/notification/NotificationTableComponent'

/**
 * Notification Table Container. Retrieve selected notification from store
 * @author Théo Lasserre
 */
export class NotificationTableContainer extends React.Component {
  static propTypes = {
    notificationActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    notificationSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableActions to retrieve entities from server
    onReadNotification: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
    // from mapStateToProps
    selectedNotification: PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.number,
      message: PropTypes.string,
      title: PropTypes.string,
    }),
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      selectedNotification: notificationDetailsSelectors.getResult(state),
    }
  }

  render() {
    const {
      bodyParameters, requestParameters, onReadNotification, notificationActions, notificationSelectors, isLoading, selectedNotification,
    } = this.props
    return (
      <NotificationTableComponent
        notificationActions={notificationActions}
        notificationSelectors={notificationSelectors}
        isLoading={isLoading}
        notificationSelected={!isEmpty(selectedNotification)}
        onReadNotification={onReadNotification}
        requestParameters={requestParameters}
        bodyParameters={bodyParameters}
      />
    )
  }
}
export default connect(
  NotificationTableContainer.mapStateToProps,
  NotificationTableContainer.mapDispatchToProps)(NotificationTableContainer)
