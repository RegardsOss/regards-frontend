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
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'
import { AdminClient } from '@regardsoss/client'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { BasicSelector } from '@regardsoss/store-utils'
import { FiltersChipsContainer } from '@regardsoss/components'
import { FILTERS_I18N, FILTER_PARAMS } from '../../domain/filters'

/**
 * @author Théo Lasserre
 */
export class ProjectAccountChipsComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    filtersActions: PropTypes.instanceOf(AdminClient.FiltersActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    roleList: AdminShapes.RoleList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    filtersI18n: FILTERS_I18N,
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
   * Properties change detected: update current options on context change and selected option on list change
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { roleList } = newProps
    const { filtersI18n } = this.state
    let newFiltersI18n = { ...filtersI18n }
    if (!isEqual(roleList, oldProps.roleList) && !isEmpty(roleList)) {
      newFiltersI18n = {
        ...filtersI18n,
        [FILTER_PARAMS.ROLE]: {
          labelKey: 'projectUser.list.table.role.label',
          hintTextKey: 'projectUser.list.table.role.label',
          chipValueKeys: reduce(roleList, (acc, role) => ({
            ...acc,
            [role.content.name]: `projectUser.list.table.role.${role.content.name}`,
          }), {}),
        },
      }
      this.setState({
        filtersI18n: newFiltersI18n,
      })
    }
  }

  render() {
    const { filtersActions, filtersSelectors } = this.props
    const { filtersI18n } = this.state
    return (
      <FiltersChipsContainer
        filtersActions={filtersActions}
        filtersSelectors={filtersSelectors}
        filtersI18n={filtersI18n}
      />
    )
  }
}
export default ProjectAccountChipsComponent
