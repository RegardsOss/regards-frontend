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
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import { sessionsActions, sessionsSelectors } from '../clients/SessionsClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'
import { STATUS_TYPES, STATUS_TYPES_ENUM } from '../domain/statusTypes'
import { SESSION_FILTER_PARAMS } from '../domain/filters'

/**
  * SessionsComponent
  * @author Théo Lasserre
  */
class SessionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    onSelected: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    sessions: AdminShapes.SessionList,
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

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sessions.table.empty"
      Icon={AddToPhotos}
    />)

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = SessionsComponent.DEFAULT_FILTERS_STATE
    if (values(query).length > 0) {
      const {
        sessionName, sessionState,
      } = query
      if (sessionName) {
        urlFilters[SESSION_FILTER_PARAMS.NAME] = sessionName
      }
      if (sessionState) {
        urlFilters[SESSION_FILTER_PARAMS.STATUS] = sessionState
      }
    }
    return urlFilters
  }

  state = {
    filters: SessionsComponent.extractFiltersFromURL(),
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
      sessions, onSelected,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.sessions, sessions) && !isEmpty(sessions)) {
      const sessionExist = find(sessions, (session) => session.content.name === newState.filters[SESSION_FILTER_PARAMS.NAME])
      if (sessionExist) {
        onSelected(sessionExist, CELL_TYPE_ENUM.SESSION)
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
    const { onApplyFilters, onSelected, sessions } = this.props
    const { filters } = this.state
    if (filterElement === SESSION_FILTER_PARAMS.NAME) {
      const sessionExist = find(sessions, (session) => session.content.name === newStateValue)
      if (sessionExist) {
        onSelected(sessionExist, CELL_TYPE_ENUM.SESSION)
      }
    }
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue !== STATUS_TYPES_ENUM.ALL ? newStateValue : null,
      },
    }
    onApplyFilters(newState.filters, CELL_TYPE_ENUM.SESSION)
    this.setState(newState)
  }

  render() {
    const {
      project, onSelected, selectedSession,
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
      new TableColumnBuilder('column.sessionName')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.sessionName' }))
        .rowCellDefinition({
          Constructor: NameRender,
          props: {
            onSelected,
            selectedEntity: selectedSession,
            cellType: CELL_TYPE_ENUM.SESSION,
          },
        }).titleHeaderCell()
        .build(),
      // 2 - referenced product
      new TableColumnBuilder('column.referencedProducts')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SESSION },
        }).titleHeaderCell()
        .optionsSizing(2.75)
        .build(),
      // 2 - diffused product
      new TableColumnBuilder('column.diffusedProducts')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SESSION },
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
              name="sources-table"
              minRowCount={minRowCount}
              maxRowCount={!isEmpty(selectedSession) ? minRowCount : maxRowCount}
              pageActions={sessionsActions}
              pageSelectors={sessionsSelectors}
              requestParams={{ ...filters, tenant: project }}
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
