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
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityContainer, PageableInfiniteTableContainer, NoContentComponent, TableColumnBuilder, TableLayout,
} from '@regardsoss/components'
import NotificationStatusCell from './NotificationStatusCell'
import NotificationIcon from './NotificationIcon'
import { tableActions, tableSelectors } from '../../../clients/TableClient'

/**
 * Manage notifications table
 * @author Théo Lasserre
 */
class NotificationTableComponent extends React.Component {
  static propTypes = {
    notificationActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    notificationSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableActions to retrieve entities from server
    // handleOpenNotif: PropTypes.func.isRequired,
    onReadNotification: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    notificationSelected: PropTypes.bool.isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static PAGE_SIZE = 40

  static COLUMN_KEYS = {
    LEVEL: 'level',
    DATE: 'date',
    TITLE: 'title',
    STATUS: 'status',
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="user.menu.notification.table.no.content.title"
      messageKey="user.menu.notification.table.no.content.message"
      Icon={AddToPhotos}
    />)

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="user.menu.notification.table.loading.content.title"
      Icon={SearchIcon}
    />)

  render() {
    const {
      bodyParameters, notificationActions,
      requestParameters, notificationSelectors, isLoading, onReadNotification,
      notificationSelected,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [
      new TableColumnBuilder()
        .selectionColumn(true, notificationSelectors, tableActions, tableSelectors)
        .build(),
      new TableColumnBuilder(NotificationTableComponent.COLUMN_KEYS.LEVEL)
        .titleHeaderCell()
        .label(formatMessage({ id: 'user.menu.notification.table.header.level' }))
        .rowCellDefinition({
          Constructor: NotificationIcon,
        })
        .build(),
      new TableColumnBuilder(NotificationTableComponent.COLUMN_KEYS.DATE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${NotificationTableComponent.COLUMN_KEYS.DATE}`)
        .label(formatMessage({ id: 'user.menu.notification.table.header.date' }))
        .build(),
      new TableColumnBuilder(NotificationTableComponent.COLUMN_KEYS.TITLE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${NotificationTableComponent.COLUMN_KEYS.TITLE}`)
        .label(formatMessage({ id: 'user.menu.notification.table.header.title' }))
        .build(),
      new TableColumnBuilder(NotificationTableComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .label(formatMessage({ id: 'user.menu.notification.table.header.status' }))
        .rowCellDefinition({
          Constructor: NotificationStatusCell,
          props: {
            onReadNotification,
          },
        })
        .build(),
    ]
    return (
      <TableLayout>
        <PageableInfiniteTableContainer
          name="notification-list-table"
          pageActions={notificationActions}
          pageSelectors={notificationSelectors}
          tableActions={tableActions}
          pageSize={NotificationTableComponent.PAGE_SIZE}
          minRowCount={minRowCount}
          maxRowCount={notificationSelected ? 7 : maxRowCount}
          columns={columns}
          requestParameters={requestParameters}
          bodyParams={bodyParameters}
          fetchUsingPostMethod
          emptyComponent={isLoading ? NotificationTableComponent.LOADING_COMPONENT : NotificationTableComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default NotificationTableComponent
