/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import join from 'lodash/join'
import ClearFilter from 'mdi-material-ui/Backspace'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/IconMenu'
import { WorkerDomain, CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableSelectionModes, TableFilterSortingAndVisibilityContainer, DatePickerField,
} from '@regardsoss/components'

/**
 * @author Théo Lasserre
 */
class RequestFiltersComponent extends React.Component {
  static propTypes = {
    // table sorting, column visiblity & filters management
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      updateFilter, clearFilters, filters, updateValuesFilter, updateDatesFilter,
    } = this.props
    const {
      intl: { formatMessage, locale }, moduleTheme: {
        filters: {
          mainDivStyle, dateFilterDiv, dateFilterLabel, fieldMargin,
          fieldMarginAlt,
        },
      },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <div style={dateFilterDiv}>
                <div style={dateFilterLabel}>
                  {formatMessage({ id: 'datapreparation.filters.creationDate.label' })}
                </div>
                <DatePickerField
                  id={`filter.${CommonDomain.REQUEST_PARAMETERS.AFTER}`}
                  dateHintText={formatMessage({ id: 'datapreparation.filters.creationDate.after.label' })}
                  onChange={(value) => updateDatesFilter(value ? value.toISOString() : '', WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
                  locale={locale}
                  value={TableFilterSortingAndVisibilityContainer.getFilterDateValue(filters, WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
                />
                <DatePickerField
                  id={`filter.${WorkerDomain.REQUEST_FILTERS.CREATION_DATE.BEFORE}`}
                  dateHintText={formatMessage({ id: 'datapreparation.filters.creationDate.before.label' })}
                  onChange={(value) => updateDatesFilter(value ? value.toISOString() : '', WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
                  locale={locale}
                  value={TableFilterSortingAndVisibilityContainer.getFilterDateValue(filters, WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
                  defaultTime="23:59:59"
                />
              </div>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <TextField
                floatingLabelText={formatMessage({ id: 'datapreparation.filters.contentTypes.label' })}
                value={join(filters[WorkerDomain.REQUEST_FILTERS.CONTENT_TYPES][CommonDomain.REQUEST_PARAMETERS.VALUES], ',')}
                onChange={(event, value) => updateValuesFilter(value, WorkerDomain.REQUEST_FILTERS.CONTENT_TYPES, TableSelectionModes.INCLUDE, true)}
                style={fieldMargin}
              />
              <TextField
                floatingLabelText={formatMessage({ id: 'datapreparation.filters.workerType.label' })}
                value={filters[WorkerDomain.REQUEST_FILTERS.WORKER_TYPE]}
                onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.WORKER_TYPE, true)}
                style={fieldMargin}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <TextField
                floatingLabelText={formatMessage({ id: 'datapreparation.filters.source.label' })}
                value={filters[WorkerDomain.REQUEST_FILTERS.SOURCE]}
                onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.SOURCE, true)}
                style={fieldMargin}
              />
              <TextField
                floatingLabelText={formatMessage({ id: 'datapreparation.filters.session.label' })}
                value={filters[WorkerDomain.REQUEST_FILTERS.SESSION]}
                onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.SESSION, true)}
                style={fieldMargin}
              />
              <SelectField
                id="datapreparation.filters.status"
                value={filters[WorkerDomain.REQUEST_FILTERS.STATUSES][CommonDomain.REQUEST_PARAMETERS.VALUES]}
                onChange={(event, index, value) => updateValuesFilter(value, WorkerDomain.REQUEST_FILTERS.STATUSES)}
                floatingLabelText={formatMessage({ id: 'datapreparation.filters.status.label.title' })}
                style={fieldMarginAlt}
                multiple
              >
                {map(WorkerDomain.REQUEST_STATUS, (status) => (
                  <MenuItem key={status} value={status} primaryText={status} />
                ))}
              </SelectField>
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </div>
        <IconButton
          title={formatMessage({ id: 'datapreparation.filters.clear' })}
          onClick={clearFilters}
        >
          <ClearFilter />
        </IconButton>
      </div>
    )
  }
}
export default RequestFiltersComponent
