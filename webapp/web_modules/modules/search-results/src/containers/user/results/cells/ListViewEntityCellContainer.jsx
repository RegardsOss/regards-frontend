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
import get from 'lodash/get'
import values from 'lodash/values'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes, TableColumnBuilder } from '@regardsoss/components'
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
 * Packs thumbnail attribute data for render (or null if not present)
 * @param {[ColumnPresentationModel]} presentationModels presentation models
 * @return {AttributeRenderData} packed render data
 */
export function packThumbnailRenderData(presentationModels) {
  const model = presentationModels.find(m =>
    m.key !== TableColumnBuilder.selectionColumnKey &&
    m.key !== TableColumnBuilder.optionsColumnKey &&
    isAttribute(m, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail))
  if (!model) {
    return null
  }
  return {
    key: model.key,
    label: '', // useless
    renderers: AttributeColumnBuilder.buildThumbnailDelegates(model.attributes[0]),
  }
}

/**
 * Packs attributes to render in grid (not thumbnail, nor selection / options)
 * @param {[ColumnPresentationModel]} presentationModels presentation models
 * @return {[AttributeRenderData]} built render data for attributes
 */
export function packGridAttributesRenderData(presentationModels, locale) {
  // keep attributes in configured order, but extract the specific attributes like thumbnail
  return presentationModels
    .filter(model =>
      // 1 - filter attributes, remove thumbnail (that is rendered separately) and columns placeholders
      model.key !== TableColumnBuilder.selectionColumnKey &&
      model.key !== TableColumnBuilder.optionsColumnKey &&
      !isAttribute(model, DamDomain.AttributeModelController.standardAttributesKeys.thumbnail))
    .map(model => ({ // 2 - pack them for render
      key: model.key,
      label: model.label[locale],
      unit: get(model, 'attributes.length', 0) === 1 ? get(model.attributes[0], 'content.unit', null) : null,
      renderers: AttributeColumnBuilder.buildRenderDelegates(model.attributes),
    }))
}

/**
 * @param {[ColumnPresentationModel]} presentationModels presentation models
 * @return {boolean} true when list view should have selection displayed
 */
export function hasSelection(presentationModels) {
  return presentationModels.some(model => model.key === TableColumnBuilder.selectionColumnKey)
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
   * @return {*} list of actions ready to be dispatched in the redux store
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
    isDescAvailableFor: PropTypes.func.isRequired,
    // Callbacks
    onSearchEntity: PropTypes.func,
    onAddToCart: PropTypes.func,
    onShowDescription: PropTypes.func.isRequired,
    // auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
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
      servicesEnabled, accessToken, projectName, isDescAvailableFor, onAddToCart, onSelectEntity, onShowDescription,
    } = this.props
    return (
      <ListViewEntityCellComponent
        entity={entity}
        enableDownload={enableDownload}
        thumbnailRenderData={thumbnailRenderData}
        gridAttributesRenderData={gridAttributesRenderData}
        isDescAvailableFor={isDescAvailableFor}
        selectionEnabled={selectionEnabled}
        servicesEnabled={servicesEnabled}
        entitySelected={this.isSelectedRow()}
        onSelectEntity={onSelectEntity}
        onSearchEntity={this.getSearchEntityCallback()}
        onAddToCart={onAddToCart}
        onShowDescription={onShowDescription}
        accessToken={accessToken}
        projectName={projectName}
      />
    )
  }
}

export default connect(ListViewEntityCellContainer.mapStateToProps, ListViewEntityCellContainer.mapDispatchToProps)(ListViewEntityCellContainer)
