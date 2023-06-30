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

import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import ActionsGroupComponent from '../../../../../components/user/tabs/results/header/ActionsGroupComponent'

/**
 * Container for user actions (column and sorting management)
 * @author Théo Lasserre
 */
export class ActionsGroupContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { moduleId }) {
    return {
      updateResultsContext: (newState) => dispatch(resultsContextActions.updateResultsContext(moduleId, newState)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    moduleId: PropTypes.number.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    selectedMode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  state = {
    sortableAttributes: {},
  }

  /**
   * Lifecycle method component will mount, used here to update state from properties
   */
  UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method component will receive props, used here to update state from properties
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties change detected: updated state properties that are computed from props (save some render time)
   * @param {*} oldProps old component properties
   * @param {*} newProps new component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const { resultsContext, tabType } = newProps
    const newState = {
      sortableAttributes: UIDomain.ResultsContextHelper.getSortableAttributes(resultsContext, tabType),
    }
    // update when there is a difference (avoid columns visibility and such updates)
    if (!isEqual(this.state.sortableAttributes, newState.sortableAttributes)) {
      this.setState(newState)
    }
  }

  /**
   * On user updates its sorting model
   */
  onApplySorting = (sortingCriteria) => {
    // update current type state sorting criteria
    const {
      resultsContext, tabType, updateResultsContext,
    } = this.props
    const { selectedType, selectedTypeState: { initialSorting } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    updateResultsContext({
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: {
              isInInitialSorting: isEqual(initialSorting, sortingCriteria),
              criteria: {
                sorting: sortingCriteria,
              },
            },
          },
        },
      },
    })
  }

  /**
   * User applied new presentation models settings (or caller internally by onReset)
   * @param {[*]} presentation models as edited by the user
   * @param {boolean} resetSorting should reset to initial sorting state?
   */
  onApplyPresentationModels = (presentationModels, resetSorting = false) => {
    const {
      resultsContext, tabType, updateResultsContext,
    } = this.props
    const { selectedType, selectedTypeState, selectedMode } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    // A - compute sorting differences (remove sorting on hidden presentation models)
    const { isInInitialSorting, initialSorting, criteria: { sorting } } = selectedTypeState
    let updatedSorting = sorting
    if (!isInInitialSorting) {
      // update only when not in initial sorting state (initial sorting may use hidden attributes )
      updatedSorting = sorting.reduce((acc, sortingCrit) => {
        // was that model hidden? Nota: sorting is allowed only on single attribute presentation models, but there may be
        // other types here (like selection / option / multi attributes...)
        const correspondingPresentationModel = presentationModels.find(({ attributes }) => attributes
          && isEqual(attributes[0].model, sortingCrit.attribute))
        // remove sorting when presentation model was found and is no longer visible
        return correspondingPresentationModel && !correspondingPresentationModel.visible ? acc : [...acc, sortingCrit]
      }, [])
    }
    // B - check if initial sorting should be restored (no more custom sorting)
    const nextIsInitialSorting = resetSorting || !updatedSorting.length
    const nextSorting = updatedSorting.length ? updatedSorting : initialSorting

    // C - Apply differences to results context
    updateResultsContext({
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: { // update sorting
              isInInitialSorting: nextIsInitialSorting,
              criteria: {
                sorting: nextSorting,
              },
              modes: { // update presentation models
                [selectedMode]: { presentationModels },
              },
            },
          },
        },
      },
    })
  }

  /**
   * User reset presentation models to initial settings
   */
  onResetPresentationModels = () => {
    const { tabType, resultsContext } = this.props
    const { selectedModeState: { initialPresentationModels } } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    this.onApply(initialPresentationModels, true)
  }

  render() {
    const {
      tabType, resultsContext, selectedMode,
    } = this.props
    const {
      sortableAttributes,
    } = this.state

    const {
      selectedTypeState: {
        enableSorting, isInInitialSorting, initialSorting, criteria: { sorting: currentSorting },
      }, selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <ActionsGroupComponent
        selectedMode={selectedMode}
        enableSorting={enableSorting}
        sortableAttributes={sortableAttributes}
        isInInitialSorting={isInInitialSorting}
        initialSorting={initialSorting}
        currentSorting={currentSorting}
        onApplySorting={this.onApplySorting}
        presentationModels={presentationModels}
        onApplyPresentationModels={this.onApplyPresentationModels}
        onResetPresentationModels={this.onResetPresentationModels}
      />
    )
  }
}
export default connect(
  null,
  ActionsGroupContainer.mapDispatchToProps)(ActionsGroupContainer)
