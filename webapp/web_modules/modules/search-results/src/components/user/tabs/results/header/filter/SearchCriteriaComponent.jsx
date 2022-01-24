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
import SearchIcon from 'mdi-material-ui/Magnify'
import { i18nContextType } from '@regardsoss/i18n'
import ApplyingCriterionComponent from './ApplyingCriterionComponent'

/**
 * Displays feedback when user has made a search, from search pane
 *
 * @author Raphaël Mechali
 */
class SearchCriteriaComponent extends React.Component {
  static propTypes = {
    onUnselectSearchCriteria: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Icon for selected geometry criterion */
  static ICON = <SearchIcon />

  render() {
    const { onUnselectSearchCriteria } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <ApplyingCriterionComponent
        label={formatMessage({ id: 'search.filter.search.criteria.label' })}
        onUnselectCriterion={onUnselectSearchCriteria}
        filterIcon={SearchCriteriaComponent.ICON}
      />
    )
  }
}
export default SearchCriteriaComponent
