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
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  FieldsGroup, Field, RenderSelectField,
  StringComparison, ValidationHelpers, RenderRadio, FieldArray, RenderArrayObjectField,
} from '@regardsoss/form-utils'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { RadioButton } from 'material-ui'
import { FORM_PAGES_ENUM } from '../../../domain/form/FormPagesEnum'
import { DataViewsConfiguration, DatasetViewsConfiguration } from '../../../shapes/ModuleConfiguration'
import LayerInfoItemComponent from './LayerInfoItemComponent'

const {
  required,
} = ValidationHelpers

/**
 * Component to configure each view type (table (and list), quicklooks and map)
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class ViewTypeConfigurationComponent extends React.Component {
  static propTypes = {
    pageType: PropTypes.oneOf([FORM_PAGES_ENUM.LIST_AND_TABLE, FORM_PAGES_ENUM.QUICKLOOKS, FORM_PAGES_ENUM.MAP]).isRequired,
    availableAttributes: DataManagementShapes.AttributeModelList.isRequired,
    // Namespace and current form values are provided for type
    currentTypeNamespace: PropTypes.string.isRequired,
    currentTypeFormValues: PropTypes.oneOfType([
      DataViewsConfiguration,
      DatasetViewsConfiguration,
    ]).isRequired,
    // redux change field method
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Map to convert page type into corresponding configuration results view type */
  static PAGE_TO_VIEW_TYPE = {
    [FORM_PAGES_ENUM.LIST_AND_TABLE]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE, // list and table are stored under table
    [FORM_PAGES_ENUM.QUICKLOOKS]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
    [FORM_PAGES_ENUM.MAP]: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
  }

  /** Map of view types allowing regroupements */
  static TYPES_ALLOWING_GROUPS = [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]

  /** Attributes filter by view type */
  static ATTRIBUTE_FILTER_BY_TYPE = {
    [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: ViewTypeConfigurationComponent.all,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: ViewTypeConfigurationComponent.allButThumbnail,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: ViewTypeConfigurationComponent.allButThumbnail,
  }

  /** Background layer URL validators */
  static BACKGROUND_LAYER_URL_VALIDATORS = [ValidationHelpers.required, ValidationHelpers.url]

  /** Sort available layer types (to not perform it at render time) */
  static SORTED_MIZAR_LAYER_TYPES = UIDomain.MIZAR_LAYER_TYPES.sort(StringComparison.compare)

  static SORTED_CESIUM_LAYER_TYPES = UIDomain.CESIUM_LAYER_TYPES.sort(StringComparison.compare)

  /**
   * Builds view type / namespace and extracts view form data
   * @param {*} currrentTypeNamespace current entity type (views group) name space
   * @param {*} pageType page type
   * @param {*} currentTypeFormValues current form values for entity type
   * @return {{viewType: string, viewNamespace: string, viewFormValues: {*}}
   */
  static getViewFormData(currentTypeNamespace, pageType, currentTypeFormValues) {
    const viewType = ViewTypeConfigurationComponent.PAGE_TO_VIEW_TYPE[pageType]
    const viewNamespace = `${currentTypeNamespace}.views.${viewType}`
    return { viewType, viewNamespace, viewFormValues: currentTypeFormValues.views[viewType] }
  }

  /**
   * Computes if view is the last enabled in views group
   * @param {*} currentTypeFormValues current form values for entity type (views group)
   * @param {*} viewFormValues form values for view type
   * @return {boolean} true when view is the last one enabled in group, false otherwise
   */
  static isLastEnabledInViewsGroup(currentTypeFormValues, viewFormValues) {
    return viewFormValues.enabled
    && reduce(currentTypeFormValues.views, (acc, currViewFormValues) => currViewFormValues.enabled ? acc + 1 : acc, 0) === 1 // only that view is enabled
  }

  /**
   * @return {boolean} true (used as "no filter")
   */
  static all() {
    return true
  }

  /**
   * Returns true for all attributes but thumbnail (filters available attributes)
   * @param {*} attribute attribute matching AttributeModel shape
   * @return {boolean} false when thumbnail, true otherwise
   */
  static allButThumbnail(attribute) {
    return attribute.content.name !== DamDomain.AttributeModelController.standardAttributesKeys.thumbnail
  }

  static duplicateLayerInfo = (layerInfo) => layerInfo

  /**
   * User callback: enable view toggled. When disabling the view, make sure the group do not use that view
   * as initial one
   */
  onEnableViewToggled = () => {
    const {
      currentTypeNamespace, currentTypeFormValues, pageType, changeField,
    } = this.props
    const { viewType, viewFormValues } = ViewTypeConfigurationComponent
      .getViewFormData(currentTypeNamespace, pageType, currentTypeFormValues)
    const nextEnabled = !viewFormValues.enabled
    const nextTypeFormValues = {
      ...currentTypeFormValues,
      views: {
        ...currentTypeFormValues.views,
        // change in current view the enabled status
        [viewType]: {
          ...viewFormValues,
          enabled: nextEnabled,
        },
      },
    }
    // make sure group do not use this view type as initial one when it gets disabled
    if (!nextEnabled && nextTypeFormValues.initialMode === viewType) {
      // search fisrt enable view in next group values
      // note: we are sure here to find an enabled mode, as we disable the checkbox when this view type is the last one enabled
      nextTypeFormValues.initialMode = reduce(nextTypeFormValues.views, (foundKey, view, viewKey) => {
        if (!foundKey && view.enabled) {
          return viewKey
        }
        return foundKey
      }, null)
    }

    changeField(currentTypeNamespace, nextTypeFormValues)
  }

  renderLayerInfoItemLabel = (item) => {
    const layerName = item.layerName ? item.layerName : this.context.intl.formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.title' })
    const isBackgroundText = item.background ? this.context.intl.formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.background' }) : ''
    const viewMode = item.layerViewMode ? this.context.intl.formatMessage({ id: `search.results.form.configuration.result.MAP.viewMode.${item.layerViewMode}` }) : ''
    const isNotEnabledText = !item.enabled ? this.context.intl.formatMessage({ id: 'search.results.form.configuration.result.MAP.layers.not.enabled' }) : ''
    return filter([layerName, isBackgroundText, viewMode, isNotEnabledText], (text) => !isEmpty(text)).join(' - ')
  }

  /**
   * @param {*} value URL field value
   * @return error text when URL should be provided (view is enabled),
   */
  validateBackgroundURL = (value) => {
    const { currentTypeNamespace, currentTypeFormValues, pageType } = this.props
    const { viewFormValues } = ViewTypeConfigurationComponent
      .getViewFormData(currentTypeNamespace, pageType, currentTypeFormValues)
    return viewFormValues.enabled ? ValidationHelpers.required(value) || ValidationHelpers.url(value) : undefined
  }

  validateBackgroundConf = (value) => {
    if (value) {
      try {
        JSON.parse(value)
        return undefined
      } catch (error) {
        console.error('error', error)
        return 'search.results.form.configuration.result.MAP.background.layer.conf.invalid'
      }
    }
    return undefined
  }

  /**
   * Define props to pass to FieldArray component
   * @param {*} mapEngine : Either Mizar or Cesium. Allow to get correct menu item for each of them
   */
  getLayerProps = (mapEngine) => ({
    mapEngine,
    getMenuItems: this.getMenuItems,
    validateBackgroundURL: this.validateBackgroundURL,
    validateBackgroundConf: this.validateBackgroundConf,
  })

  /* Set menu items according to map engine selected */
  getMenuItems = (mapEngine) => {
    let sortedLayers = null
    switch (mapEngine) {
      case UIDomain.MAP_ENGINE_ENUM.MIZAR:
        sortedLayers = ViewTypeConfigurationComponent.SORTED_MIZAR_LAYER_TYPES
        break
      case UIDomain.MAP_ENGINE_ENUM.CESIUM:
        sortedLayers = ViewTypeConfigurationComponent.SORTED_CESIUM_LAYER_TYPES
        break
      default:
    }

    return map(sortedLayers, (type) => (
      <MenuItem
        key={type}
        value={type}
        primaryText={type}
      />
    ))
  }

  render() {
    const {
      pageType, availableAttributes,
      currentTypeNamespace, currentTypeFormValues, changeField,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content } } } = this.context
    const { viewType, viewNamespace, viewFormValues } = ViewTypeConfigurationComponent
      .getViewFormData(currentTypeNamespace, pageType, currentTypeFormValues)
    return (
      <div>
        <FieldsGroup spanFullWidth title={formatMessage({ id: `search.results.form.configuration.result.${viewType}.configuration` })}>
          {/* 1. Enable view. Locally controlled to change initial view type when disabling corresponding view */ }
          <Checkbox
            label={formatMessage({ id: 'search.results.form.configuration.result.enable.view' })}
            checked={viewFormValues.enabled}
            onCheck={this.onEnableViewToggled}
            disabled={ViewTypeConfigurationComponent.isLastEnabledInViewsGroup(currentTypeFormValues, viewFormValues)}
          />
        </FieldsGroup>
        {/* 2. Map engine, Map view mode (2D or 3D), background layers when in MAP */
        viewType === UIDomain.RESULTS_VIEW_MODES_ENUM.MAP ? (
          <>
            <FieldsGroup clearSpaceToChildren spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.MAP.engine' })}>
              <Field
                name={`${viewNamespace}.mapEngine`}
                component={RenderSelectField}
                label={formatMessage({ id: 'search.results.form.configuration.result.MAP.engine' })}
                fullWidth
              >
                {UIDomain.MAP_ENGINE.map((engine) => (
                  <MenuItem
                    key={engine}
                    value={engine}
                    primaryText={engine}
                  />))}
              </Field>
            </FieldsGroup>
            <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.MAP.viewMode.title' })}>
              <Field name={`${viewNamespace}.initialViewMode`} component={RenderRadio} defaultSelected={UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D}>
                {
                  map(UIDomain.MAP_VIEW_MODES_ENUM, (mapViewMode) => (
                    <RadioButton
                      key={mapViewMode}
                      label={formatMessage({ id: `search.results.form.configuration.result.MAP.viewMode.${mapViewMode}` })}
                      value={mapViewMode}
                    />
                  ))
                }
              </Field>
            </FieldsGroup>
            <FieldsGroup spanFullWidth title={formatMessage({ id: 'search.results.form.configuration.result.MAP.layers' })}>
              <FieldArray
                name={`${viewNamespace}.layers`}
                component={RenderArrayObjectField}
                elementLabel={this.renderLayerInfoItemLabel}
                fieldComponent={LayerInfoItemComponent}
                duplicationTransformation={ViewTypeConfigurationComponent.duplicateLayerInfo}
                canBeEmpty
                fieldProps={this.getLayerProps(viewFormValues.mapEngine)}
                listHeight="600px"
                validate={required}
              />
            </FieldsGroup>
          </>)
          : null
        }
        {/* 4. Attributes / groups to display */}
        <FieldsGroup spanFullWidth>
          <div style={content.tableFieldSpacer}>
            <AttributesListConfigurationComponent
              selectableAttributes={availableAttributes}
              // forbid thumbnail in map and quicklooks but allow it for all entity types (new REGARDS working mode)
              attributesFilter={ViewTypeConfigurationComponent.ATTRIBUTE_FILTER_BY_TYPE[viewType]}
              attributesList={viewFormValues.attributes}
              attributesListFieldName={`${viewNamespace}.attributes`}
              hintMessageKey={`search.results.form.configuration.result.${viewType}.no.attribute`}
              changeField={changeField}
              allowAttributesGroups={ViewTypeConfigurationComponent.TYPES_ALLOWING_GROUPS.includes(viewType)}
              allowLabel
              allowRendererSelection
            />
          </div>
        </FieldsGroup>
      </div>
    )
  }
}
export default ViewTypeConfigurationComponent
