/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import ToggleFiltersComponent from '../../../../../components/user/results/header/options/ToggleFiltersComponent'

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
    // current results context
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * User callback: toggle filters on / off
   */
  onFiltersToggled = () => {
    const { resultsContext: { type, typeState }, moduleId, updateResultsContext } = this.props
    // create minimal diff with previous state to toggle the filters on / off (requires state enabled AND request parameters)
    const facetsState = typeState[type].facets
    const nextEnabled = !facetsState.enabled
    const stateDiff = {
      typeState: {
        [type]: {
          facets: {
            enabled: nextEnabled,
          },
          criteria: {
            // report requested facets in current request criteria
            requestFacets: nextEnabled ? facetsState.list : [],
          },
        },
      },
    }
    updateResultsContext(moduleId, stateDiff)
  }

  render() {
    const { resultsContext: { type, typeState } } = this.props
    const facetsState = typeState[type].facets
    // when filters are not allowed, auto hide
    return facetsState.allowed ? (
      <ToggleFiltersComponent filtersEnabled={facetsState.enabled} onFiltersToggled={this.onFiltersToggled} />
    ) : null
  }
}
export default connect(null, ToggleFiltersContainer.mapDispatchToProps)(ToggleFiltersContainer)
