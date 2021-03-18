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
import {
  NoContentComponent,
  TableColumnBuilder,
  TableLayout,
  PageableInfiniteTableContainer,
  TableHeaderOptionsArea,
  TableHeaderLine,
  TableHeaderOptionGroup,
} from '@regardsoss/components'
import map from 'lodash/map'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'

const SOURCE_FILTER_PARAMS = {
  NAME: 'name',
  STATUS: 'status',
}

export const SOURCE_STATUS_TYPES = [
  'SUCCESS',
  'FAILURE',
  'CANCELLED',
  'TIMED_OUT',
  'CLEANUP', /// CHECK DANS LE DOMAIN
  'RUNNING',
  'PREPARE',
  'REGISTERED',
]

/**
 * Comment Here
 * @author Théo Lasserre
 */
class SourcesComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSourceSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Default state for filters edition
   */
   static DEFAULT_FILTERS_STATE = {
     [SOURCE_FILTER_PARAMS.NAME]: '',
     [SOURCE_FILTER_PARAMS.STATUS]: SOURCE_STATUS_TYPES,
   }

  static PAGE_SIZE = 100

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="dashboard.sources.table.empty"
      Icon={AddToPhotos}
    />)

    state = {
      filters: SourcesComponent.DEFAULT_FILTERS_STATE,
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
        project,
      } = this.props
      const { filters } = this.state
      const { intl: { formatMessage }, muiTheme } = this.context
      const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
      const columns = [ // eslint wont fix: Major API rework required
      // 1 - source name
        new TableColumnBuilder('column.sourceName')
          .titleHeaderCell()
          .propertyRenderCell('content.sourceName')
          .label(formatMessage({ id: 'dashboard.sources.table.column.sourceName' }))
          .build(),
        // 2 - referenced product
        new TableColumnBuilder('column.referencedProducts')
          .titleHeaderCell()
          .propertyRenderCell('content.referencedProducts')
          .label(formatMessage({ id: 'dashboard.sources.table.column.referencedProducts' }))
          .build(),
        // 2 - diffused product
        new TableColumnBuilder('column.diffusedProducts')
          .titleHeaderCell()
          .propertyRenderCell('content.diffusedProducts')
          .label(formatMessage({ id: 'dashboard.sources.table.column.diffusedProducts' }))
          .build(),
      ]

      return (
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'dashboard.sources.title' })}
          />
          <CardText>
            <TableLayout>
              <TableHeaderLine key="filters">
                <TableHeaderOptionsArea>
                  <TableHeaderOptionGroup>
                    <TextField
                      id="dashboard.sources.filter.name"
                      hintText={formatMessage({ id: 'dashboard.sources.filter.name' })}
                      type="text"
                      fullWidth
                      onChange={(event) => this.updateFilter(event.target.value, SOURCE_FILTER_PARAMS.USERNAME)}
                      value={filters[SOURCE_FILTER_PARAMS.USERNAME]}
                    />
                    <SelectField
                      id="dashboard.sources.filter.status"
                      multiple
                      value={filters[SOURCE_FILTER_PARAMS.STATUS]}
                      floatingLabelText={formatMessage({ id: 'dashboard.sources.filter.status' })}
                      onChange={(event, index, value) => this.updateFilter(value, SOURCE_STATUS_TYPES.STATUS)}
                    >
                      {map(SOURCE_STATUS_TYPES, (status) => (
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
                pageActions={null}
                pageSelectors={null}
                requestParams={{ ...filters, tenant: project }}
                pageSize={SourcesComponent.PAGE_SIZE}
                columns={columns}
                emptyComponent={SourcesComponent.EMPTY_COMPONENT}
              />
            </TableLayout>
          </CardText>
        </Card>
      )
    }
}
export default SourcesComponent
