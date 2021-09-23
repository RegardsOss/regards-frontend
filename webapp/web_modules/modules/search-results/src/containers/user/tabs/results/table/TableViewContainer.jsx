/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonShapes, UIShapes, CatalogShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { resultsContextActions } from '../../../../../clients/ResultsContextClient'
import { CriterionBuilder } from '../../../../../definitions/CriterionBuilder'
import TableViewComponent from '../../../../../components/user/tabs/results/table/TableViewComponent'
import { withSelectionContainer } from '../common/withSelectionContainer'

/**
 * Container for search results table component: it translates current model into usable models for columns
 * @author Raphaël Mechali
 */
export class TableViewContainer extends React.Component {
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
    // Entities cached
    loadedEntities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
  }

  /**
   * Converts models and sorting into column presentation models
   * @param {[*]} presentationModels presentation models in current type and mode. Respects UIShapes.AttributePresentationModel or UIShapes.FunctionalPresentationModel shape
   * @param {[*]} sortingCriteria currently applying sorting criteria
   * @return {[*]} converted column presentation models
   */
  static convertToColumnPresentationModels(presentationModels, sortingCriteria) {
    return presentationModels.map((model) => {
      let sortOrder = CommonDomain.SORT_ORDERS_ENUM.NO_SORT
      let sortIndex = null
      // provide sort order and index only when sorting is enabled
      if (model.enableSorting) {
        // pre: this model is necessary an AttributePresentationModel and can only have one attribute
        // search for corresponding sorting criterion
        const correspondingCritIndex = sortingCriteria.findIndex(({ attribute }) => isEqual(attribute, model.attributes[0].model))
        if (correspondingCritIndex >= 0) { // 0 -> n-1: that model attribute is used for sorting
          sortOrder = sortingCriteria[correspondingCritIndex].sortOrder
          sortIndex = correspondingCritIndex
        }
      }
      return {
        ...model, // report all fields as they are common with column model for table
        // add sorting information
        sortOrder,
        sortIndex,
      }
    })
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // when presentation models changed or sorting changed, remerge into pre-built presentation models with sorting
    // extract current presentation models and sorting
    const { resultsContext, tabType } = newProps
    const { selectedTypeState, selectedModeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    const newAppliedSorting = selectedTypeState.criteria.sorting
    const newPresentationModels = selectedModeState.presentationModels

    // extract old presentation models and sorting
    const { resultsContext: oldResultsContext, tabType: oldTabType } = oldProps
    let oldAppliedSorting = null
    let oldPresentationModels = null
    if (oldResultsContext && oldTabType) {
      const { selectedTypeState: oldTypeState, selectedModeState: oldModeState } = UIDomain.ResultsContextHelper.getViewData(oldResultsContext, oldTabType)
      oldAppliedSorting = oldTypeState.criteria.sorting
      oldPresentationModels = oldModeState.presentationModels
    }

    // when different, rebuild table presentation models
    if (!isEqual(oldAppliedSorting, newAppliedSorting) || !isEqual(oldPresentationModels, newPresentationModels)) {
      this.setState({
        columnPresentationModels: TableViewContainer.convertToColumnPresentationModels(
          newPresentationModels, newAppliedSorting),
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
    const {
      moduleId, updateResultsContext, resultsContext, tabType,
    } = this.props

    // A - retrieve the corresponding sorting attribute and data
    const {
      selectedType, selectedTypeState: {
        isInInitialSorting, initialSorting, criteria: { sorting },
      },
      selectedModeState: { presentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    const updatedSortingModel = presentationModels.find(({ key }) => key === presentationModelKey)
    const sortingAttribute = updatedSortingModel.attributes[0].model

    const indexInCurrentSorting = sorting.findIndex(({ attribute }) => isEqual(attribute, sortingAttribute))

    // B - Compute next sorting criterion array.
    let nextSorting
    switch (newSortOrder) {
      case CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER:
      case CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER:
        // add or swap order in sorting list
        if (indexInCurrentSorting >= 0) {
          // 1. Sorting Criterion already exists
          nextSorting = sorting.map((sortingElt, index) => index !== indexInCurrentSorting
            ? sortingElt
            : CriterionBuilder.buildSortCriterion(sortingAttribute, newSortOrder))
        } else {
          // 2 - Sorting criterion has just been added
          nextSorting = [...(isInInitialSorting ? [] : sorting), CriterionBuilder.buildSortCriterion(sortingAttribute, newSortOrder)]
        }
        break
      case CommonDomain.SORT_ORDERS_ENUM.NO_SORT:
        // remove from sorting list
        nextSorting = isInInitialSorting ? [] : sorting.filter((s, index) => index !== indexInCurrentSorting)
        break
      default:
        throw new Error(`Unsupported sort type: ${newSortOrder}`)
    }

    // C - compute if initial sorting should be restored
    const useInitialSorting = !nextSorting.length

    // D - apply it in state
    updateResultsContext(moduleId, {
      tabs: {
        [tabType]: {
          types: {
            [selectedType]: {
              isInInitialSorting: useInitialSorting,
              criteria: {
                sorting: useInitialSorting ? initialSorting : nextSorting,
              },
            },
          },
        },
      },
    })
  }

  render() {
    const {
      resultsContext, tabType, requestParameters, searchActions,
      descriptionAvailable, onShowDescription,
      accessToken, projectName, onAddElementToCart, loadedEntities,
      onSearchEntity,
    } = this.props
    const { columnPresentationModels } = this.state
    const { selectedType, selectedTypeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)
    return (
      <TableViewComponent
        tabType={tabType}
        type={selectedType}
        columnPresentationModels={columnPresentationModels}
        requestParameters={requestParameters}
        searchActions={searchActions}
        onSort={this.onSort}
        descriptionAvailable={descriptionAvailable}
        onShowDescription={onShowDescription}
        enableDownload={selectedTypeState.enableDownload}
        accessToken={accessToken}
        projectName={projectName}
        onAddElementToCart={onAddElementToCart}
        enableServices={selectedTypeState.enableServices}
        enableSearchEntity={selectedTypeState.enableSearchEntity}
        onSearchEntity={onSearchEntity}
        loadedEntities={loadedEntities}
      />
    )
  }
}

export default withSelectionContainer(connect(
  TableViewContainer.mapStateToProps,
  TableViewContainer.mapDispatchToProps)(TableViewContainer))
