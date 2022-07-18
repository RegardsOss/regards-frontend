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
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { MenuItem } from 'material-ui/IconMenu'
import { WorkerDomain, CommonDomain, UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableSelectionModes, TableFilterSortingAndVisibilityContainer, DatePickerField, withFiltersPane,
} from '@regardsoss/components'

/**
 * @author Théo Lasserre
 */
class RequestFiltersComponent extends React.Component {
  static propTypes = {
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,

    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [WorkerDomain.REQUEST_FILTERS.SOURCE]: '',
    [WorkerDomain.REQUEST_FILTERS.SESSION]: '',
    [WorkerDomain.REQUEST_FILTERS.WORKER_TYPE]: '',
    [WorkerDomain.REQUEST_FILTERS.CONTENT_TYPES]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [WorkerDomain.REQUEST_FILTERS.STATUSES]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [WorkerDomain.REQUEST_FILTERS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
  }

  render() {
    const {
      updateFilter, inputValues, updateDatesFilter, updateValuesFilter,
    } = this.props
    const {
      intl: { locale, formatMessage }, moduleTheme: {
        searchPane: {
          childrenStyles: {
            mainDivStyle, lineDivStyle, filterLabelStyle,
          },
        },
      },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.creationDate.label' })}
          </div>
          <DatePickerField
            id={`filter.${CommonDomain.REQUEST_PARAMETERS.AFTER}`}
            dateHintText={formatMessage({ id: 'datapreparation.filters.creationDate.after.label' })}
            onChange={(value) => updateDatesFilter(value.toISOString(), WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
            locale={locale}
            value={UIDomain.FiltersPaneHelper.getFilterDateValue(inputValues, WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
            fullWidth
          />
          <DatePickerField
            id={`filter.${WorkerDomain.REQUEST_FILTERS.CREATION_DATE.BEFORE}`}
            dateHintText={formatMessage({ id: 'datapreparation.filters.creationDate.before.label' })}
            onChange={(value) => updateDatesFilter(value.toISOString(), WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
            locale={locale}
            value={UIDomain.FiltersPaneHelper.getFilterDateValue(inputValues, WorkerDomain.REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
            defaultTime="23:59:59"
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.contentTypes.label.title' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'datapreparation.filters.contentTypes.label' })}
            value={join(inputValues[WorkerDomain.REQUEST_FILTERS.CONTENT_TYPES][CommonDomain.REQUEST_PARAMETERS.VALUES], ',')}
            onChange={(event, value) => updateValuesFilter(value, WorkerDomain.REQUEST_FILTERS.CONTENT_TYPES, TableSelectionModes.INCLUDE, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.workerType.label.title' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'datapreparation.filters.workerType.label' })}
            value={inputValues[WorkerDomain.REQUEST_FILTERS.WORKER_TYPE]}
            onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.WORKER_TYPE, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.source.label.title' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'datapreparation.filters.source.label' })}
            value={inputValues[WorkerDomain.REQUEST_FILTERS.SOURCE]}
            onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.SOURCE, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.session.label.title' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'datapreparation.filters.session.label' })}
            value={inputValues[WorkerDomain.REQUEST_FILTERS.SESSION]}
            onChange={(event, value) => updateFilter(value, WorkerDomain.REQUEST_FILTERS.SESSION, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'datapreparation.filters.status.label.title' })}
          </div>
          <SelectField
            id="datapreparation.filters.status"
            value={inputValues[WorkerDomain.REQUEST_FILTERS.STATUSES][CommonDomain.REQUEST_PARAMETERS.VALUES]}
            onChange={(event, index, value) => updateValuesFilter(value, WorkerDomain.REQUEST_FILTERS.STATUSES)}
            hintText={formatMessage({ id: 'datapreparation.filters.status.label' })}
            multiple
            fullWidth
          >
            {map(WorkerDomain.REQUEST_STATUS, (status) => (
              <MenuItem key={status} value={status} primaryText={status} />
            ))}
          </SelectField>
        </div>
      </div>
    )
  }
}
export default withFiltersPane(RequestFiltersComponent.DEFAULT_FILTERS_STATE)(RequestFiltersComponent)
