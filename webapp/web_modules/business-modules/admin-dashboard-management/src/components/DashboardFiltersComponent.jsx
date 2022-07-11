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
import map from 'lodash/map'
import get from 'lodash/get'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableHeaderAutoCompleteFilterContainer,
  Title,
  withFiltersPane,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import { STATUS_TYPES, STATUS_TYPES_ENUM } from '../domain/statusTypes'
import { SOURCE_FILTER_PARAMS, SESSION_FILTER_PARAMS } from '../domain/filters'

/**
 * @author Théo Lasserre
 */
class DashboardFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    // eslint-disable-next-line react/no-unused-prop-types
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,

    // eslint-disable-next-line react/no-unused-prop-types
    updateRequestParameters: PropTypes.func.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [SOURCE_FILTER_PARAMS.NAME]: '',
    [SOURCE_FILTER_PARAMS.STATUS]: '',
    [SESSION_FILTER_PARAMS.NAME]: '',
    [SESSION_FILTER_PARAMS.STATUS]: '',
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
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
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (oldProps.requestParameters !== newProps.requestParameters) {
      newProps.updateRequestParameters(newProps.requestParameters)
    }
  }

  render() {
    const {
      updateFilter, inputValues,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: { searchPane: { childrenStyles: { mainDivStyle, lineDivStyle, filterLabelStyle } } },
    } = this.context
    return (
      <div>
        <div style={mainDivStyle}>
          <Title
            level={3}
            label={formatMessage({ id: 'dashboard.sources.title' })}
          />
          <div style={lineDivStyle}>
            <div style={filterLabelStyle}>
              {formatMessage({ id: 'dashboard.filter.name.label' })}
            </div>
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={(value) => updateFilter(value, SOURCE_FILTER_PARAMS.NAME)}
              text={get(inputValues, `${SOURCE_FILTER_PARAMS.NAME}`, '')}
              hintText={formatMessage({ id: 'dashboard.filter.name' })}
              key="sourceAuto"
              arrayActions={searchSourcesActions}
              arraySelectors={searchSourcesSelectors}
              fullWidth
            />
          </div>
          <div style={lineDivStyle}>
            <div style={filterLabelStyle}>
              {formatMessage({ id: 'dashboard.filter.status.label' })}
            </div>
            <SelectField
              id="dashboard.sources.filter.status"
              value={get(inputValues, `${SOURCE_FILTER_PARAMS.STATUS}`, STATUS_TYPES_ENUM.ALL)}
              hintText={formatMessage({ id: 'dashboard.filter.status' })}
              onChange={(event, index, value) => updateFilter(value, SOURCE_FILTER_PARAMS.STATUS)}
              fullWidth
            >
              {map(STATUS_TYPES, (status) => (
                <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.filter.status.${status}` })} />
              ))}
            </SelectField>
          </div>
        </div>
        <div style={mainDivStyle}>
          <Title
            level={3}
            label={formatMessage({ id: 'dashboard.sessions.title' })}
          />
          <div style={lineDivStyle}>
            <div style={filterLabelStyle}>
              {formatMessage({ id: 'dashboard.filter.name.label' })}
            </div>
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={(value) => updateFilter(value, SESSION_FILTER_PARAMS.NAME)}
              text={get(inputValues, `${SESSION_FILTER_PARAMS.NAME}`, '')}
              hintText={formatMessage({ id: 'dashboard.filter.name' })}
              key="sessionAuto"
              arrayActions={searchSessionsActions}
              arraySelectors={searchSessionsSelectors}
              fullWidth
            />
          </div>
          <div style={lineDivStyle}>
            <div style={filterLabelStyle}>
              {formatMessage({ id: 'dashboard.filter.status.label' })}
            </div>
            <SelectField
              id="dashboard.sources.filter.status"
              value={get(inputValues, `${SESSION_FILTER_PARAMS.STATUS}`, STATUS_TYPES_ENUM.ALL)}
              hintText={formatMessage({ id: 'dashboard.filter.status' })}
              onChange={(event, index, value) => updateFilter(value, SESSION_FILTER_PARAMS.STATUS)}
              fullWidth
            >
              {map(STATUS_TYPES, (status) => (
                <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.filter.status.${status}` })} />
              ))}
            </SelectField>
          </div>
        </div>
      </div>)
  }
}

export default withFiltersPane(DashboardFiltersComponent.DEFAULT_FILTERS_STATE)(DashboardFiltersComponent)
