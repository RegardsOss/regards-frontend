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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes, CommonShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import ListViewComponent from '../../../../../components/user/tabs/results/list/ListViewComponent'

/**
 * Container for search results list component. Converts current model into list render data to enhance render performances
 * @author Raphaël Mechali
 */
export class ListViewContainer extends React.Component {
  static propTypes = {
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
  }

  /**
   * Is the presenation model attribute as parameter standing for attribute name?
   * @param {AttributePresentationModel} attributePresentationModel presentation model, respecting shape AttributePresentationModel from ResultsContext
   * @param {string} attributeName searched attribute name
   * @return {boolean} true if that attribute stands for name as parameter
   */
  static isAttribute({ attributes }, attributeName) {
    // attribute can stand for name only when it is a simple attribute (not a group)
    return attributes.length === 1 && get(attributes[0], 'content.name', null) === attributeName
  }

  /**
   * Packs thumbnail attribute data for render (or null if not present)
   * @param {[*]} presentationModels presentation models, respecting shape AttributePresentationModel from ResultsContext
   * @return {AttributeRenderData} packed render data
   */
  static buildThumbnailRenderData(presentationModels) {
    const model = presentationModels.find(
      m => ListViewContainer.isAttribute(m, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail))
    return model ? {
      key: model.key,
      renderers: AttributeColumnBuilder.buildThumbnailDelegates(model.attributes[0]),
    } : null
  }

  /**
   * Packs attributes to render in grid (ignore thumbnail that must be rendered separately)
   * @param {[*]} presentationModels presentation models, respecting shape AttributePresentationModel from ResultsContext
   * @return {[AttributeRenderData]} built render data for attributes
   */
  static buildGridAttributesRenderData(presentationModels) {
    // 1 - keep attributes in configured order, but extract thumbnail attribute, to be displayed separately
    return presentationModels.filter(
      model => !ListViewContainer.isAttribute(model, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail))
      // 2 - pack attribute for render
      .map(model => ({
        key: model.key,
        label: model.label,
        unit: get(model, 'attributes.length', 0) === 1 ? get(model.attributes[0], 'content.unit', null) : null,
        renderers: AttributeColumnBuilder.buildRenderDelegates(model.attributes),
      }))
  }

  /** Initial state */
  state = {
    enableSelection: false,
    thumbnailRenderData: null,
    gridAttributesRenderData: [],
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
    // retrieve old and new results context
    const { resultsContext, tabType } = newProps
    const {
      selectedType,
      selectedModeState: { presentationModels: newPresentationModels },
    } = UIDomain.ResultsContextConstants.getViewData(resultsContext, tabType)

    const { resultsContext: oldContext, tabType: oldTabType } = oldProps
    const {
      selectedType: oldSelectedType,
      selectedModeState: { presentationModels: oldPresentationModels },
    } = oldContext && oldTabType ? UIDomain.ResultsContextConstants.getViewData(oldContext, oldTabType) : {
      selectedType: null,
      selectedModeState: {},
    }
    const newState = { ...this.state }

    // when view type changed, check if selection should be allowed
    if (!isEqual(selectedType, oldSelectedType)) {
      newState.enableSelection = UIDomain.ResultsContextConstants.allowSelection(selectedType, UIDomain.RESULTS_VIEW_MODES_ENUM.LIST)
    }

    // when presentation models changed, remerge into pre-built presentation models (pre-computed to avoid consuming render time)
    if (!isEqual(newPresentationModels, oldPresentationModels)) {
      newState.thumbnailRenderData = ListViewContainer.buildThumbnailRenderData(newPresentationModels)
      newState.gridAttributesRenderData = ListViewContainer.buildGridAttributesRenderData(newPresentationModels)
    }

    // update on state changed
    if (!isEqual(newState, this.state)) {
      this.setState(newState)
    }
  }

  render() {
    const {
      resultsContext, tabType, searchActions, requestParameters,
      descriptionAvailable, onShowDescription, onSearchEntity,
      accessToken, projectName, onAddElementToCart,
    } = this.props
    const { enableSelection, thumbnailRenderData, gridAttributesRenderData } = this.state
    const { selectedType, selectedTypeState } = UIDomain.ResultsContextConstants.getViewData(resultsContext, tabType)

    return (
      <ListViewComponent
        type={selectedType}
        tabType={tabType}
        requestParameters={requestParameters}
        searchActions={searchActions}

        thumbnailRenderData={thumbnailRenderData}
        gridAttributesRenderData={gridAttributesRenderData}

        enableSelection={enableSelection}

        descriptionAvailable={descriptionAvailable}
        onShowDescription={onShowDescription}

        enableDownload={selectedTypeState.enableDownload}
        accessToken={accessToken}
        projectName={projectName}

        onAddElementToCart={onAddElementToCart}

        enableServices={selectedTypeState.enableServices}

        enableSearchEntity={selectedTypeState.enableSearchEntity}
        onSearchEntity={onSearchEntity}
      />
    )
  }
}
export default ListViewContainer
