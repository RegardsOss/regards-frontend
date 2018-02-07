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
import map from 'lodash/map'
import get from 'lodash/get'
import values from 'lodash/values'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField/TextField'
import DatePicker from 'material-ui/DatePicker'
import {
  PageableInfiniteTableContainer,
  TableColumnBuilder,
  TableHeaderLine, TableLayout, TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  NoContentComponent,
  CardActionsComponent,
  DateValueRender,
} from '@regardsoss/components'
import { DataProviderShapes } from '@regardsoss/shape'
import { DataProviderDomain, IngestDomin } from '@regardsoss/domain'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import ProductStateRender from './ProductStateRender'
import ProductSIPStateRender from './ProductSIPStateRender'
import ProductSessionRender from './ProductSessionRender'
import { TableProductActions } from '../../clients/TableClient'
import { ProductActions, ProductSelectors } from '../../clients/ProductClient'
import messages from '../../i18n'
import styles from '../../styles'

/**
* Component to display the list of products of a given acquisition processing chain
* @author Sébastien Binda
*/
class ProductListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    chain: DataProviderShapes.AcquisitionProcessingChain,
    initialFilters: PropTypes.object,
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
    filters: {},
    appliedFilters: {},
  }

  componentWillMount() {
    const { initialFilters } = this.props
    if (initialFilters) {
      let filters = {}
      if (initialFilters.state) {
        filters = {
          ...initialFilters,
          state: initialFilters.state.includes(',') ? initialFilters.state.split(',') : [initialFilters.state],
        }
      } else {
        filters = {
          ...initialFilters,
        }
      }
      this.setState({
        filters,
      })
    }
  }

  componentDidMount() {
    if (values(this.state.filters).length > 0) {
      this.handleFilter()
    }
  }

  changeStateFilter = (event, key, newValues) => {
    if (newValues !== null && newValues.length > 0) {
      this.setState({
        filters: {
          ...this.state.filters,
          state: newValues,
        },
      })
    }
  }

  changeSIPStateFilter = (event, key, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          sipState: newValue,
        },
      })
    }
  }

  changeProductNameFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          productName: newValue,
        },
      })
    }
  }

  changeSessionFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          session: newValue,
        },
      })
    }
  }

  changeFromFilter = (event, newDate) => {
    newDate.setHours(0, 0, 0, 0)
    this.setState({
      filters: {
        ...this.state.filters,
        from: newDate,
      },
    })
  }

  /**
  * Clear all filters
  */
  handleClearFilters = () => {
    this.setState({ filters: {}, appliedFilters: {} })
  }

  /**
   * Callback to apply selected filters
   */
  handleFilter = () => {
    const state = get(this.state.filters, 'state', null)
    const sipState = get(this.state.filters, 'sipState', null)
    const productName = get(this.state.filters, 'productName', null)
    const session = get(this.state.filters, 'session', null)
    const from = get(this.state.filters, 'from', null)
    const filters = {}
    if (state && state.length > 0) {
      filters.state = state.join(',')
    }
    if (sipState) {
      filters.sipState = sipState
    }
    if (productName) {
      filters.productName = productName
    }
    if (session) {
      filters.session = session
    }
    if (from) {
      filters.from = from.toISOString()
    }

    this.setState({
      appliedFilters: filters,
    })
  }

  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  renderActionsLine = () => (
    <TableHeaderLine>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.filters.clear.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.state') &&
              !get(this.state, 'filters.sipState') &&
              !get(this.state, 'filters.productName') &&
              !get(this.state, 'filters.session') &&
              !get(this.state, 'filters.from')
            }
            onTouchTap={this.handleClearFilters}
          />
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.filters.apply.button' })}
            icon={<Filter />}
            onTouchTap={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.refresh.button' })}
            icon={<Refresh />}
            onClick={this.handleRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  renderFilters = () => {
    const { intl: { formatMessage }, moduleTheme: { monitoring: { filters } } } = this.context
    const stateValues = get(this.state, 'filters.state', [])
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SelectField
              multiple
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.state',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              {map(DataProviderDomain.ProductStateValues, state =>
                (<MenuItem
                  value={state}
                  insetChildren
                  checked={stateValues && stateValues.includes(state)}
                  primaryText={formatMessage({
                    id: `acquisition.product.list.filters.state.${state}`,
                  })}
                />),
              )}
            </SelectField>
            <SelectField
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.sipState',
              })}
              value={get(this.state, 'filters.sipState', undefined)}
              onChange={this.changeSIPStateFilter}
            >
              {map(IngestDomin.SIPStateValues, sipState =>
                (<MenuItem
                  value={sipState}
                  primaryText={formatMessage({
                    id: `acquisition.product.list.filters.sipState.${sipState}`,
                  })}
                />),
              )}
            </SelectField>
            <TextField
              hintText={formatMessage({
                id: 'acquisition-product.list.filters.productName',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.productName', '')}
              onChange={this.changeProductNameFilter}
            />
            <TextField
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.session',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.session', '')}
              onChange={this.changeSessionFilter}
            />
            <DatePicker
              value={get(this.state, 'filters.from', undefined)}
              textFieldStyle={filters.dateStyle}
              hintText={formatMessage({ id: 'acquisition.product.list.filters.from' })}
              onChange={this.changeFromFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, chain, project,
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
      TableColumnBuilder.buildSimplePropertyColumn('column.session', formatMessage({ id: 'acquisition-product.list.session' }), 'content.session', 5),
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
            {this.renderFilters()}
            {this.renderActionsLine()}
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
