/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import ToggleOnlyQuicklookComponent from '../../../../../../components/user/tabs/results/header/options/ToggleOnlyQuicklookComponent'

/**
 * Container to toggle on/off filtering ot elements with quicklook only (or thumbnail).
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
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * Criterion to set to get only elements with quicklook
   */
  static ONLY_QUICKLOOK_CRITERION = {
    requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.HAS_IMAGE_PARAMETER_NAME]: 'true' },
  }

  /**
   * User callback: toggle filters on / off
   */
  onQuicklookOnlyToggled = () => {
    const { moduleId, tabType, updateResultsContext } = this.props
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          criteria: {
            quicklookFiltering: this.isFilteringOnlyQuicklook() ? [] : [ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION],
          },
        },
      },
    })
  }

  /**
   * @return {boolean} true if currently filtering only quicklooks
   */
  isFilteringOnlyQuicklook = () => {
    const { tabType, resultsContext } = this.props
    const { tab } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return tab.criteria.quicklookFiltering.includes(ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION)
  }

  render() {
    return <ToggleOnlyQuicklookComponent selected={this.isFilteringOnlyQuicklook()} onToggled={this.onQuicklookOnlyToggled} />
  }
}
export default connect(null, ToggleOnlyQuicklookContainer.mapDispatchToProps)(ToggleOnlyQuicklookContainer)
