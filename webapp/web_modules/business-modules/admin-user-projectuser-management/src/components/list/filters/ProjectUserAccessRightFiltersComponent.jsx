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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import {
  withFiltersPane, TableFilterSortingAndVisibilityContainer,
  FiltersPaneMainComponent, FiltersPaneLineComponent,
} from '@regardsoss/components'
import ACCESS_RIGHT_FILTERS from '../../../domain/AccessRightFilters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccessRightFiltersComponent extends React.Component {
  static propTypes = {
    groups: DataManagementShapes.AccessGroupList.isRequired,
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
    [ACCESS_RIGHT_FILTERS.EMAIL]: '',
    [ACCESS_RIGHT_FILTERS.LASTNAME]: '',
    [ACCESS_RIGHT_FILTERS.FIRSTNAME]: '',
    [ACCESS_RIGHT_FILTERS.GROUP]: undefined,
  }

  render() {
    const {
      updateFilter, inputValues, groups,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.email.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.email' })}
            value={inputValues[ACCESS_RIGHT_FILTERS.EMAIL]}
            onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.EMAIL, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.lastname.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
            value={inputValues[ACCESS_RIGHT_FILTERS.LASTNAME]}
            onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.LASTNAME, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.firstname.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
            value={inputValues[ACCESS_RIGHT_FILTERS.FIRSTNAME]}
            onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.FIRSTNAME, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.groups.label' })}
        >
          <SelectField
            id="projectUser.list.table.groups"
            value={inputValues[ACCESS_RIGHT_FILTERS.GROUP]}
            onChange={(event, index, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.GROUP)}
            fullWidth
          >
            <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.groups.label.any' })} />
            {map(groups, (group) => (
              <MenuItem key={group.content.name} value={group.content.name} primaryText={group.content.name} />
            ))}
          </SelectField>
        </FiltersPaneLineComponent>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProjectUserAccessRightFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserAccessRightFiltersComponent)
