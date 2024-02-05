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
import values from 'lodash/values'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { getSelectionClient } from '../../../../../clients/SelectionClient'
import ListCellComponent, { ListThumbnailRenderData, ListAttributeRenderData } from '../../../../../components/user/tabs/results/list/ListCellComponent'

/**
 * Container to display the list cell component (provides selection state related management)
 * @author Raphaël Mechali
 */
export class ListCellContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { tableSelectors } = getSelectionClient(tabType)
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
  static mapDispatchToProps(dispatch, { entity, tabType }) {
    const { tableActions } = getSelectionClient(tabType)
    return {
      onSelect: () => dispatch(tableActions.toggleElement(entity.content.id, entity)),
    }
  }

  static propTypes = {
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps and mapDispatchToProps
    // From table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // attributes render data
    thumbnailRenderData: ListThumbnailRenderData, // no thumbnail when not provided
    gridAttributesRenderData: PropTypes.arrayOf(ListAttributeRenderData).isRequired,
    // Selection management
    enableSelection: PropTypes.bool.isRequired,
    disableLabelDisplay: PropTypes.bool.isRequired,
    // Description option management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download option management
    enableDownload: PropTypes.bool.isRequired,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management
    onAddElementToCart: PropTypes.func,
    // services management
    enableServices: PropTypes.bool.isRequired,
    // Navigate to management
    enableSearchEntity: PropTypes.bool.isRequired,
    onSearchEntity: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/forbid-prop-types
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    // from mapDispatchToProps
    onSelect: PropTypes.func.isRequired,
  }

  /**
   * On user search for entity (set a navigation tag)
   */
  onSearchEntity = () => {
    const { entity, onSearchEntity } = this.props
    onSearchEntity(entity)
  }

  /**
   * Is row as parameter selected?
   * @param rowIndex row index
   * @return true if row is selected
   */
  isSelectedRow = () => {
    const { entity, selectionMode, toggledElements } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[entity.content.id])
      || (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[entity.content.id])
  }

  render() {
    const {
      tabType, entity,
      thumbnailRenderData, gridAttributesRenderData,
      descriptionAvailable, onShowDescription,
      enableDownload, accessToken, projectName,
      onAddElementToCart, enableServices, enableSearchEntity,
      enableSelection, onSelect, disableLabelDisplay,

    } = this.props
    return (
      <ListCellComponent
        tabType={tabType}
        entity={entity}
        thumbnailRenderData={thumbnailRenderData}
        gridAttributesRenderData={gridAttributesRenderData}
        descriptionAvailable={descriptionAvailable}
        onShowDescription={onShowDescription}
        enableDownload={enableDownload}
        accessToken={accessToken}
        projectName={projectName}
        onAddElementToCart={onAddElementToCart}
        enableServices={enableServices}
        enableSelection={enableSelection}
        disableLabelDisplay={disableLabelDisplay}
        selected={this.isSelectedRow()}
        onSelect={onSelect}
        enableSearchEntity={enableSearchEntity}
        onSearchEntity={this.onSearchEntity}
      />
    )
  }
}

export default connect(ListCellContainer.mapStateToProps, ListCellContainer.mapDispatchToProps)(ListCellContainer)
