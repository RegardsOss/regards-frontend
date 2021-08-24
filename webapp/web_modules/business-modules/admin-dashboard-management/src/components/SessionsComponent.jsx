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
import throttle from 'lodash/throttle'
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
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import { sessionsActions, sessionsSelectors } from '../clients/SessionsClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'
import { ENTITY_ENUM } from '../domain/entityTypes'
import { STATUS_TYPES, STATUS_TYPES_ENUM } from '../domain/statusTypes'
import { SOURCE_FILTER_PARAMS, SESSION_FILTER_PARAMS } from '../domain/filters'

/**
  * SessionsComponent
  * @author Théo Lasserre
  */
class SessionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    sessions: AdminShapes.SessionList,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object.isRequired,
    selectedSourceId: PropTypes.string,
    selectedSessionId: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [SESSION_FILTER_PARAMS.NAME]: '',
    [SESSION_FILTER_PARAMS.STATUS]: STATUS_TYPES_ENUM.ALL,
  }

  static COLUMN_KEYS = {
    SESSION_NAME: 'sessionName',
    REFERENCED_PRODUCTS: 'referencedProducts',
    DIFFUSED_PRODUCTS: 'diffusedProducts',
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sessions.table.empty"
      Icon={AddToPhotos}
    />)

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  applySessionFilters = throttle((filters) => {
    this.setState({ sessionFilters: filters })
  }, 1000, { leading: true })

  // we use two filters variables.
  // filters (in props) is used to update directly field values
  // sessionFilters is used to update table values with a delay. Prevent multiple network call
  state = {
    sessionFilters: SessionsComponent.DEFAULT_FILTERS_STATE,
  }

  /**
   * Update filters
   * @param {*} newStateValue
   * @param {*} filterElement
   */
  updateFilter = (newStateValue, filterElement) => {
    const {
      onApplyFilters, filters,
    } = this.props
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue,
      },
    }
    if (!isEqual(newState.filters, filters)) {
      onApplyFilters(newState.filters, ENTITY_ENUM.SESSION)
      this.applySessionFilters(newState.filters)
      this.setState(newState)
    }
  }

  render() {
    const {
      project, onSelected, filters, selectedSourceId, selectedSessionId,
    } = this.props
    const { sessionFilters } = this.state
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
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.SESSION_NAME)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.sessionName' }))
        .rowCellDefinition({
          Constructor: NameRender,
          props: {
            onSelected,
            selectedEntityId: selectedSessionId,
            entityType: ENTITY_ENUM.SESSION,
          },
        }).titleHeaderCell()
        .build(),
      // 2 - referenced product
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.REFERENCED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { entityType: ENTITY_ENUM.SESSION },
        }).titleHeaderCell()
        .optionsSizing(2.75)
        .build(),
      // 2 - diffused product
      new TableColumnBuilder(SessionsComponent.COLUMN_KEYS.DIFFUSED_PRODUCTS)
        .label(formatMessage({ id: 'dashboard.sessions.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { entityType: ENTITY_ENUM.SESSION },
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
                      title={formatMessage({ id: 'dashboard.sessions.title' })}
                      style={cardTitleStyle}
                    />
                    <TableHeaderAutoCompleteFilterContainer
                      onChangeText={(value) => this.updateFilter(value, SESSION_FILTER_PARAMS.NAME)}
                      text={filters[SESSION_FILTER_PARAMS.NAME]}
                      hintText={formatMessage({ id: 'dashboard.sessions.filter.name' })}
                      key="sessionAuto"
                      arrayActions={searchSessionsActions}
                      arraySelectors={searchSessionsSelectors}
                      style={autoCompleteStyle}
                    />
                    <SelectField
                      id="dashboard.sources.filter.status"
                      value={filters[SESSION_FILTER_PARAMS.STATUS]}
                      hintText={formatMessage({ id: 'dashboard.sessions.filter.status' })}
                      onChange={(event, index, value) => this.updateFilter(value, SESSION_FILTER_PARAMS.STATUS)}
                      style={selectFieldStyle}
                    >
                      {map(STATUS_TYPES, (status) => (
                        <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.sources.filter.status.${status}` })} />
                      ))}
                    </SelectField>
                  </div>
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="sessions-table"
              minRowCount={minRowCount}
              maxRowCount={!isEmpty(selectedSessionId) ? minRowCount : maxRowCount}
              pageActions={sessionsActions}
              pageSelectors={sessionsSelectors}
              requestParams={{ ...sessionFilters, [SOURCE_FILTER_PARAMS.NAME]: selectedSourceId || null, tenant: project }}
              pageSize={SessionsComponent.PAGE_SIZE}
              columns={columns}
              emptyComponent={SessionsComponent.EMPTY_COMPONENT}
            />
          </TableLayout>
        </CardText>
      </Card>
    )
  }
}
export default SessionsComponent
