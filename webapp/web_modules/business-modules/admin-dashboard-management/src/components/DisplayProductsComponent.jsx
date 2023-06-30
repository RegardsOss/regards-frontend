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

import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { productActions, productSelectors } from '../clients/SearchProductsClient'

/**
 * Display products of a session in a table
 * @author Théo Lasserre
 */
class DisplayProductsComponent extends React.Component {
  static propTypes = {
    sessionName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static pageSize = 100

  static minRowCount = 5

  static maxRowCount = 8

  static INVALID_INCOMPLETE_PRODUCT_STATES = ['INVALID', 'ACQUIRING']

  static ERROR_SIP_STATES = ['GENERATION_ERROR', 'INGESTION_FAILED']

  render() {
    const { sessionName } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          displayProductsStyle,
        },
      },
    } = this.context
    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().label(formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.name' })).propertyRenderCell('content.productName')
        .fixedSizing(300)
        .build(),
      new TableColumnBuilder('column.error').titleHeaderCell().label(formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.error' })).propertyRenderCell('content.error')
        .dynamicSizing()
        .build(),
    ]
    const requestParameters = { session: sessionName, sipState: DisplayProductsComponent.ERROR_SIP_STATES, state: DisplayProductsComponent.INVALID_INCOMPLETE_PRODUCT_STATES }
    return (
      <div style={displayProductsStyle}>
        <TableLayout>
          <PageableInfiniteTableContainer
            name="products-list"
            pageActions={productActions}
            pageSelectors={productSelectors}
            queryPageSize={DisplayProductsComponent.pageSize}
            minRowCount={DisplayProductsComponent.minRowCount}
            maxRowCount={DisplayProductsComponent.maxRowCount}
            columns={columns}
            requestParams={requestParameters}
          />
        </TableLayout>
      </div>
    )
  }
}
export default DisplayProductsComponent
