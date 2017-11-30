/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import values from 'lodash/values'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { tableActions, tableSelectors } from '../../../../clients/TableClient'
import ListViewEntityCellComponent, { AttributeRenderData } from '../../../../components/user/results/cells/ListViewEntityCellComponent'


/**
 * Is the presenation model attribute as parameter standing for attribute name?
 * @param {AttributePresentationModel} attributePresentationModel -
 * @param {string} attributeName searched attribute name
 * @return {boolean} true if that attribute stands for name as parameter
 */
function isAttribute({ attributes }, attributeName) {
  // attribute can stand for name only when it is a simple attribute (not a group)
  return attributes.length === 1 && get(attributes[0], 'content.name', null) === attributeName
}

/**
 * Returns attribute presentation model for name as parameter
 * @param {[AttributePresentationModel]} attributePresentationModels presentation models
 * @param {string} attributeName searched attribute name
 * @return {AttributePresentationModel} model found or null if that attribute stands for name as parameter
 */
function getAttributeModel(attributePresentationModels, attributeName) {
  return attributePresentationModels.find(m => isAttribute(m, attributeName))
}


/**
 * Packs thumbnail attribute data for render (or null if not present)
 * @param {[AttributePresentationModel]} attributePresentationModels presentation models
 * @return {AttributeRenderData} packed render data
 */
export function packThumbnailRenderData(attributePresentationModels) {
  const model = getAttributeModel(attributePresentationModels, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail)
  if (!model) {
    return null
  }
  return {
    key: model.key,
    label: model.label,
    renderers: AttributeColumnBuilder.buildRenderDelegates(model.attributes),
  }
}

/**
 * Packs attributes to render in grid (not thumbnail, nor download)
 * @param {[AttributePresentationModel]} attributePresentationModels presentation models
 * @return {[AttributeRenderData]} built render data for attributes
 */
export function packGridAttributesRenderData(attributePresentationModels) {
  return attributePresentationModels
    .filter(model => // 1 - filter attributes, remove thumbnail and download
      !isAttribute(model, DamDomain.AttributeModelController.standardAttributesKeys.download) &&
      !isAttribute(model, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail))
    .sort((a, b) => // 2 - sort alpha
      StringComparison.compare(a.label, b.label))
    .map(model => ({ // 3 - pack them for render
      key: model.key,
      label: model.label,
      renderers: AttributeColumnBuilder.buildRenderDelegates(model.attributes),
    }))
}

/**
* Container for list view entity cell (mainly provides selection related data)
*/
export class ListViewEntityCellContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      toggledElements: tableSelectors.getToggledElements(state),
      selectionMode: tableSelectors.getSelectionMode(state),
    }
  }


  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { rowIndex, entity }) {
    return {
      onSelectEntity: () => dispatch(tableActions.toggleElement(rowIndex, entity)),
    }
  }

  static propTypes = {
    // From table cell API
    rowIndex: PropTypes.number.isRequired,
    entity: AccessShapes.EntityWithServices.isRequired,
    // pre-fetched data to enhance rendering
    thumbnailRenderData: AttributeRenderData, // no thumbnail when not provided
    gridAttributesRenderData: PropTypes.arrayOf(AttributeRenderData).isRequired,
    // Attributes to display configured on entity
    selectionEnabled: PropTypes.bool,
    servicesEnabled: PropTypes.bool.isRequired,
    enableDownload: PropTypes.bool.isRequired,
    // Callback
    onSearchEntity: PropTypes.func,
    onAddToCart: PropTypes.func,
    // from map state to props
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    // from map dispatch to props
    onSelectEntity: PropTypes.func.isRequired,
  }

  /**
   * On user search for entity (set a navigation tag)
   */
  onSearchEntity = () => {
    const { entity, onSearchEntity } = this.props
    onSearchEntity(entity)
  }

  /**
   * Returns search entity callback when available
   * @return search entity callback or null when not available
   */
  getSearchEntityCallback = () => this.props.onSearchEntity ? this.onSearchEntity : null

  /**
   * Is row as parameter selected?
   * @param rowIndex row index
   * @return true if row is selected
   */
  isSelectedRow = () => {
    const { rowIndex, selectionMode, toggledElements } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[rowIndex]) ||
      (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[rowIndex])
  }

  render() {
    const {
      entity, enableDownload, thumbnailRenderData, gridAttributesRenderData, selectionEnabled,
      servicesEnabled, onAddToCart, onSelectEntity,
    } = this.props
    return (
      <ListViewEntityCellComponent
        entity={entity}
        enableDownload={enableDownload}
        thumbnailRenderData={thumbnailRenderData}
        gridAttributesRenderData={gridAttributesRenderData}
        selectionEnabled={selectionEnabled}
        servicesEnabled={servicesEnabled}
        entitySelected={this.isSelectedRow()}
        onSelectEntity={onSelectEntity}
        onSearchEntity={this.getSearchEntityCallback()}
        onAddToCart={onAddToCart}
      />
    )
  }
}

export default connect(ListViewEntityCellContainer.mapStateToProps, ListViewEntityCellContainer.mapDispatchToProps)(ListViewEntityCellContainer)
