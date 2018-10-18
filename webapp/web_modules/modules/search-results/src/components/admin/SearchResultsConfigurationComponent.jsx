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
import { Tabs, Tab } from 'material-ui/Tabs'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import {
  Field, RenderCheckbox, RenderTextField, RenderRadio, ValidationHelpers,
  FormPresentation, FormRow, FieldsGroup,
} from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/display-control'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import AdminModuleConf from '../../models/AdminModuleConf'
import { DISPLAY_MODE_ENUM } from '../../definitions/DisplayModeEnum'
import { TableDisplayModeEnum } from '../../models/navigation/TableDisplayModeEnum'

const parseIntNormalizer = value => parseInt(value, 10)

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class SearchResultsConfigurationComponent extends React.Component {
  static propTypes = {
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    datasetAttributeModels: DataManagementShapes.AttributeModelList,
    documentAttributeModels: DataManagementShapes.AttributeModelList,
    currentFormValues: ModuleConfiguration,
    adminConf: AdminModuleConf,
    isCreating: PropTypes.bool,
    currentNamespace: PropTypes.string,
    // Redux form
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Sub fields in view fields to access columns edition model */
  static VIEW_COLUMNS_SUBFIELD = 'columns'

  /** Sub fields in view fields to access facets edition model */
  static VIEW_FACETS_SUBFIELD = 'facets'

  /** Sub fields in view fields to access sorting edition model */
  static VIEW_SORTING_SUBFIELD = 'sorting'

  /**
   * Data for each edition view tab (data/quicklook/document/dataset). It allows iterating on tabs to create
   * the form.
   * Note: allow facets means it is allowed for type, but the current form value should be checked
   */
  static EDITION_TAB = {
    data: {
      tabTitleKey: 'form.attribute.conf.selection.tab.label',
      fieldName: 'data',
      allowFacets: true,
      allowSorting: true,
      allowAttributesRegroupements: true,
    },
    quicklook: {
      tabTitleKey: 'form.attribute.quicklook.conf.selection.tab.label',
      fieldName: 'quicklook',
      allowFacets: true,
      allowSorting: true,
      allowAttributesRegroupements: false,
    },
    dataset: {
      tabTitleKey: 'form.attribute.dataset.conf.selection.tab.label',
      fieldName: 'dataset',
      allowFacets: false,
      allowSorting: false,
      allowAttributesRegroupements: true,
    },
    document: {
      tabTitleKey: 'form.attribute.document.conf.selection.tab.label', // this key has no message as such tab is always single (used as component key)
      fieldName: 'document',
      allowFacets: true,
      allowSorting: true,
      allowAttributesRegroupements: true,
    },
  }


  constructor(props) {
    super(props)

    // Redux form fields name
    this.MODULE_DISPLAY_MODE = `${props.currentNamespace}.displayMode`
    this.CONF_ENABLE_FACETTES = `${props.currentNamespace}.enableFacettes`
    this.CONF_FACETS_INITIALLY_SELECTED = `${props.currentNamespace}.facettesInitiallySelected`
    this.CONF_ENABLE_QUICKLOOKS = `${props.currentNamespace}.enableQuicklooks`
    this.CONF_QUICKLOOKS_WIDTH = `${props.currentNamespace}.displayConf.quicklookColumnWidth`
    this.CONF_QUICKLOOKS_SPACING = `${props.currentNamespace}.displayConf.quicklookColumnSpacing`
    this.CONF_ENABLE_DOWNLOAD = `${props.currentNamespace}.enableDownload`
    this.CONF_INITIAL_VIEW_MODE = `${props.currentNamespace}.initialViewMode`
    this.CONF_DATASETS_SECTION_LABEL_FR = `${props.currentNamespace}.datasetsSectionLabelFr`
    this.CONF_DATASETS_SECTION_LABEL_EN = `${props.currentNamespace}.datasetsSectionLabelEn`
    this.CONF_DATA_SECTION_LABEL_FR = `${props.currentNamespace}.dataSectionLabelFr`
    this.CONF_DATA_SECTION_LABEL_EN = `${props.currentNamespace}.dataSectionLabelEn`
  }

  componentDidMount() {
    const {
      isCreating, changeField, adminConf, currentNamespace,
    } = this.props
    // Set a default value
    if (isCreating) {
      // Display mode is either provided by the parent module either fallback to default value
      changeField(this.MODULE_DISPLAY_MODE, get(adminConf, 'initialDisplayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA))
      // Primary pane state is either provided by the parent module either fallback to default value
      changeField(`${currentNamespace}.primaryPane`,
        get(adminConf, 'primaryPane', UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE))
      changeField(this.CONF_ENABLE_QUICKLOOKS, false)
      changeField(this.CONF_QUICKLOOKS_WIDTH, 400)
      changeField(this.CONF_QUICKLOOKS_SPACING, 20)
    }
  }

  /**
   * User changed display mode, block unavailble document options when user selected documents
   */
  onChangeDisplayMode = (event, value) => {
    const { currentFormValues, changeField } = this.props
    changeField(this.MODULE_DISPLAY_MODE, value)
    // forbid quick looks in document mode
    if (value === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT) {
      changeField(this.CONF_ENABLE_QUICKLOOKS, false)
    }
    // forbid initial view as quicklook in documents (no quicklook) and data/datasets (initial view mode is dataset, that has no quicklook)
    if (value === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT || value === DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET) {
      // if the selected view mode is quicklook, reset it
      const initialViewMode = get(currentFormValues, 'initialViewMode')
      if (initialViewMode === TableDisplayModeEnum.QUICKLOOK) {
        changeField(this.CONF_INITIAL_VIEW_MODE, TableDisplayModeEnum.LIST)
      }
    }
  }

  /**
   * User changed the facets option: update initially selected facets if he disabled it
   */
  onSwitchFacetsEnabled = (event, enabled) => {
    const { changeField } = this.props
    if (!enabled) {
      changeField(this.CONF_FACETS_INITIALLY_SELECTED, false)
    }
  }

  /**
   * User changed the facets option: update initially selected facets if he disabled it
   */
  onSwitchQuicklooksEnabled = (event, enabled) => {
    const { changeField, currentFormValues } = this.props
    const initialViewMode = get(currentFormValues, 'initialViewMode')
    // change initial view mode when user disables quicklooks but quicklooks are selected as default
    if (!enabled && initialViewMode === TableDisplayModeEnum.QUICKLOOK) {
      changeField(this.CONF_INITIAL_VIEW_MODE, TableDisplayModeEnum.LIST)
    }
  }


  /**
   * Parses number value in number field
   * @param {string} value number field value
   * @return parsed value
   */
  parsePositiveIntNumber = (value) => {
    const parsedValue = parseFloat(value)
    return Number.isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue
  }

  /**
   * Validates the quicklook number field
   * @param value field value
   * @param values form values
   * @return error if any, undefined otherwise
   */
  validateQuicklookNumberField = (value, values) => {
    const isQuicklookEnabled = get(values, this.CONF_ENABLE_QUICKLOOKS)
    if (isQuicklookEnabled) {
      // validate required positive number
      return ValidationHelpers.required(value) || ValidationHelpers.positiveIntNumber(value)
    }
    return undefined
  }

  /**
   * Renders attribute (columns and facets) configuration for current view modes
   */
  renderAttributesConfiguration = () => {
    const { currentFormValues, adminConf } = this.props
    const displayMode = get(currentFormValues, 'displayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA)

    // 1 - compute rendered tabs values according with DISPLAY_MODE
    const enableFacettes = get(currentFormValues, 'enableFacettes', false)
    const dataEnableQuicklook = get(currentFormValues, 'enableQuicklooks', false)
    const selectableDataAttributes = get(adminConf, 'selectableDataObjectsAttributes', this.props.dataAttributeModels)
    const selectableDatasetAttributes = get(adminConf, 'selectableDataSetsAttributes', this.props.datasetAttributeModels)
    const tabViewsData = []
    switch (displayMode) {
      case DISPLAY_MODE_ENUM.DISPLAY_DATA:
        tabViewsData.push({ // DATA
          ...SearchResultsConfigurationComponent.EDITION_TAB.data,
          allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.data.allowFacets && enableFacettes,
          selectableAttributes: selectableDataAttributes,
          specificViewRender: this.renderDataSpecificGroups, // user must also give view labels
        })
        if (dataEnableQuicklook) { // QUICKLOOKS when enabled
          tabViewsData.push({
            ...SearchResultsConfigurationComponent.EDITION_TAB.quicklook,
            allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.quicklook.allowFacets && enableFacettes,
            selectableAttributes: selectableDataAttributes,
            specificViewRender: this.renderQuiklookSpecificFieldsGroups,
          })
        }
        break
      case DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET:
        tabViewsData.push({ // data
          ...SearchResultsConfigurationComponent.EDITION_TAB.data,
          allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.data.allowFacets && enableFacettes,
          selectableAttributes: selectableDataAttributes,
          specificViewRender: this.renderDataSpecificGroups, // user must also give view labels
        })
        if (dataEnableQuicklook) { // quicklook when enabled
          tabViewsData.push({
            ...SearchResultsConfigurationComponent.EDITION_TAB.quicklook,
            allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.quicklook.allowFacets && enableFacettes,
            selectableAttributes: selectableDataAttributes,
            specificViewRender: this.renderQuiklookSpecificFieldsGroups,
          })
        }
        tabViewsData.push({ // dataset
          ...SearchResultsConfigurationComponent.EDITION_TAB.dataset,
          allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.dataset.allowFacets && enableFacettes,
          selectableAttributes: selectableDatasetAttributes,
          specificViewRender: this.renderDatasetSpecificFieldsGroups,
        })
        break
      case DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT:
        tabViewsData.push({ // document
          ...SearchResultsConfigurationComponent.EDITION_TAB.document,
          allowFacets: SearchResultsConfigurationComponent.EDITION_TAB.document.allowFacets && enableFacettes,
          selectableAttributes: this.props.documentAttributeModels,
        })
        break
      default:
        throw new Error(`Unknow display type : ${displayMode}`)
    }

    // 2 - map each view tab to render
    if (tabViewsData.length > 1) {
      // render in tabs
      return (
        <Tabs style={this.context.moduleTheme.configuration.viewTabsContainer.style}>
          {tabViewsData.map(this.renderViewModeTab)}
        </Tabs>)
    }
    // render directly (without wrapping tabs). Note: we assert here the there array is never empty
    return this.renderViewModeForm(tabViewsData[0])
  }

  /**
   * Renders a view mode in a tab
   * @param {*} tabViewData tab view data as built by renderAttributesConfiguration
   * @return built render element
   */
  renderViewModeTab = tabViewData => (
    <Tab
      key={tabViewData.tabTitleKey}
      label={this.context.intl.formatMessage({ id: tabViewData.tabTitleKey })}
    >
      {this.renderViewModeForm(tabViewData)}
    </Tab>)


  /**
   * Renders a view mode form content
   * @param {*} tabViewData tab view data as built by renderAttributesConfiguration
   * @return built render element rendering columns, facets (if allowed) and initial sorting (if allowed) edition arrays
   */
  renderViewModeForm = ({
    fieldName, allowFacets, allowSorting,
    allowAttributesRegroupements, selectableAttributes,
    specificViewRender = null, // optional specific view form render
  }) => {
    const { currentFormValues, currentNamespace, changeField } = this.props
    const { formatMessage } = this.context.intl
    const columnsSubField = `${fieldName}.${SearchResultsConfigurationComponent.VIEW_COLUMNS_SUBFIELD}`
    const facetsSubField = `${fieldName}.${SearchResultsConfigurationComponent.VIEW_FACETS_SUBFIELD}`
    const sortingSubField = `${fieldName}.${SearchResultsConfigurationComponent.VIEW_SORTING_SUBFIELD}`
    return (
      <React.Fragment>
        {/* 0. Show all specific view type fields, if any */
          specificViewRender ? specificViewRender() : null
        }
        {/* 1. Columns for view */}
        <FieldsGroup spanFullWidth title={formatMessage({ id: 'form.attribute.conf.columns' })}>
          <AttributesListConfigurationComponent
            selectableAttributes={selectableAttributes}
            attributesList={get(currentFormValues, columnsSubField, [])}
            attributesListFieldName={`${currentNamespace}.${columnsSubField}`}
            hintMessageKey="form.attribute.conf.no.column"
            changeField={changeField}
            allowAttributesRegroupements={allowAttributesRegroupements}
            allowLabel
          />
        </FieldsGroup>
        {/* 2. Facets for view */}
        <ShowableAtRender show={allowFacets}>
          <FieldsGroup title={formatMessage({ id: 'form.attribute.conf.facets' })}>
            <AttributesListConfigurationComponent
              selectableAttributes={selectableAttributes}
              attributesList={get(currentFormValues, facetsSubField, [])}
              attributesListFieldName={`${currentNamespace}.${facetsSubField}`}
              hintMessageKey="form.attribute.conf.no.facet"
              changeField={changeField}
              allowAttributesRegroupements={false}
              allowLabel
              attributesFilter={DamDomain.AttributeModelController.isSearchableAttribute}
            />
          </FieldsGroup>
        </ShowableAtRender>
        {/* 3. Sorting elements */}
        <ShowableAtRender show={allowSorting}>
          <FieldsGroup title={formatMessage({ id: 'form.attribute.conf.sorting' })}>
            <AttributesListConfigurationComponent
              selectableAttributes={selectableAttributes}
              attributesList={get(currentFormValues, sortingSubField, [])}
              attributesListFieldName={`${currentNamespace}.${sortingSubField}`}
              hintMessageKey="form.attribute.conf.no.sorting"
              changeField={changeField}
              allowAttributesRegroupements={false}
              allowLabel={false}
              attributesFilter={DamDomain.AttributeModelController.isSearchableAttribute}
            />
          </FieldsGroup>
        </ShowableAtRender>
      </React.Fragment>)
  }

  /**
   * @return specific field groups for data view
   */
  renderDataSpecificGroups = () => {
    // Dataset tab labels group, when displaying datasets
    const { currentFormValues } = this.props
    const displayMode = get(currentFormValues, 'displayMode')
    const { intl: { formatMessage } } = this.context
    return displayMode === DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET ? (
      <FieldsGroup clearSpaceToChildren spanFullWidth title={formatMessage({ id: 'form.configuration.result.data.titles.message' })}>
        <Field
          name={this.CONF_DATA_SECTION_LABEL_EN}
          component={RenderTextField}
          label={formatMessage({ id: 'form.configuration.result.data.section.label.en' })}
          fullWidth
        />
        <Field
          name={this.CONF_DATA_SECTION_LABEL_FR}
          component={RenderTextField}
          label={formatMessage({ id: 'form.configuration.result.data.section.label.fr' })}
          fullWidth
        />
      </FieldsGroup>) : null
  }

  /**
   * @return specific field groups for quicklook view
   */
  renderQuiklookSpecificFieldsGroups = () => {
    const { intl: { formatMessage } } = this.context
    return (
      <FieldsGroup clearSpaceToChildren spanFullWidth title={formatMessage({ id: 'form.configuration.results.quicklooks.message' })}>
        <Field
          name={this.CONF_QUICKLOOKS_WIDTH}
          component={RenderTextField}
          type="number"
          label={formatMessage({ id: 'form.configuration.result.width.quicklooks.label' })}
          fullWidth
          normalize={parseIntNormalizer}
          validate={this.validateQuicklookNumberField}
          parse={this.parsePositiveIntNumber}
        />
        <Field
          name={this.CONF_QUICKLOOKS_SPACING}
          component={RenderTextField}
          type="number"
          label={formatMessage({ id: 'form.configuration.result.spacing.quicklooks.label' })}
          fullWidth
          normalize={parseIntNormalizer}
          validate={this.validateQuicklookNumberField}
          parse={this.parsePositiveIntNumber}
        />
      </FieldsGroup>)
  }

  /**
   * @return specific field groups for data view
   */
  renderDatasetSpecificFieldsGroups = () => {
    const { currentFormValues } = this.props
    const displayMode = get(currentFormValues, 'displayMode')
    const { intl: { formatMessage } } = this.context
    // Dataset tab labels group, when displaying datasets
    return displayMode === DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET ? (
      <FieldsGroup clearSpaceToChildren spanFullWidth title={formatMessage({ id: 'form.configuration.result.datasets.title.message' })}>
        <Field
          name={this.CONF_DATASETS_SECTION_LABEL_EN}
          component={RenderTextField}
          label={formatMessage({ id: 'form.configuration.result.datasets.section.label.en' })}
          fullWidth
        />
        <Field
          name={this.CONF_DATASETS_SECTION_LABEL_FR}
          component={RenderTextField}
          label={formatMessage({ id: 'form.configuration.result.datasets.section.label.fr' })}
          fullWidth
        />
      </FieldsGroup>) : null
  }

  render() {
    const { adminConf, currentFormValues, currentNamespace } = this.props
    const { intl: { formatMessage } } = this.context

    const preventAdminToPickDocumentView = get(adminConf, 'preventAdminToPickDocumentView', false)
    const displayMode = get(currentFormValues, 'displayMode')
    const enableFacettes = get(currentFormValues, 'enableFacettes', false)

    return (
      <FormPresentation>
        <FormRow>
          {/* Presentation pane initial state (title is provided by ModulePaneStateField) */}
          <FieldsGroup>
            <ModulePaneStateField currentNamespace={currentNamespace} />
          </FieldsGroup>
          {/* Results view tabs configuration */}
          <FieldsGroup title={formatMessage({ id: 'form.configuration.visible.tabs.message' })}>
            <RadioButtonGroup
              onChange={this.onChangeDisplayMode}
              valueSelected={displayMode}
              name="__display_mode"
            >
              <RadioButton
                value={DISPLAY_MODE_ENUM.DISPLAY_DATA}
                label={formatMessage({ id: 'form.configuration.result.type.data' })}
              />
              <RadioButton
                value={DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
                label={formatMessage({ id: 'form.configuration.result.type.data_datasets' })}
              />
              <RadioButton
                value={DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
                label={formatMessage({ id: 'form.configuration.result.type.documents' })}
                disabled={preventAdminToPickDocumentView}
              />
            </RadioButtonGroup>
          </FieldsGroup>
        </FormRow>
        <FormRow>
          {/* Results options (facets, quicklooks...) */}
          <FieldsGroup title={formatMessage({ id: 'form.configuration.results.options.message' })}>
            <Field
              name={this.CONF_ENABLE_FACETTES}
              onChange={this.onSwitchFacetsEnabled}
              component={RenderCheckbox}
              label={formatMessage({ id: 'form.configuration.result.enable.facettes.label' })}
              noSpacing
            />
            <Field
              name={this.CONF_FACETS_INITIALLY_SELECTED}
              component={RenderCheckbox}
              label={formatMessage({ id: 'form.configuration.result.select.facettes.initially.label' })}
              disabled={!enableFacettes}
              noSpacing
            />
            <Field
              name={this.CONF_ENABLE_QUICKLOOKS}
              component={RenderCheckbox}
              label={formatMessage({ id: 'form.configuration.result.enable.quicklooks.label' })}
              disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
              onChange={this.onSwitchQuicklooksEnabled}
              noSpacing
            />
            <Field
              name={this.CONF_ENABLE_DOWNLOAD}
              component={RenderCheckbox}
              label={formatMessage({ id: 'form.configuration.result.enable.download.label' })}
              noSpacing
            />
          </FieldsGroup>
          {/* Initial view mode */}
          <FieldsGroup title={formatMessage({ id: 'form.configuration.result.initial.view.mode' })}>
            <Field
              name={this.CONF_INITIAL_VIEW_MODE}
              component={RenderRadio}
              defaultSelected={TableDisplayModeEnum.LIST}
            >
              <RadioButton
                label={formatMessage({ id: 'form.configuration.result.show.list.initially' })}
                value={TableDisplayModeEnum.LIST}
              />
              <RadioButton
                label={formatMessage({ id: 'form.configuration.result.show.table.initially' })}
                value={TableDisplayModeEnum.TABLE}
              />
              <RadioButton
                label={formatMessage({ id: 'form.configuration.result.show.quicklook.initially' })}
                value={TableDisplayModeEnum.QUICKLOOK}
                disabled={displayMode !== DISPLAY_MODE_ENUM.DISPLAY_DATA}
              />
            </Field>
          </FieldsGroup>
        </FormRow>
        <FormRow>
          { /* Tab views attibutes configuration titles */
            this.renderAttributesConfiguration()
          }
        </FormRow>
      </FormPresentation>
    )
  }
}

export default SearchResultsConfigurationComponent
