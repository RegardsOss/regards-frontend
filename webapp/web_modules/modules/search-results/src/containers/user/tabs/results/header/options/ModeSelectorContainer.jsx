/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import ModeSelectorComponent from '../../../../../../components/user/tabs/results/header/options/ModeSelectorComponent'

/**
 * Container for mode selector (to switch current view mode)
 *
 * @author Raphaël Mechali
 */
export class ModeSelectorContainer extends React.Component {
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
    // mode to select
    mode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Callback: user selected this mode */
  onModeSelected = () => {
    const {
      moduleId, mode, tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType, selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    if (selectedMode !== mode) {
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            types: {
              [selectedType]: {
                selectedMode: mode, // update selected mode within views group
              },
            },
          },
        },
      })
    }
  }

  render() {
    const { mode, tabType, resultsContext } = this.props
    const { selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <ModeSelectorComponent mode={mode} selected={selectedMode === mode} onModeSelected={this.onModeSelected} />
    )
  }
}
export default connect(null, ModeSelectorContainer.mapDispatchToProps)(ModeSelectorContainer)
