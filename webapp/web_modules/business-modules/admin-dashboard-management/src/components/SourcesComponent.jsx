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
import values from 'lodash/values'
import find from 'lodash/find'
import { browserHistory } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import {
  NoContentComponent,
  TableColumnBuilder,
  TableLayout,
  PageableInfiniteTableContainer,
  TableHeaderOptionsArea,
  TableHeaderLine,
  TableHeaderOptionGroup,
  TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import map from 'lodash/map'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { sourcesActions, sourcesSelectors } from '../clients/SourcesClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'
import { STATUS_TYPES, STATUS_TYPES_ENUM } from '../domain/statusTypes'
import { SOURCE_FILTER_PARAMS } from '../domain/filters'
/**
 * SourcesComponent
 * @author Théo Lasserre
 */
class SourcesComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSource: AdminShapes.Source,
    onSelected: PropTypes.func.isRequired,
    selectedSession: AdminShapes.Session,
    onApplyFilters: PropTypes.func.isRequired,
    sources: AdminShapes.SourceList,
  }

  static contextTypes = {
    ...i18nContextType, // relancer les erreurs => endpoint retry avec payload filters : { source & session }
    ...themeContextType, // relancer les erreurs -> Acquisition (DP -> FEM (requete d'extraction)). Référecement (soit Ingest soit FEM (toute les autres))
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [SOURCE_FILTER_PARAMS.NAME]: '',
    [SOURCE_FILTER_PARAMS.STATUS]: STATUS_TYPES_ENUM.ALL,
  }

  static COLUMN_KEYS = {
    SOURCE_NAME: 'sourceName',
    REFERENCED_PRODUCTS: 'referencedProducts',
    DIFFUSED_PRODUCTS: 'diffusedProducts',
    ACTIONS: 'actions',
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sources.table.empty"
      Icon={AddToPhotos}
    />)

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = SourcesComponent.DEFAULT_FILTERS_STATE
    if (values(query).length > 0) {
      const {
        sourceName, sourceState,
      } = query
      if (sourceName) {
        urlFilters[SOURCE_FILTER_PARAMS.NAME] = sourceName
      }
      if (sourceState) {
        urlFilters[SOURCE_FILTER_PARAMS.STATUS] = sourceState
      }
    }
    return urlFilters
  }

  state = {
    filters: SourcesComponent.extractFiltersFromURL(),
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
* Properties change detected: update local state
* @param oldProps previous component properties
* @param newProps next component properties
*/
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      sources, onSelected,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.sources, sources) && !isEmpty(sources)) {
      const sourceExist = find(sources, (source) => source.content.name === newState.filters[SOURCE_FILTER_PARAMS.NAME])
      if (sourceExist) {
        onSelected(sourceExist, CELL_TYPE_ENUM.SOURCE)
      }
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
 * Update filters
 * @param {*} newStateValue
 * @param {*} filterElement
 */
  updateFilter = (newStateValue, filterElement) => {
    const { onApplyFilters, sources, onSelected } = this.props
    const { filters } = this.state
    if (filterElement === SOURCE_FILTER_PARAMS.NAME) {
      const sourceExist = find(sources, (source) => source.content.name === newStateValue)
      if (sourceExist) {
        onSelected(sourceExist, CELL_TYPE_ENUM.SOURCE)
      }
    }
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue !== STATUS_TYPES_ENUM.ALL ? newStateValue : null,
      },
    }
    onApplyFilters(newState.filters, CELL_TYPE_ENUM.SOURCE)
    this.setState(newState)
  }

  render() {
    const {
      project, onSelected, selectedSource, selectedSession,
    } = this.props
    const { filters } = this.state
    const {
      intl: { formatMessage }, muiTheme, moduleTheme: {
        dashboardStyle: {
          componentDiv: {
            cardStyle, cardTextStyle, headerOptionDivStyle,
            cardTitleStyle, autoCompleteStyle, selectFieldStyle,
          },
        },
      },
    } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - source name
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.SOURCE_NAME)
        .label(formatMessage({ id: 'dashboard.sources.table.column.sourceName' }))
        .rowCellDefinition({
          Constructor: NameRender,
          props: {
            onSelected,
            selectedEntity: selectedSource,
            cellType: CELL_TYPE_ENUM.SOURCE,
          },
        }).titleHeaderCell()
        .build(),
      // 2 - referenced product
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.REFERENCED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sources.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SOURCE },
        }).titleHeaderCell()
        .optionsSizing(2.75)
        .build(),
      // 2 - diffused product
      new TableColumnBuilder(SourcesComponent.COLUMN_KEYS.DIFFUSED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sources.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SOURCE },
        }).titleHeaderCell()
        .optionsSizing(2.5)
        .build(),
    ]

    return (
      <Card style={cardStyle}>
        <CardText style={cardTextStyle}>
          <TableLayout>
            <TableHeaderLine key="filters">
              <TableHeaderOptionsArea reducible alignLeft>
                <TableHeaderOptionGroup>
                  <div style={headerOptionDivStyle}>
                    <CardTitle
                      title={formatMessage({ id: 'dashboard.sources.title' })}
                      style={cardTitleStyle}
                    />
                    <TableHeaderAutoCompleteFilterContainer
                      onChangeText={(value) => this.updateFilter(value, SOURCE_FILTER_PARAMS.NAME)}
                      text={filters[SOURCE_FILTER_PARAMS.NAME]}
                      hintText={formatMessage({ id: 'dashboard.sources.filter.name' })}
                      key="sourceAuto"
                      arrayActions={searchSourcesActions}
                      arraySelectors={searchSourcesSelectors}
                      style={autoCompleteStyle}
                    />
                    <div>
                      <SelectField
                        id="dashboard.sources.filter.status"
                        value={filters[SOURCE_FILTER_PARAMS.STATUS]}
                        hintText={formatMessage({ id: 'dashboard.sources.filter.status' })}
                        onChange={(event, index, value) => this.updateFilter(value, SOURCE_FILTER_PARAMS.STATUS)}
                        style={selectFieldStyle}
                      >
                        {map(STATUS_TYPES, (status) => (
                          <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.sources.filter.status.${status}` })} />
                        ))}
                      </SelectField>
                    </div>
                  </div>
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              key="source"
              name="sources-table"
              minRowCount={minRowCount}
              maxRowCount={!isEmpty(selectedSession) ? minRowCount : maxRowCount}
              pageActions={sourcesActions}
              pageSelectors={sourcesSelectors}
              requestParams={{ ...filters, tenant: project }}
              pageSize={SourcesComponent.PAGE_SIZE}
              columns={columns}
              emptyComponent={SourcesComponent.EMPTY_COMPONENT}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </TableLayout>
        </CardText>
      </Card>
    )
  }
}
export default SourcesComponent
