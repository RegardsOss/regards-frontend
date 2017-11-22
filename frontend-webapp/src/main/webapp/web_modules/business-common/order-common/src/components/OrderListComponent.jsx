/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PageableInfiniteTableContainer, NoContentMessageInfo, TableColumnBuilder, TableLayout } from '@regardsoss/components'
import { buildSinglePropertyCellRender, TYPES_ENUM } from '@regardsoss/attributes-common'
import NoOrderComponent from './NoOrderComponent'

/**
* Order list component - displays user order list
* @author Raphaël Mechali
*/
class OrderListComponent extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // from mapStateToProps
    totalOrderCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** No data component (avoids re-rendering it) */
  static EMPTY_COMPONENT = <NoOrderComponent />

  buildColumns = () => {
    const { } = this.props // TODO use later
    const { intl: { formatMessage } } = this.context
    return [
      // creation date
      TableColumnBuilder.buildSimpleColumnWithCell('creation.date', formatMessage({ id: 'order.list.column.creation.date' }),
        buildSinglePropertyCellRender('content.creationDate', TYPES_ENUM.DATE_ISO8601)),
      // expiration date
      TableColumnBuilder.buildSimpleColumnWithCell('expiration.date', formatMessage({ id: 'order.list.column.expiration.date' }),
        buildSinglePropertyCellRender('content.expirationDate', TYPES_ENUM.DATE_ISO8601)),
      // TODO demain ===> cellule sur mesure pour le compte d'objets des datasets
      TableColumnBuilder.buildSimplePropertyColumn('objects.count', formatMessage({ id: 'order.list.column.object.count' }), 'content.objectsCount'),
      // order.list.column.files.count
      // order.list.column.errors.count
      // order.list.column.files.size
      // order.list.column.progress
      // order.list.column.status
      // order.list.column.options
    ]
  }

  render() {
    const { isAuthenticated, commandsActions, commandsSelectors, totalOrderCount } = this.props
    const { intl: { formatMessage } } = this.context
    const columns = this.buildColumns()
    return (
      // Show non authentified pane if user is not authentified
      <NoContentMessageInfo
        noContent={!isAuthenticated}
        title={formatMessage({ id: 'not.logged.information.title' })}
        message={formatMessage({ id: 'not.logged.information.message' })}
        Icon={NotLoggedIcon}
      >
        {/* Table with commands */}
        <TableLayout >
          {/* Table header - TODO */}
          <PageableInfiniteTableContainer
            // infinite table configuration
            pageActions={commandsActions}
            pageSelectors={commandsSelectors}
            columns={columns}
            emptyComponent={OrderListComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
      </NoContentMessageInfo>
    )
  }
}
export default OrderListComponent
