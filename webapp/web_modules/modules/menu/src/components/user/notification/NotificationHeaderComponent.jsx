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
import map from 'lodash/map'
import get from 'lodash/get'
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { TableFilterSortingAndVisibilityContainer, TableSelectionModes, withFiltersPane } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import NotificationFiltersComponent from './NotificationFiltersComponent'
import HeaderActionBarContainer from '../../../containers/user/notification/HeaderActionBarContainer'
import { NotificationFilters } from '../../../domain/filters'

/**
 * Manage notification filters component & notification table action group component.
 * @author Théo Lasserre
 */
class NotificationHeaderComponent extends React.Component {
  static propTypes = {
    onCloseNotificationDialog: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    onDeleteNotifications: PropTypes.func,

    // other props from TableFilterSortingAndVisibilityContainer
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onDeleteNotifications = (tableSelection, selectionMode) => {
    const { onDeleteNotifications, inputValues } = this.props
    const notificationIds = map(tableSelection, (selection) => get(selection, 'content.id'))
    const mode = selectionMode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE
    const notificationIdsFilter = new NotificationFilters().withNotificationIds(notificationIds, mode).build()
    const payload = {
      ...UIDomain.FiltersPaneHelper.buildRequestParameters(inputValues),
      ...notificationIdsFilter,
    }
    onDeleteNotifications(payload)
  }

  render() {
    const { onCloseNotificationDialog, inputValues, ...otherProps } = this.props
    const { moduleTheme: { notifications: { headerComponent: { mainDivStyle, filterComponentStyle, headerActionBarStyle } } } } = this.context
    return (
      <div style={mainDivStyle}>
        <div style={filterComponentStyle}>
          <NotificationFiltersComponent
            key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
            inputValues={inputValues}
            {...otherProps}
          />
        </div>
        <div style={headerActionBarStyle}>
          <HeaderActionBarContainer
            onDeleteNotifications={this.onDeleteNotifications}
            onCloseNotificationDialog={onCloseNotificationDialog}
            inputValues={inputValues}
          />
        </div>
      </div>
    )
  }
}
export default withFiltersPane(NotificationFiltersComponent.DEFAULT_FILTERS_STATE, true)(NotificationHeaderComponent)
