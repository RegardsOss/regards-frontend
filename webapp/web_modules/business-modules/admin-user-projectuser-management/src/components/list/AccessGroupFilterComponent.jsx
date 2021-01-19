/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'

/**
 * Acces group filter selector component
 * @author Raphaël Mechali
 */
class AccessGroupFilterComponent extends React.Component {
  static propTypes = {
    selectedGroup: DataManagementShapes.AccessGroup,
    groups: DataManagementShapes.AccessGroupList.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSelectGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Returns label for a given group (when null, group is NO FILTER)
   * @param {string} group group name or null
   * @return {string} label for group
   */
  getGroupLabel = (group) => group ? group.content.name : this.context.intl.formatMessage({ id: 'projectUser.list.filter.none' })

  /**
   * Returns button label for current value
   * @param {string} group current group value
   * @return {string} button label
   */
  getLabel = (group) => this.context.intl.formatMessage({ id: 'projectUser.list.filter.label' }, { groupFilter: this.getGroupLabel(group) })

  render() {
    const {
      selectedGroup, groups, isLoading, onSelectGroup,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DropDownButton
        value={selectedGroup}
        title={formatMessage({ id: 'projectUser.list.filter.title' })}
        getLabel={this.getLabel}
        disabled={isLoading || isEmpty(groups)}
        onChange={onSelectGroup}
      >
        {/* No filter option */}
        <MenuItem
          key="no.filter"
          primaryText={this.getLabel()}
          value={null}
        />
        { /* { group filter options) */
          map(groups, (group) => (
            <MenuItem
              key={group.content.name}
              primaryText={group.content.name}
              value={group}
            />))
        }
      </DropDownButton>
    )
  }
}
export default AccessGroupFilterComponent
