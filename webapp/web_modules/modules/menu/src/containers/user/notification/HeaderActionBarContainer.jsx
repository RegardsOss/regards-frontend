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
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { tableSelectors } from '../../../clients/TableClient'
import { notificationSelectors, deleteNotificationSelectors } from '../../../clients/NotificationClient'
import HeaderActionBarComponent from '../../../components/user/notification/HeaderActionBarComponent'

/**
 * Container for group actions available on notifications. Retrieve table selection and selection mode from redux store.
 * @author Théo Lasserre
 */
export class HeaderActionBarContainer extends React.Component {
  static propTypes = {
    onDeleteNotifications: PropTypes.func,
    onCloseNotificationDialog: PropTypes.func.isRequired,
    // from mapStateToProps
    tableSelection: PropTypes.arrayOf(AdminShapes.NotificationWithinContent),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      tableSelection: tableSelectors.getToggledElementsAsList(state),
      selectionMode: tableSelectors.getSelectionMode(state),
      areAllSelected: tableSelectors.areAllSelected(state, notificationSelectors),
      isDeleting: deleteNotificationSelectors.isFetching(state),
    }
  }

  render() {
    const {
      areAllSelected, selectionMode, tableSelection, onDeleteNotifications,
      onCloseNotificationDialog, isDeleting,
    } = this.props
    return (
      <HeaderActionBarComponent
        areAllSelected={areAllSelected}
        selectionMode={selectionMode}
        tableSelection={tableSelection}
        onDeleteNotifications={onDeleteNotifications}
        onCloseNotificationDialog={onCloseNotificationDialog}
        isDeleting={isDeleting}
      />
    )
  }
}
export default connect(HeaderActionBarContainer.mapStateToProps,
  null)(HeaderActionBarContainer)
