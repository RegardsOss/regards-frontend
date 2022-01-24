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
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import ToggleFiltersComponent from '../../../../../../components/user/tabs/results/header/options/ToggleFiltersComponent'

/**
 * Container for filters enabling option. Hides when user cannot access filters functionnality in current state
 * @author Raphaël Mechali
 */
export class ToggleFiltersContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      updateResultsContext: (moduleId, newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * User callback: toggle filters on / off
   */
  onFiltersToggled = () => {
    const {
      moduleId, resultsContext, tabType, updateResultsContext,
    } = this.props
    const { tab: { facets } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // create minimal diff with previous state to toggle the filters on / off (requires state enabled AND request parameters)
    const nextEnabled = !facets.enabled
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          facets: {
            enabled: nextEnabled,
          },
          criteria: {
            requestFacets: nextEnabled ? facets.list : [],
          },
        },
      },
    })
  }

  render() {
    const { resultsContext, tabType } = this.props
    const { tab: { facets }, selectedTypeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    // when filters are not allowed, auto hide
    return selectedTypeState.facetsAllowed ? (
      <ToggleFiltersComponent filtersEnabled={facets.enabled} onFiltersToggled={this.onFiltersToggled} />
    ) : null
  }
}
export default connect(null, ToggleFiltersContainer.mapDispatchToProps)(ToggleFiltersContainer)
