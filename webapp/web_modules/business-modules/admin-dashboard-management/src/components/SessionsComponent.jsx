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
import { sessionsActions, sessionsSelectors } from '../clients/SessionsClient'
import ReferencedProductsRender from './render/ReferencedProductsRender'
import DiffusedProductsRender from './render/DiffusedProductsRender'
import NameRender from './render/NameRender'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'
import { STATUS_TYPES } from '../domain/statusTypes'
import SelectOption from './option/SelectOption'

const SESSION_FILTER_PARAMS = {
  NAME: 'name',
  STATUS: 'status',
}

/**
  * SessionsComponent
  * @author Théo Lasserre
  */
class SessionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    onSessionSelected: PropTypes.func.isRequired,
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
    [SESSION_FILTER_PARAMS.STATUS]: '',
  }

  static PAGE_SIZE = 20

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sessions.table.empty"
      Icon={AddToPhotos}
    />)

  state = {
    filters: SessionsComponent.DEFAULT_FILTERS_STATE,
  }

  /**
 * Update filters
 * @param {*} newStateValue
 * @param {*} filterElement
 */
  updateFilter(newStateValue, filterElement) {
    const { filters } = this.state
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue,
      },
    }
    this.setState(newState)
  }

  render() {
    const {
      project, onSessionSelected, selectedSession,
    } = this.props
    const { filters } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - source name
      new TableColumnBuilder('column.sessionName')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.sessionName' }))
        .rowCellDefinition({
          Constructor: NameRender,
        }).titleHeaderCell()
        .optionsSizing(6)
        .build(),
      // 2 - referenced product
      new TableColumnBuilder('column.referencedProducts')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.referencedProducts' }))
        .rowCellDefinition({
          Constructor: ReferencedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SESSION },
        }).titleHeaderCell()
        .optionsSizing(3.83)
        .build(),
      // 2 - diffused product
      new TableColumnBuilder('column.diffusedProducts')
        .label(formatMessage({ id: 'dashboard.sessions.table.column.diffusedProducts' }))
        .rowCellDefinition({
          Constructor: DiffusedProductsRender,
          props: { cellType: CELL_TYPE_ENUM.SESSION },
        }).titleHeaderCell()
        .optionsSizing(3.83)
        .build(),
      // 3 - select source option
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: SelectOption,
        optionProps: {
          onEntitySelected: onSessionSelected,
          selectedEntity: selectedSession,
          cellType: CELL_TYPE_ENUM.SESSION,
        },
      }]).build(),
    ]

    return (
      <Card style={{ width: '50%' }}>
        <CardText>
          <TableLayout>
            <TableHeaderLine key="filters">
              <CardTitle
                title={this.context.intl.formatMessage({ id: 'dashboard.sessions.title' })}
              />
              <TableHeaderOptionsArea>
                <TableHeaderOptionGroup>
                  <TableHeaderAutoCompleteFilterContainer
                    onChangeText={(event, index, value) => this.updateFilter(value, SESSION_FILTER_PARAMS.NAME)}
                    text={filters[SESSION_FILTER_PARAMS.NAME] || ''}
                    hintText={formatMessage({ id: 'dashboard.sessions.filter.name' })}
                    key="sourceAuto"
                    arrayActions={searchSourcesActions}
                    arraySelectors={searchSourcesSelectors}
                    style={{ marginRight: '10px' }}
                  />
                  <SelectField
                    id="dashboard.sources.filter.status"
                    multiple
                    value={filters[SESSION_FILTER_PARAMS.STATUS]}
                    floatingLabelText={formatMessage({ id: 'dashboard.sessions.filter.status' })}
                    onChange={(event, index, value) => this.updateFilter(value, STATUS_TYPES.STATUS)}
                  >
                    {map(STATUS_TYPES, (status) => (
                      <MenuItem key={status} value={status} primaryText={status} />
                    ))}
                  </SelectField>
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <PageableInfiniteTableContainer
              name="sources-table"
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
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
