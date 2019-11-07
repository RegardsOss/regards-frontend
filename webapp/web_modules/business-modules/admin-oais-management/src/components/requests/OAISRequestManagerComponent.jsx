/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { AIP_STATUS } from '@regardsoss/domain/ingest'
import { aipActions, aipSelectors } from '../../clients/AIPClient'
import messages from '../../i18n'
import styles from '../../styles'
import { aipTableSelectors, aipTableActions } from '../../clients/AIPTableClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISRequestManagerContainer extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    componentFilters: {},
    requestParameters: {},
  }

  componentWillReceiveProps(nextProps) {
    const { featureManagerFilters } = this.state
    if (!isEqual(nextProps.featureManagerFilters, featureManagerFilters)) {
      this.setState({
        requestParameters: {
          ...this.state.requestParameters,
          ...nextProps.featureManagerFilters,
        },
      })
    }
  }

  onApplyFilters = () => {
    const { componentFilters, requestParameters } = this.state

    this.setState({
      componentFilters,
      requestParameters: {
        ...requestParameters,
        ...componentFilters,
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const { componentFilters } = this.state

    this.setState({
      componentFilters: {
        ...componentFilters,
        ...newFilterValue,
      },
    })
  }

  changeStateFilter = (event, index, values) => {
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ type: values })
  }

  render() {
    const { intl, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize } = this.props
    const { componentFilters, requestParameters } = this.state
    const states = AIP_STATUS
    const types = ENTITY_TYPES

    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.state')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .build(),
      new TableColumnBuilder('column.lastUpdate').titleHeaderCell().propertyRenderCell('content.lastUpdate')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .build(),
    ]

    return (
      <div>
        <TableLayout>
          <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
            <TableHeaderOptionGroup key="first">
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.type',
                })}
                value={componentFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(types, type => <MenuItem key={type} value={type} primaryText={type} />)}
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.state',
                })}
                value={componentFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(states, state => <MenuItem key={state} value={state} primaryText={state} />)}
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="apply"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.apply' })}
                icon={<Filter />}
                onClick={this.onApplyFilters}
              />
              <FlatButton
                key="modify"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                icon={<Filter />}
                onClick={this.onApplyFilters}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={aipActions}
            pageSelectors={aipSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={requestParameters}
          />
        </TableLayout>
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISRequestManagerContainer))
