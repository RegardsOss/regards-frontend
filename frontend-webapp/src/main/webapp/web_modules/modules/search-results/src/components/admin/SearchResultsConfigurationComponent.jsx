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
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { Title } from '@regardsoss/components'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Field, RenderCheckbox, RenderTextField } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import AdminModuleConf from '../../models/AdminModuleConf'
import { DISPLAY_MODE_ENUM } from '../../definitions/DisplayModeEnum'


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
    initialFormValues: ModuleConfiguration.isRequired,
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
    this.CONF_ENABLE_QUICKLOOKS = `${props.currentNamespace}.enableQuicklooks`
    this.CONF_QUICKLOOKS_WIDTH = `${props.currentNamespace}.displayConf.quicklookColumnWidth`
    this.CONF_QUICKLOOKS_SPACING = `${props.currentNamespace}.displayConf.quicklookColumnSpacing`
    this.CONF_ENABLE_DOWNLOAD = `${props.currentNamespace}.enableDownload`
    this.CONF_DATASETS_SECTION_LABEL_FR = `${props.currentNamespace}.datasetsSectionLabelFr`
    this.CONF_DATASETS_SECTION_LABEL_EN = `${props.currentNamespace}.datasetsSectionLabelEn`
    this.CONF_DATA_SECTION_LABEL_FR = `${props.currentNamespace}.dataSectionLabelFr`
    this.CONF_DATA_SECTION_LABEL_EN = `${props.currentNamespace}.dataSectionLabelEn`
  }

  componentDidMount() {
    // Set a default value
    if (this.props.isCreating) {
      // Display mode is either provided by the parent module either fallback to default value
      this.props.changeField(this.MODULE_DISPLAY_MODE, get(this.props.adminConf, 'initialDisplayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA))
      this.props.changeField(this.CONF_ENABLE_QUICKLOOKS, false)
      this.props.changeField(this.CONF_QUICKLOOKS_WIDTH, 400)
      this.props.changeField(this.CONF_QUICKLOOKS_SPACING, 20)
    }
  }

  changeDisplayMode = (event, value) => {
    this.props.changeField(this.MODULE_DISPLAY_MODE, value)
    if (value === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT) {
      this.props.changeField(this.CONF_ENABLE_FACETTES, false)
      this.props.changeField(this.CONF_ENABLE_QUICKLOOKS, 400)
      this.props.changeField(this.CONF_QUICKLOOKS_SPACING, 20)
    }
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
    const { topOptions, textFieldStyle } = this.context.moduleTheme.configuration
    const preventAdminToPickDocumentView = get(this.props.adminConf, 'preventAdminToPickDocumentView', false)
    const displayMode = get(this.props.currentFormValues, 'displayMode')
    const enableQuicklooks = get(this.props.currentFormValues, 'enableQuicklooks', false)
    return (
      <CardText>
        <Title
          level={3}
          label={this.context.intl.formatMessage({ id: 'form.configuration.tab.title' })}
        />
        <div style={topOptions.styles}>
          <RadioButtonGroup
            onChange={this.changeDisplayMode}
            valueSelected={displayMode}
            name="__display_mode"
          >
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DATA}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.data' })}
            />
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.data_datasets' })}
            />
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.documents' })}
              disabled={preventAdminToPickDocumentView}
            />
          </RadioButtonGroup>
          <Field
            name={this.CONF_ENABLE_FACETTES}
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.facettes.label' })}
          />
          <Field
            name={this.CONF_ENABLE_QUICKLOOKS}
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.quicklooks.label' })}
            disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
          />
          <ShowableAtRender show={enableQuicklooks}>
            <Field
              name={this.CONF_QUICKLOOKS_WIDTH}
              component={RenderTextField}
              type="number"
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.width.quicklooks.label' })}
              fullWidth
              normalize={parseIntNormalizer}
              disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
            />
            <Field
              name={this.CONF_QUICKLOOKS_SPACING}
              component={RenderTextField}
              type="number"
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.spacing.quicklooks.label' })}
              fullWidth
              normalize={parseIntNormalizer}
              disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
            />
          </ShowableAtRender>
          <Field
            style={textFieldStyle}
            name={this.CONF_ENABLE_DOWNLOAD}
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.download.label' })}
          />
          <div>
            <Field
              style={textFieldStyle}
              name={this.CONF_DATASETS_SECTION_LABEL_FR}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.datasets.section.label.fr' })}
            />
            <Field
              style={textFieldStyle}
              name={this.CONF_DATASETS_SECTION_LABEL_EN}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.datasets.section.label.en' })}
            />
          </div>
          <div>
            <Field
              style={textFieldStyle}
              name={this.CONF_DATA_SECTION_LABEL_FR}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.data.section.label.fr' })}
            />
            <Field
              style={textFieldStyle}
              name={this.CONF_DATA_SECTION_LABEL_EN}
              component={RenderTextField}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.data.section.label.en' })}
            />
          </div>
        </div>
        {this.renderAttributesConfiguration()}
      </CardText>
    )
  }
}

export default SearchResultsConfigurationComponent
