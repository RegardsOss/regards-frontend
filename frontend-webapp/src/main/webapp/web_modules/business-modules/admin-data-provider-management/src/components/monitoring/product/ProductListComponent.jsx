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
import get from 'lodash/get'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import {
  PageableInfiniteTableContainer,
  TableColumnBuilder,
  TableLayout, TableHeaderLineLoadingAndResults,
  NoContentComponent,
  CardActionsComponent,
  DateValueRender,
} from '@regardsoss/components'
import { DataProviderShapes } from '@regardsoss/shape'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import ProductStateRender from './ProductStateRender'
import ProductSIPStateRender from './ProductSIPStateRender'
import ProductSessionRender from './ProductSessionRender'
import ProducListFiltersComponent from './ProducListFiltersComponent'
import { TableProductActions } from '../../../clients/TableClient'
import { ProductActions, ProductSelectors } from '../../../clients/ProductClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
* Component to display the list of products of a given acquisition processing chain
* @author Sébastien Binda
*/
class ProductListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    chain: DataProviderShapes.AcquisitionProcessingChain,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    appliedFilters: {},
  }

  /**
   * Handle refresh action
   */
  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  /**
   * Callback to apply specific filters for Product search
   */
  applyFilters = (filters) => {
    this.setState({ appliedFilters: filters })
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, chain, project, initialFilters,
    } = this.props
    const { appliedFilters } = this.state
    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'acquisition-product.empty.title' })}
        Icon={AddToPhotos}
      />
    )
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.productName', formatMessage({ id: 'acquisition-product.list.productName' }), 'content.productName', 1),
      TableColumnBuilder.buildSimplePropertyColumn('column.lastUpdate', formatMessage({ id: 'acquisition-product.list.lastUpdate' }), 'content.lastUpdate', 2, true, DateValueRender),
      TableColumnBuilder.buildSimplePropertyColumn('column.state', formatMessage({ id: 'acquisition-product.list.state' }), 'content.state', 3, true, ProductStateRender),
      TableColumnBuilder.buildSimplePropertyColumn('column.sipState', formatMessage({ id: 'acquisition-product.list.sipState' }), 'content.sipState', 4, true, ProductSIPStateRender),
      TableColumnBuilder.buildSimpleColumnWithCell('column.session', formatMessage({ id: 'acquisition-product.list.session' }), {
        Constructor: ProductSessionRender,
        props: { project },
      }),
    ]
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'acquisition-product.list.title' }, { chain: get(chain, 'content.label', null) })}
          subtitle={formatMessage({ id: 'acquisition-product.list.subtitle' })}
        />
        <CardText>
          <TableLayout>
            <ProducListFiltersComponent
              initialFilters={initialFilters}
              applyFilters={this.applyFilters}
              handleRefresh={this.handleRefresh}
            />
            <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="acquisition-product-table"
              pageActions={ProductActions}
              pageSelectors={ProductSelectors}
              tableActions={TableProductActions}
              requestParams={appliedFilters}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              displayedRowsCount={10}
              queryPageSize={pageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonTouchTap={onBack}
            mainButtonLabel={formatMessage({ id: 'acquisition-product.list.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(ProductListComponent))
