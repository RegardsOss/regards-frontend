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
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withFiltersPane, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import QUOTA_FILTERS from '../../../domain/QuotaFilters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserQuotaFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,

    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for inputValues edition
   */
  static DEFAULT_FILTERS_STATE = {
    [QUOTA_FILTERS.EMAIL]: '',
    [QUOTA_FILTERS.LASTNAME]: '',
    [QUOTA_FILTERS.FIRSTNAME]: '',
    [QUOTA_FILTERS.USE_QUOTA_LIMITATION]: false,
  }

  render() {
    const {
      updateFilter, inputValues,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: { searchPane: { childrenStyles: { mainDivStyle, lineDivStyle, filterLabelStyle } } },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'projectUser.list.table.email.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.email' })}
            value={inputValues[QUOTA_FILTERS.EMAIL]}
            onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.EMAIL, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'projectUser.list.table.lastname.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
            value={inputValues[QUOTA_FILTERS.LASTNAME]}
            onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.LASTNAME, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'projectUser.list.table.firstname.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
            value={inputValues[QUOTA_FILTERS.FIRSTNAME]}
            onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.FIRSTNAME, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <Checkbox
            checked={!!inputValues[QUOTA_FILTERS.USE_QUOTA_LIMITATION]}
            onCheck={() => updateFilter(!inputValues[QUOTA_FILTERS.USE_QUOTA_LIMITATION], QUOTA_FILTERS.USE_QUOTA_LIMITATION)}
            label={formatMessage({ id: 'projectUser.list.only.low.quota' })}
          />
        </div>
      </div>
    )
  }
}
export default withFiltersPane(ProjectUserQuotaFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserQuotaFiltersComponent)
