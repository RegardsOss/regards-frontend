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
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { resultsContextActions } from '../../../../clients/ResultsContextClient'
import { CriterionBuilder } from '../../../../definitions/CriterionBuilder'
import TableViewComponent from '../../../../components/user/results/table/TableViewComponent'

/**
 * Container for search results table component: it translates current model into usable models for columns
 * @author Raphaël Mechali
 */
export class SearchResultsTableContainer extends React.Component {
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
    resultsContext: UIShapes.ResultsContext.isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    // Description management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download management
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management
    onAddElementToCart: PropTypes.func,
    // Search entity management
    onSearchEntity: PropTypes.func.isRequired,
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /**
   * Converts models and sorting into column presentation models
   * @param {[*]} presentationModels presentation models in current type and mode. Respects UIShapes.AttributePresentationModel or UIShapes.FunctionalPresentationModel shape
   * @param {[*]} sortingCriteria currently applying sorting criteria
   * @param {boolean} isInInitialSorting is currently in initial sorting
   * @return {[*]} converted column presentation models
   */
  static convertToColumnPresentationModels(presentationModels, sortingCriteria, isInInitialSorting) {
    return presentationModels.map((model) => {
      let sortOrder = CommonDomain.SORT_ORDERS_ENUM.NO_SORT
      let sortIndex = null
      // provide sort order and index only when sorting is enabled AND not in initial sorting state (that is not displayed)
      if (!isInInitialSorting && model.enableSorting) {
        // pre: this model is necessary an AttributePresentationModel and can only have one attribute
        // search for corresponding sorting criterion
        const correspondingCritIndex = sortingCriteria.findIndex(({ attribute }) => isEqual(attribute, model.attributes[0]))
        if (correspondingCritIndex >= 0) { // 0 -> n-1: that model attribute is used for sorting
          sortOrder = sortingCriteria[correspondingCritIndex].sortOrder
          sortIndex = correspondingCritIndex
        }
      }
      // TODO: peut etre virer les sorting non initiaux qui ne sont pas retrouves dans la liste des pres models!
      return {
        ...model, // report all fields as they are common with column model for table
        // add sorting information
        sortOrder,
        sortIndex,
      }
    },

    )
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when presentation models changed or sorting changed, remerge into pre-built presentation models with sorting
    // extract current presentation models and sorting
    const { currentTypeState, currentModeState } = UIDomain.ResultsContextConstants.getViewData(newProps.resultsContext)

    const newAppliedSorting = currentTypeState.criteria.sorting
    const newPresentationModels = currentModeState.presentationModels

    // extract old presentation models and sorting
    const oldViewData = UIDomain.ResultsContextConstants.getViewData(oldProps.resultsContext)
    const oldAppliedSorting = oldViewData.currentTypeState.criteria.sorting
    const oldPresentationModels = oldViewData.currentModeState.presentationModels

    // when different, rebuild table presentation models
    if (!isEqual(oldAppliedSorting, newAppliedSorting) || !isEqual(oldPresentationModels, newPresentationModels)) {
      this.setState({
        columnPresentationModels: SearchResultsTableContainer.convertToColumnPresentationModels(
          newPresentationModels, newAppliedSorting, currentTypeState.isInInitialSorting),
      })
    }
  }

  /**
   * User callback: user clicked a sorting presentation model. Compute next sorting state (add, swap or remove sorting element in list, use
   * initial sorting when user one is empty)
   * @param {string} presentationModelKey key of selected presentation model for sorting
   * @param {string} newSortOrder sort order to apply for that model attribute
   */
  onSort = (presentationModelKey, newSortOrder) => {
    // Pre: sorting model can be retrieved
    // Pre: sorting model has one and only one attribute
    const { moduleId, updateResultsContext, resultsContext } = this.props

    // A - retrieve the corresponding sorting attribute and data
    const {
      type, currentTypeState: { isInInitialSorting, initialSorting, criteria: { sorting } },
      currentModeState: { presentationModels },
    } = UIDomain.ResultsContextConstants.getViewData(resultsContext)
    const updatedSortingModel = presentationModels.find(({ key }) => key === presentationModelKey)
    const sortingAttribute = updatedSortingModel.attributes[0]
    const indexInCurrentSorting = isInInitialSorting ? -1 : sorting.findIndex(({ attribute }) => isEqual(attribute, sortingAttribute))

    // B - Compute next sorting criterion array.
    let nextSorting
    switch (newSortOrder) {
      case CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER:
      case CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER:
        // add or swap order in sorting list
        if (indexInCurrentSorting >= 0) { // swap
          nextSorting = sorting.map((sortingElt, index) => index !== indexInCurrentSorting
            ? sortingElt // previously existing element, keep it
            : CriterionBuilder.buildSortCriterion(sortingAttribute, newSortOrder), // updated element, change it
          )
        } else { // add new sorting criterion at end (consider empty array if in initial sorting state)
          nextSorting = [...(isInInitialSorting ? [] : sorting), CriterionBuilder.buildSortCriterion(sortingAttribute, newSortOrder)]
        }
        break
      case CommonDomain.SORT_ORDERS_ENUM.NO_SORT:
        // remove from sorting list
        nextSorting = sorting.filter((s, index) => index !== indexInCurrentSorting)
        break
      default:
        throw new Error(`Unsupported sort type: ${newSortOrder}`)
    }

    // C - compute if initial sorting should be restored
    const useInitialSorting = !nextSorting.length

    // D - apply it in state
    updateResultsContext(moduleId, {
      typeState: {
        [type]: {
          isInInitialSorting: useInitialSorting,
          criteria: {
            sorting: useInitialSorting ? initialSorting : nextSorting,
          },
        },
      },
    })
  }

  render() {
    const {
      resultsContext, requestParameters, searchActions,
      descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart,
      onSearchEntity,
    } = this.props
    const { columnPresentationModels } = this.state
    const { type, currentTypeState } = UIDomain.ResultsContextConstants.getViewData(resultsContext)

    return (
      <TableViewComponent
        type={type}
        columnPresentationModels={columnPresentationModels}
        requestParameters={requestParameters}
        searchActions={searchActions}
        onSort={this.onSort}

        descriptionAvailable={descriptionAvailable}
        onShowDescription={onShowDescription}

        enableDownload={currentTypeState.enableDownload}
        accessToken={accessToken}
        projectName={projectName}

        onAddElementToCart={onAddElementToCart}

        enableServices={currentTypeState.enableServices}

        enableSearchEntity={currentTypeState.enableSearchEntity}
        onSearchEntity={onSearchEntity}
      />
    )
  }
}
export default connect(
  SearchResultsTableContainer.mapStateToProps,
  SearchResultsTableContainer.mapDispatchToProps)(SearchResultsTableContainer)
