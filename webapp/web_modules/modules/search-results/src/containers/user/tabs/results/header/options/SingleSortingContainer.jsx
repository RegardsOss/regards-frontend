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
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import { CriterionBuilder } from '../../../../../../definitions/CriterionBuilder'
import SingleSortingComponent, { SingleSortingModelEnum } from '../../../../../../components/user/tabs/results/header/options/SingleSortingComponent'

/**
 * Container for single sorting functionnality: it builds model for sorting with elements:
 * ---
 * DEFAULT
 * CUSTOM (when multiple attributes are selected)
 * ---
 * ATTR (for each sortable attribute)
 *
 * @author Raphaël Mechali
 */
export class SingleSortingContainer extends React.Component {
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
    // eslint-disable-next-line react/no-unused-prop-types
    resultsContext: UIShapes.ResultsContext.isRequired, // used only in onProperties updated
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
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
   * On properties change detected: updated state properties that are computed from props (save some render
   * time)
   * @param {*} oldProps old component properties
   * @param {*} newProps new component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    // recompute sorting model elements
    const { resultsContext, tabType } = newProps
    const {
      selectedTypeState: {
        enableSorting, isInInitialSorting, initialSorting, criteria: { sorting: currentSorting },
      }, selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const newState = {
      enableSorting,
      defaultSortingModel: {
        type: SingleSortingModelEnum.DEFAULT,
        selected: isInInitialSorting,
        sortingCriteria: initialSorting,
      },
      customSortingModel: null, // computed later
      attributeSortingModels: presentationModels.reduce((acc, presentationModel) => {
        // 1 - dont keep attribute if it is not sortable
        if (!presentationModel.enableSorting) {
          return acc
        }
        // 2 - convert to sorting criteria
        const sortingCriteria = [CriterionBuilder.buildSortCriterion(presentationModel.attributes[0].model)] // necessarily present
        // 3 - convert that attribute presentation model as it is usable for single sorting
        return [...acc, {
          type: SingleSortingModelEnum.ATTRIBUTE,
          selected: !isInInitialSorting && isEqual(currentSorting, sortingCriteria),
          presentationModel,
          sortingCriteria,
        }]
      }, []),
    }

    // custom option is required when no other is selected (it can be either a presentation model from another view in same entity type or
    // some multiple attributes sorting from group table view)
    if (newState.enableSorting && !newState.defaultSortingModel.selected && !newState.attributeSortingModels.some((sortingModel) => sortingModel.selected)) {
      newState.customSortingModel = {
        type: SingleSortingModelEnum.CUSTOM,
        selected: true,
        sortingCriteria: currentSorting,
      }
    }

    // update when there is a difference (avoid columns visibility and such updates)
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user selected a new sorting model
   * @param {*} sortingModel selected sorting model, as provided by this parent
   */
  onSortBy = (sortingModel) => {
    if (!sortingModel.selected) { // only when not already selected
      // update current type state sorting criteria
      const {
        moduleId, resultsContext, tabType, updateResultsContext,
      } = this.props
      const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            types: {
              [selectedType]: {
                isInInitialSorting: sortingModel.type === SingleSortingModelEnum.DEFAULT,
                criteria: {
                  sorting: sortingModel.sortingCriteria,
                },
              },
            },
          },
        },
      })
    }
  }

  render() {
    const {
      enableSorting, defaultSortingModel, customSortingModel, attributeSortingModels,
    } = this.state
    return enableSorting
      ? <SingleSortingComponent
          defaultSortingModel={defaultSortingModel}
          customSortingModel={customSortingModel}
          attributeSortingModels={attributeSortingModels}
          onSortBy={this.onSortBy}
      />
      : null
  }
}

export default connect(null, SingleSortingContainer.mapDispatchToProps)(SingleSortingContainer)
