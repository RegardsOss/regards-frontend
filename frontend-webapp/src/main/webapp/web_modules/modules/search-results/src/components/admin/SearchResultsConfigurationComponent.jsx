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
import { AccessShapes } from '@regardsoss/shape'
import { Title } from '@regardsoss/components'
import { ShowableAtRender } from '@regardsoss/display-control'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Field, RenderCheckbox, RenderTextField } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import { DISPLAY_MODE_ENUM } from '../../definitions/DisplayModeEnum'


const parseIntNormalizer = value => parseInt(value, 10)
/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class SearchResultsConfigurationComponent extends React.Component {
  // Redux form
  static MODULE_ATTRIBUTES_CONF = 'conf.attributes'
  static MODULE_ATTRIBUTES_QUICKLOOK_CONF = 'conf.attributesQuicklook'
  static MODULE_DATASET_ATTRIBUTES_CONF = 'conf.datasetAttributes'
  static MODULE_DOCUMENT_ATTRIBUTES_CONF = 'conf.documentAttributes'
  static MODULE_REGROUPEMENTS_CONF = 'conf.attributesRegroupements'
  static MODULE_DISPLAY_MODE = 'conf.displayMode'
  static CONF_ENABLE_FACETTES = 'conf.enableFacettes'
  static CONF_ENABLE_QUICKLOOKS = 'conf.enableQuicklooks'
  static CONF_QUICKLOOKS_WIDTH = 'conf.displayConf.quicklookColumnWidth'
  static CONF_QUICKLOOKS_SPACING = 'conf.displayConf.quicklookColumnSpacing'

  static propTypes = {
    dataAttributeModels: AccessShapes.AttributeConfigurationList,
    datasetAttributeModels: AccessShapes.AttributeConfigurationList,
    documentAttributeModels: AccessShapes.AttributeConfigurationList,
    currentFormValues: ModuleConfiguration,
    initialFormValues: ModuleConfiguration.isRequired,
    isCreating: PropTypes.bool,
    // Redux form
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount() {
    // Set a default value for display mode
    if (this.props.isCreating) {
      this.props.changeField(SearchResultsConfigurationComponent.MODULE_DISPLAY_MODE, DISPLAY_MODE_ENUM.DISPLAY_DATA)
      this.props.changeField(SearchResultsConfigurationComponent.CONF_QUICKLOOKS_WIDTH, 400)
      this.props.changeField(SearchResultsConfigurationComponent.CONF_QUICKLOOKS_SPACING, 20)
    }
  }

  changeDisplayMode = (event, value) => {
    this.props.changeField(SearchResultsConfigurationComponent.MODULE_DISPLAY_MODE, value)
    if (value === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT) {
      this.props.changeField(SearchResultsConfigurationComponent.CONF_ENABLE_FACETTES, false)
      this.props.changeField(SearchResultsConfigurationComponent.CONF_ENABLE_QUICKLOOKS, 400)
      this.props.changeField(SearchResultsConfigurationComponent.CONF_QUICKLOOKS_SPACING, 20)
    }
  }

  renderAttributesConfiguration = () => {
    const { currentFormValues, initialFormValues } = this.props
    const displayMode = get(currentFormValues, 'displayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA)
    // Data
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
  renderObjectsAttributesConfiguration = (currentAttributesConf, initialAttributesConf, currentAttributesGroupsConf, initialAttributesGroupsConf, enableFacettes) => (
    <MainAttributesConfigurationComponent
      allowFacettes={enableFacettes}
      allowAttributesRegroupements
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_ATTRIBUTES_CONF}
      regroupementsFieldName={SearchResultsConfigurationComponent.MODULE_REGROUPEMENTS_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.dataAttributeModels}

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
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_ATTRIBUTES_QUICKLOOK_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.dataAttributeModels}

      attributesConf={currentAttributesConf}
      defaultAttributesConf={initialAttributesConf}
    />
  )

  renderDatasetsAttributesConfiguration = (currentDatasetAttributesConf, initialDatasetAttributesConf) => (
    <MainAttributesConfigurationComponent
      allowFacettes={false}
      allowAttributesRegroupements={false}
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_DATASET_ATTRIBUTES_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.datasetAttributeModels}

      attributesConf={currentDatasetAttributesConf}
      defaultAttributesConf={initialDatasetAttributesConf}
    />
  )
  renderDocumentsAttributesConfiguration = (currentDocumentAttributesConf, initialDocumentAttributesConf, enableFacettes) => (
    <MainAttributesConfigurationComponent
      allowFacettes={enableFacettes}
      allowAttributesRegroupements={false}
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_DOCUMENT_ATTRIBUTES_CONF}
      changeField={this.props.changeField}
      selectableAttributes={this.props.documentAttributeModels}

      attributesConf={currentDocumentAttributesConf}
      defaultAttributesConf={initialDocumentAttributesConf}
    />
  )

  render() {
    const { topOptions } = this.context.moduleTheme.configuration
    const preventAdminToPickDocumentView = get(this.props.initialFormValues, 'preventAdminToPickDocumentView', false)
    const displayMode = get(this.props.currentFormValues, 'displayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA)
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
            name={SearchResultsConfigurationComponent.CONF_ENABLE_FACETTES}
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.facettes.label' })}
          />
          <Field
            name={SearchResultsConfigurationComponent.CONF_ENABLE_QUICKLOOKS}
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.quicklooks.label' })}
            disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
          />
          <ShowableAtRender show={enableQuicklooks}>
            <Field
              name={SearchResultsConfigurationComponent.CONF_QUICKLOOKS_WIDTH}
              component={RenderTextField}
              type="number"
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.width.quicklooks.label' })}
              fullWidth
              normalize={parseIntNormalizer}
              disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
            />
            <Field
              name={SearchResultsConfigurationComponent.CONF_QUICKLOOKS_SPACING}
              component={RenderTextField}
              type="number"
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.spacing.quicklooks.label' })}
              fullWidth
              normalize={parseIntNormalizer}
              disabled={displayMode === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
            />
          </ShowableAtRender>
          <Field
            name="conf.enableDownload"
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.download.label' })}
          />
        </div>
        {this.renderAttributesConfiguration()}
      </CardText>
    )
  }
}

export default SearchResultsConfigurationComponent
