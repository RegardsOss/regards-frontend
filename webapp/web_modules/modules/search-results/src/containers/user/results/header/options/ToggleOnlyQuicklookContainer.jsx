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
import { CatalogDomain } from '@regardsoss/domain'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import ToggleOnlyQuicklookComponent from '../../../../../components/user/results/header/options/ToggleOnlyQuicklookComponent'

/**
 * Container to toggle on/off filtering ot elements with quicklook only. It should be mounted only in modes that allow (and enforce)
 * the corresponding criterion (MAP / QUICKLOOK)
 *
 * @author Raphaël Mechali
 */
export class ToggleOnlyQuicklookContainer extends React.Component {
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
   * Criterion to set to get only elements with quicklook
   */
  static ONLY_QUICKLOOK_CRITERION = {
    requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.EXISTS_PARAMETER_NAME]: 'feature.files.QUICKLOOK_SD' },
  }

  /**
   * User callback: toggle filters on / off
   */
  onQuicklookOnlyToggled = () => {
    const { resultsContext: { type, typeState }, moduleId, updateResultsContext } = this.props
    const currentTypeState = typeState[type]
    const stateDiff = {
      typeState: {
        [type]: {
          modeState: {
            [currentTypeState.mode]: {
              criteria: {
                // toggle on off the filter by adding it or removing it in list
                quicklookFiltering: this.isFilteringOnlyQuicklook() ? [] : [ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION],
              },
            },
          },
        },
      },
    }
    updateResultsContext(moduleId, stateDiff)
  }

  /**
   * @return {boolean} true if currently filtering only quicklooks
   */
  isFilteringOnlyQuicklook = () => {
    const { resultsContext: { type, typeState } } = this.props
    const currentTypeState = typeState[type]
    return currentTypeState.modeState[currentTypeState.mode].criteria.quicklookFiltering.includes(ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION)
  }

  render() {
    return <ToggleOnlyQuicklookComponent selected={this.isFilteringOnlyQuicklook()} onToggled={this.onQuicklookOnlyToggled} />
  }
}
export default connect(null, ToggleOnlyQuicklookContainer.mapDispatchToProps)(ToggleOnlyQuicklookContainer)
