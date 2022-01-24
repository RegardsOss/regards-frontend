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
import NoMatchingDataIcon from 'mdi-material-ui/FilterRemoveOutline'
import NoExistingDataIcon from 'mdi-material-ui/CogOutline'
import { UIDomain } from '@regardsoss/domain'
import { NoContentComponent } from '@regardsoss/components'

/**
 * No data component for restriction selection table: It adapts to no data case and type
 * @author Raphaël Mechali
 */
class NoRestrictionElementComponent extends React.Component {
  static propTypes = {
    currentRestrictionType: PropTypes.oneOf(UIDomain.DATASET_RESTRICTIONS_TYPES).isRequired,
    allElements: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  }

  render() {
    const { currentRestrictionType, allElements } = this.props
    // Compute the current no data case: does it come for filtering or initial objects pool?
    const isFilterNoData = allElements.length > 0
    let messageKey
    if (currentRestrictionType === UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS) {
      messageKey = isFilterNoData
        ? 'search.results.form.restrictions.configuration.no.dataset.matching.message'
        : 'search.results.form.restrictions.configuration.no.dataset.existing.message'
    } else {
      messageKey = isFilterNoData
        ? 'search.results.form.restrictions.configuration.no.dataset.model.matching.message'
        : 'search.results.form.restrictions.configuration.no.dataset.model.existing.message'
    }

    return (
      <NoContentComponent
        titleKey="search.results.form.restrictions.configuration.no.data.title"
        messageKey={messageKey}
        Icon={isFilterNoData ? NoMatchingDataIcon : NoExistingDataIcon}
      />
    )
  }
}
export default NoRestrictionElementComponent
