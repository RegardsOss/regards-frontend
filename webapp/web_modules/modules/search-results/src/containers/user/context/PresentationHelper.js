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
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'

/**
 * Helper class to convert entity attributes into presentation models and add required decoration models
 * @author Raphaël Mechali
 */
export class PresentationHelper {
  /** Modes for which options presentation model should be added separately, as custom presentation models */
  static MODES_USING_OPTIONS_PM = [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]

  /** Modes for which selection presentation model should be added separately, as custom presentation models */
  static MODES_USING_SELECTION_PM = [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]

  /**
   * List of attributes the server cannot sort on
   */
  static NON_SORTABLE_ATTRIBUTES = [
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.thumbnail).content.jsonPath,
  ]

  /**
   * Is model as parameter sortable
   * @param {*} presentationModel matching AccessShapes#AttributeElementModel
   * @return {boolean} true if sorting is allowed for presentation model, false otherwise
   */
  static isSortableModel(presentationModel) {
    return presentationModel.attributes.length === 1
    && !this.NON_SORTABLE_ATTRIBUTES.includes(presentationModel.attributes[0].name)
  }

  /**
   * Builds a common presentatation model for results view
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @param {*} presentationModel matching AccessShapes#AttributeElementModel
   * @param {bool} allowingSort is sort allowed in current context
   * @param {string} key column key
   * @return {*} presentation model or null
   */
  static buildPresentationModel(attributeModels = {}, presentationModel, allowingSort, key) {
  // 1 - Retrieve all attributes that can be retrieved
    const attributesAndRender = presentationModel.attributes.map(({ name, renderer }) => ({
      renderer,
      model: DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels),
    })).filter((attr) => !!attr.model) // remove non retrieved models
    if (!attributesAndRender.length) {
      return null // cannot show that column as no attribute could be retrieved
    }
    return {
      key,
      label: presentationModel.label,
      attributes: attributesAndRender,
      enableSorting: allowingSort && PresentationHelper.isSortableModel(presentationModel),
      visible: true,
    }
  }

  /**
   * Builds presentation models from server attributes and configured attributes. Disables sorting and alike when it is not
   * allowed. Adds automatically columns placeholders whyen in table mode
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @param {*} configuredAttributes configured attributes for view
   * @param {*} viewType view entities type
   * @param {*} viewMode view mode (table / list... from ResultsViewModeEnum)
   * @return {[*]} list of presentation models for configured attributes in corresponding view type and mode
   */
  static buildPresentationModels(attributeModels, configuredAttributes = [], viewType, viewMode) {
    const allowingSort = UIDomain.ResultsContextConstants.allowSorting(viewType)
    const addOptionsColumn = PresentationHelper.MODES_USING_OPTIONS_PM.includes(viewMode)
    const addSelectionColumn = UIDomain.ResultsContextConstants.allowSelection(viewType, viewMode)
      && PresentationHelper.MODES_USING_SELECTION_PM.includes(viewMode)
    return [
      // 1 - selection if enabled for current
      addSelectionColumn ? PresentationHelper.buildColumnPlaceholder(TableColumnBuilder.selectionColumnKey) : null,
      // 2 - build the presentation model, or null when no attribute model could be retrieved (filter null elements)
      ...configuredAttributes.map(
        (c, index) => PresentationHelper.buildPresentationModel(attributeModels, c, allowingSort, `configured.column.${index}`)),
      // 3 - options columns
      addOptionsColumn ? PresentationHelper.buildColumnPlaceholder(TableColumnBuilder.optionsColumnKey) : null,
    ].filter((presentationModel) => !!presentationModel)
  }

  /**
 * @param {string} key placeholder column key
 * @return {presentationModel} built presentation model
 */
  static buildColumnPlaceholder(key) {
    return {
      key,
      visible: true,
      enableSorting: false,
      sortOrder: CommonDomain.SORT_ORDERS_ENUM.NO_SORT,
    }
  }
}
