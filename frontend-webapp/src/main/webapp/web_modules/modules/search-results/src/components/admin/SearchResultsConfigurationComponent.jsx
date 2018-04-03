/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardText } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { Field, RenderCheckbox, RenderTextField, RenderRadio, ValidationHelpers } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import AdminModuleConf from '../../models/AdminModuleConf'
import { DISPLAY_MODE_ENUM } from '../../definitions/DisplayModeEnum'
import { TableDisplayModeEnum } from '../../models/navigation/TableDisplayModeEnum'
import FormGroup from './FormGroup'

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
    initialFormValues: ModuleConfiguration,
    isCreating: PropTypes.bool,
    currentNamespace: PropTypes.string,
    // Redux form
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)

    // Redux form fields name
    this.MODULE_ATTRIBUTES_CONF = `${props.currentNamespace}.attributes`
    this.MODULE_ATTRIBUTES_QUICKLOOK_CONF = `${props.currentNamespace}.attributesQuicklook`
    this.MODULE_DATASET_ATTRIBUTES_CONF = `${props.currentNamespace}.datasetAttributes`
    this.MODULE_DOCUMENT_ATTRIBUTES_CONF = `${props.currentNamespace}.documentAttributes`
    this.MODULE_REGROUPEMENTS_CONF = `${props.currentNamespace}.attributesRegroupements`
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

  renderAttributesConfiguration = () => {
    const { currentFormValues, initialFormValues, adminConf } = this.props
    const displayMode = get(currentFormValues, 'displayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA)
    // Data
    // Uses the parent module list of available attributes if available, otherwise use the global list of data object attributes
    const selectableDataObjectsAttributes = get(adminConf, 'selectableDataObjectsAttributes', this.props.dataAttributeModels)
    const selectableDataSetsAttributes = get(adminConf, 'selectableDataSetsAttributes', this.props.datasetAttributeModels)

    const currentAttributesConf = get(currentFormValues, 'attributes', [])
    const initialAttributesConf = get(initialFormValues, 'attributes', [])
    const currentAttributesGroupsConf = get(currentFormValues, 'attributesRegroupements', [])
    const initialAttributesGroupsConf = get(initialFormValues, 'attributesRegroupements', [])
    const enableFacettes = get(currentFormValues, 'enableFacettes', false)
    const dataEnableQuicklook = get(currentFormValues, 'enableQuicklooks', false)

    // Dataset
    const currentDatasetAttributesConf = get(currentFormValues, 'datasetAttributes', [])
    const initialDatasetAttributesConf = get(initialFormValues, 'datasetAttributes', [])

    // Quicklook
    const currentAttributesQuicklookConf = get(currentFormValues, 'attributesQuicklook', [])
    const initialAttributesQuicklookConf = get(initialFormValues, 'attributesQuicklook', [])

    // Document
    const currentDocumentAttributesConf = get(currentFormValues, 'documentAttributes', [])
    const initialDocumentAttributesConf = get(initialFormValues, 'documentAttributes', [])

    switch (displayMode) {
      case DISPLAY_MODE_ENUM.DISPLAY_DATA:

        if (dataEnableQuicklook) {
          // return the Object attrs and Quicklook attrs HMI
          return (
            <Tabs>
              <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.conf.selection.tab.label' })}>
                {this.renderObjectsAttributesConfiguration(
                  selectableDataObjectsAttributes,
                  currentAttributesConf,
                  initialAttributesConf,
                  currentAttributesGroupsConf,
                  initialAttributesGroupsConf,
                  enableFacettes,
                )}
              </Tab>
              <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.quicklook.conf.selection.tab.label' })}>
                {this.renderObjectsQuicklookAttributesConfiguration(
                  currentAttributesQuicklookConf,
                  initialAttributesQuicklookConf,
                )}
              </Tab>
            </Tabs>
          )
        }
        // Only return attr HMI
        return this.renderObjectsAttributesConfiguration(
          selectableDataObjectsAttributes,
          currentAttributesConf,
          initialAttributesConf,
          currentAttributesGroupsConf,
          initialAttributesGroupsConf,
          enableFacettes,
        )
      case DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET:
        return (
          <Tabs>
            <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.conf.selection.tab.label' })}>
              {this.renderObjectsAttributesConfiguration(
                selectableDataObjectsAttributes,
                currentAttributesConf,
                initialAttributesConf,
                currentAttributesGroupsConf,
                initialAttributesGroupsConf,
                enableFacettes,
              )}
            </Tab>
            {/* Add Quicklook configuration if enabled */}
            {
              dataEnableQuicklook ? (
                <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.quicklook.conf.selection.tab.label' })}>
                  {this.renderObjectsQuicklookAttributesConfiguration(
                    currentAttributesQuicklookConf,
                    initialAttributesQuicklookConf,
                  )}
                </Tab>) : null
            }
            <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.dataset.conf.selection.tab.label' })}>
              {this.renderDatasetsAttributesConfiguration(
                selectableDataSetsAttributes,
                currentDatasetAttributesConf,
                initialDatasetAttributesConf,
              )}
            </Tab>
          </Tabs>)
      case DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT:
        return this.renderDocumentsAttributesConfiguration(
          currentDocumentAttributesConf,
          initialDocumentAttributesConf,
          enableFacettes,
        )
      default:
        throw new Error(`Unknow display type : ${displayMode}`)
    }
  }
  renderObjectsAttributesConfiguration = (selectableDataObjectAttributes, currentAttributesConf, initialAttributesConf, currentAttributesGroupsConf, initialAttributesGroupsConf, enableFacettes) => (
    <MainAttributesConfigurationComponent
      allowFacettes={enableFacettes}
      allowAttributesRegroupements
      attributesFieldName={this.MODULE_ATTRIBUTES_CONF}
      regroupementsFieldName={this.MODULE_REGROUPEMENTS_CONF}
      changeField={this.props.changeField}
      selectableAttributes={selectableDataObjectAttributes}

      attributesConf={currentAttributesConf}
      defaultAttributesConf={initialAttributesConf}

      attributesRegroupementsConf={currentAttributesGroupsConf}
      defaultAttributesRegroupementsConf={initialAttributesGroupsConf}
    />
  )


  renderObjectsQuicklookAttributesConfiguration = (currentAttributesConf, initialAttributesConf) => (
    <MainAttributesConfigurationComponent
      allowFacettes={false}
      allowAttributesRegroupements={false}
      attributesFieldName={this.MODULE_ATTRIBUTES_QUICKLOOK_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.dataAttributeModels}

      attributesConf={currentAttributesConf}
      defaultAttributesConf={initialAttributesConf}
    />
  )

  renderDatasetsAttributesConfiguration = (selectableDataSetsAttributes, currentDatasetAttributesConf, initialDatasetAttributesConf) => (
    <MainAttributesConfigurationComponent
      allowFacettes={false}
      allowAttributesRegroupements={false}
      attributesFieldName={this.MODULE_DATASET_ATTRIBUTES_CONF}
      changeField={this.props.changeField}
      selectableAttributes={selectableDataSetsAttributes}

      attributesConf={currentDatasetAttributesConf}
      defaultAttributesConf={initialDatasetAttributesConf}
    />
  )
  renderDocumentsAttributesConfiguration = (currentDocumentAttributesConf, initialDocumentAttributesConf, enableFacettes) => (
    <MainAttributesConfigurationComponent
      allowFacettes={enableFacettes}
      allowAttributesRegroupements={false}
      attributesFieldName={this.MODULE_DOCUMENT_ATTRIBUTES_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.documentAttributeModels}

      attributesConf={currentDocumentAttributesConf}
      defaultAttributesConf={initialDocumentAttributesConf}
    />
  )

  render() {
    const { adminConf, currentFormValues, currentNamespace } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { formContainer, formRow } } } = this.context

    const preventAdminToPickDocumentView = get(adminConf, 'preventAdminToPickDocumentView', false)
    const displayMode = get(currentFormValues, 'displayMode')
    const enableQuicklooks = get(currentFormValues, 'enableQuicklooks', false)
    const enableFacettes = get(currentFormValues, 'enableFacettes', false)

    return (
      <CardText className={formContainer.class}>
        <div className={formRow.class}>
          {/* Presentation pane initial state (title is provided by ModulePaneStateField) */}
          <FormGroup>
            <ModulePaneStateField currentNamespace={currentNamespace} />
          </FormGroup>
          {/* Results view tabs configuration */}
          <FormGroup titleKey="form.configuration.visible.tabs.message">
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
          </FormGroup>
        </div>
        <div className={formRow.class}>
          {/* Results options (facets, quicklooks...) */}
          <FormGroup titleKey="form.configuration.results.options.message">
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
          </FormGroup>
          {/* Initial view mode */}
          <FormGroup titleKey="form.configuration.result.initial.view.mode">
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
          </FormGroup>
        </div>
        <div className={formRow.class}>
          {/* Data view title configuration (only when displaying data and dataset, tab is hidden otherwise) */}
          <FormGroup titleKey="form.configuration.result.data.titles.message">
            <Field
              name={this.CONF_DATA_SECTION_LABEL_FR}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.data.section.label.fr' })}
              disabled={displayMode !== DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              fullWidth
            />
            <Field
              name={this.CONF_DATA_SECTION_LABEL_EN}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.data.section.label.en' })}
              disabled={displayMode !== DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              fullWidth
            />
          </FormGroup>
          {/* Datasets view title configuration (only when displaying data and dataset, tab is hidden otherwise) */}
          <FormGroup titleKey="form.configuration.result.datasets.title.message">
            <Field
              name={this.CONF_DATASETS_SECTION_LABEL_FR}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.datasets.section.label.fr' })}
              disabled={displayMode !== DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              fullWidth
            />
            <Field
              name={this.CONF_DATASETS_SECTION_LABEL_EN}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.datasets.section.label.en' })}
              disabled={displayMode !== DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              fullWidth
            />
          </FormGroup>
        </div>
        <div className={formRow.class}>
          {/* Quicklooks configuration */}
          <FormGroup titleKey="form.configuration.results.quicklooks.message">
            <Field
              name={this.CONF_QUICKLOOKS_WIDTH}
              component={RenderTextField}
              type="number"
              label={formatMessage({ id: 'form.configuration.result.width.quicklooks.label' })}
              fullWidth
              normalize={parseIntNormalizer}
              disabled={!enableQuicklooks || displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
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
              disabled={!enableQuicklooks || displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
              validate={this.validateQuicklookNumberField}
              parse={this.parsePositiveIntNumber}
            />
          </FormGroup>
        </div>
        <div className={formRow.class}>
          {/* Tab views attibutes configuration titles */}
          <FormGroup spanFullWidth titleKey="form.attributes.configuration.section.title">
            {this.renderAttributesConfiguration()}
          </FormGroup>
        </div>
      </CardText>
    )
  }
}

export default SearchResultsConfigurationComponent
