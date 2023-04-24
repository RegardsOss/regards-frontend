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
   * Packs thumbnail attribute data for render (or null if not present)
   * @param {[*]} presentationModels presentation models, respecting shape AttributePresentationModel from ResultsContext
   * @return {AttributeRenderData} packed render data
   */
  static buildAttributeRenderData(model) {
    return {
      key: model.key,
      label: model.label,
      renderers: AttributeColumnBuilder.buildRenderDelegates(model.attributes),
    }
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
    // retrieve old and new results context
    const { resultsContext, tabType } = newProps
    const {
      selectedType,
      selectedModeState: { presentationModels: newPresentationModels },
    } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

    const { resultsContext: oldContext, tabType: oldTabType } = oldProps
    const {
      selectedType: oldSelectedType,
      selectedModeState: { presentationModels: oldPresentationModels },
    } = oldContext && oldTabType ? UIDomain.ResultsContextHelper.getViewData(oldContext, oldTabType) : {
      selectedType: null,
      selectedModeState: {},
    }
    const newState = { ...this.state }

    // when view type changed, check if selection should be allowed
    if (!isEqual(selectedType, oldSelectedType)) {
      newState.enableSelection = UIDomain.ResultsContextConstants.allowSelection(selectedType)
    }

    // when presentation models changed, remerge into pre-built presentation models (pre-computed to avoid consuming render time)
    if (!isEqual(newPresentationModels, oldPresentationModels)) {
      // extract thumbnail (handled separately by view)
      const { t: thumbnailModel, oth: otherModels } = newPresentationModels.reduce(({ t, oth }, model) => {
        const isThumbnail = model.attributes.length === 1
          && model.attributes[0].model.content.type === DamDomain.PSEUDO_ATTR_TYPES.THUMBNAIL_PSEUDO_TYPE
        return {
          t: isThumbnail ? model : t,
          oth: isThumbnail ? oth : [...oth, model],
        }
      }, { t: null, oth: [] })

      // store thumbnail and other models separately
      newState.thumbnailRenderData = thumbnailModel ? ListViewContainer.buildAttributeRenderData(thumbnailModel) : null
      newState.gridAttributesRenderData = otherModels.map(ListViewContainer.buildAttributeRenderData)
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
    const { selectedType, selectedTypeState, selectedModeState } = UIDomain.ResultsContextHelper.getViewData(resultsContext, tabType)

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
        disableLabelDisplay={selectedModeState.disableLabelDisplay}
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
// export default withSelectionContainer(ListViewContainer)
export default ListViewContainer
