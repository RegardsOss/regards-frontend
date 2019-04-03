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
import isEqual from 'lodash/isEqual'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import EditColumnsSettingsComponent from '../../../../../components/user/results/header/options/columns/EditColumnsSettingsComponent'

/**
 * Container to edit table column settings. It must only be mounted in view modes with initialPresentationModels field (Table only so far)
 *
 * @author Raphaël Mechali
 */
export class EditColumnsSettingsContainer extends React.Component {
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
   * User applied new presentation models settings (or caller internally by onReset)
   * @param {[*]} presentation models as edited by the user
   * @param {boolean} resetSorting should reset to initial sorting state?
   */
  onApply = (presentationModels, resetSorting = false) => {
    const { resultsContext: { type, typeState }, moduleId, updateResultsContext } = this.props
    const currentTypeState = typeState[type]
    // A - compute sorting differences (remove sorting on hidden presentation models)
    const { isInInitialSorting, initialSorting, criteria: { sorting } } = currentTypeState
    let updatedSorting = sorting
    if (!isInInitialSorting) {
      // update only when not in initial sorting state (initial sorting may use hidden attributes )
      updatedSorting = sorting.reduce((acc, sortingCrit) => {
        // was that model hidden? Nota: sorting is allowed only on single attribute presentation models, but there may be
        // other types here (like selection / option / multi attributes...)
        const correspondingPresentationModel = presentationModels.find(({ attributes }) => attributes && isEqual(attributes[0], sortingCrit.attribute))
        // remove sorting when presentation model was found and is no longer visible
        return correspondingPresentationModel && !correspondingPresentationModel.visible ? acc : [...acc, sortingCrit]
      }, [])
    }
    // B - check if initial sorting should be restored (no more custom sorting)
    const nextIsInitialSorting = resetSorting || !updatedSorting.length
    const nextSorting = updatedSorting.length ? updatedSorting : initialSorting

    // C - compute differences to apply
    const stateDiff = {
      typeState: {
        [type]: {
          // update sorting
          isInInitialSorting: nextIsInitialSorting,
          criteria: {
            sorting: nextSorting,
          },
          // update presentation models
          modeState: {
            [currentTypeState.mode]: {
              presentationModels,
            },
          },
        },
      },
    }
    updateResultsContext(moduleId, stateDiff)
  }

  /**
   * User reset presentation models to initial settings
   */
  onReset = () => {
    const { resultsContext: { type, typeState } } = this.props
    const currentTypeState = typeState[type]
    this.onApply(currentTypeState.modeState[currentTypeState.mode].initialPresentationModels, true)
  }

  render() {
    const { resultsContext: { type, typeState } } = this.props
    const currentTypeState = typeState[type]
    const { presentationModels } = currentTypeState.modeState[currentTypeState.mode]
    return <EditColumnsSettingsComponent
      presentationModels={presentationModels}
      onApply={this.onApply}
      onReset={this.onReset}
    />
  }
}
export default connect(null, EditColumnsSettingsContainer.mapDispatchToProps)(EditColumnsSettingsContainer)
