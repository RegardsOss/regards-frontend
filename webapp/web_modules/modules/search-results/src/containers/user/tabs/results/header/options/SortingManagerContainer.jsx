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
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import SortSettingsComponent from '../../../../../../components/user/tabs/results/header/options/sort/SortSettingsComponent'

/**
 * Container for sorting functionnality
 *
 * @author Raphaël Mechali
 * @author Léo Mieulet
 */
export class SortingManagerContainer extends React.Component {
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
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user updates its sorting model
   */
  onApply = (sortingCriteria) => {
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

  render() {
    const { resultsContext, tabType } = this.props
    const {
      sortableAttributes,
    } = this.state

    const {
      selectedTypeState: {
        enableSorting, isInInitialSorting, initialSorting, criteria: { sorting: currentSorting },
      },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return enableSorting
      ? <SortSettingsComponent
          sortableAttributes={sortableAttributes}
          isInInitialSorting={isInInitialSorting}
          initialSorting={initialSorting}
          currentSorting={currentSorting}
          onApply={this.onApply}
      />
      : null
  }
}

export default connect(null, SortingManagerContainer.mapDispatchToProps)(SortingManagerContainer)
