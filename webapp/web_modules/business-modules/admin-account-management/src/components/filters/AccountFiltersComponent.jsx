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
import size from 'lodash/size'
import FilterIcon from 'mdi-material-ui/Filter'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { MenuItem } from 'material-ui/IconMenu'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { AdminShapes, AdminInstanceShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityContainer, withFiltersPane,
} from '@regardsoss/components'
import ACCOUNT_FILTERS from '../../domain/AccountFilters'

/**
 * @author Théo Lasserre
 */
class AccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: PropTypes.arrayOf(PropTypes.string),
    projects: AdminShapes.ProjectList.isRequired,
    waitingAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),

    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,

    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [ACCOUNT_FILTERS.EMAIL]: '',
    [ACCOUNT_FILTERS.FIRSTNAME]: '',
    [ACCOUNT_FILTERS.LASTNAME]: '',
    [ACCOUNT_FILTERS.STATUS]: null,
    [ACCOUNT_FILTERS.ORIGIN]: null,
    [ACCOUNT_FILTERS.PROJECTS]: null,
  }

  render() {
    const {
      origins, projects, updateFilter, inputValues, waitingAccounts,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        searchPane: { childrenStyles: { mainDivStyle, lineDivStyle, filterLabelStyle } },
        accounts: { waitingAccountsMessage, filterIconStyle },
      },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div style={{ ...lineDivStyle, justifyContent: 'center' }}>
          <div style={waitingAccountsMessage}>
            {formatMessage({ id: 'account.list.info.nb.waiting.accounts' }, { value: size(waitingAccounts) || 0 })}
          </div>
          <IconButton
            onClick={() => {
              const newValue = inputValues[ACCOUNT_FILTERS.STATUS] !== AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING ? AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING : null
              return updateFilter(newValue, ACCOUNT_FILTERS.STATUS)
            }}
            title={formatMessage({ id: 'account.list.info.nb.waiting.accounts.filter' })}
            style={filterIconStyle}
          >
            <FilterIcon />
          </IconButton>
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.email.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'account.list.table.filters.email' })}
            value={inputValues[ACCOUNT_FILTERS.EMAIL]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.EMAIL, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.firstname.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'account.list.table.filters.firstname' })}
            value={inputValues[ACCOUNT_FILTERS.FIRSTNAME]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.FIRSTNAME, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.lastname.label' })}
          </div>
          <TextField
            hintText={formatMessage({ id: 'account.list.table.filters.lastname' })}
            value={inputValues[ACCOUNT_FILTERS.LASTNAME]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.LASTNAME, true)}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.status.label' })}
          </div>
          <SelectField
            id="account.list.table.filters.status"
            value={inputValues[ACCOUNT_FILTERS.STATUS]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.STATUS)}
            fullWidth
          >
            <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.status.any' })} />
            {map(AdminInstanceDomain.ACCOUNT_STATUS_ENUM, (status) => (
              <MenuItem key={status} value={status} primaryText={formatMessage({ id: `account.list.table.filters.status.${status}` })} />
            ))}
          </SelectField>
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.origin.label' })}
          </div>
          <SelectField
            id="account.list.table.filters.origin"
            value={inputValues[ACCOUNT_FILTERS.ORIGIN]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ORIGIN)}
            fullWidth
          >
            <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.origin.any' })} />
            {map(origins, (origin) => (
              <MenuItem key={origin} value={origin} primaryText={origin} />
            ))}
          </SelectField>
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'account.list.table.filters.projects.label' })}
          </div>
          <SelectField
            id="account.list.table.filters.projects"
            value={inputValues[ACCOUNT_FILTERS.PROJECTS]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.PROJECTS)}
            fullWidth
          >
            <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.projects.any' })} />
            {map(projects, (project) => (
              <MenuItem key={project} value={project.content.name} primaryText={project.content.name} />
            ))}
          </SelectField>
        </div>
      </div>
    )
  }
}
export default withFiltersPane(AccountFiltersComponent.DEFAULT_FILTERS_STATE)(AccountFiltersComponent)
