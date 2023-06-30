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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { resultsContextActions } from '../../../../../../clients/ResultsContextClient'
import TypeTabComponent from '../../../../../../components/user/tabs/results/header/options/TypeTabComponent'

/**
 * Container for entity tab type selector (to switch current view entities type)
 * @author Raphaël Mechali
 */
export class TypeTabContainer extends React.Component {
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
    // type to select
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Callback: user selected this type */
  onTypeSelected = () => {
    const {
      moduleId, type, tabType, resultsContext, updateResultsContext,
    } = this.props
    const { selectedType } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    if (selectedType !== type) {
      // update state by diff (only set the new type field value)
      updateResultsContext(moduleId, {
        tabs: {
          [tabType]: {
            selectedType: type,
          },
        },
      })
    }
    // else: no need to update, already selected
  }

  render() {
    const { type, tabType, resultsContext } = this.props
    return (
      <TypeTabComponent
        type={type}
        tabType={tabType}
        resultsContext={resultsContext}
        onTypeSelected={this.onTypeSelected}
      />
    )
  }
}
export default connect(null, TypeTabContainer.mapDispatchToProps)(TypeTabContainer)
