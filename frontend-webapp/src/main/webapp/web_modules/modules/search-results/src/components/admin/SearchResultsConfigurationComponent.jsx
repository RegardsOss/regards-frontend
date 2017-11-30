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
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Field, RenderCheckbox } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import { DISPLAY_MODE_ENUM } from '../../definitions/DisplayModeEnum'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class SearchResultsConfigurationComponent extends React.Component {
  // Redux form
  static MODULE_ATTRIBUTES_CONF = 'conf.attributes'
  static MODULE_DATASET_ATTRIBUTES_CONF = 'conf.datasetAttributes'
  static MODULE_DOCUMENT_ATTRIBUTES_CONF = 'conf.documentAttributes'
  static MODULE_REGROUPEMENTS_CONF = 'conf.attributesRegroupements'
  static MODULE_DISPLAY_MODE = 'conf.displayMode'
  static CONF_ENABLE_FACETTES = 'conf.enableFacettes'

  static propTypes = {
    dataAttributeModels: AccessShapes.AttributeConfigurationList,
    datasetAttributeModels: AccessShapes.AttributeConfigurationList,
    documentAttributeModels: AccessShapes.AttributeConfigurationList,
    currentFormValues: ModuleConfiguration,
    initialFormValues: ModuleConfiguration.isRequired,
    // Redux form
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount() {
    // Set a default value for display mode
    if (!this.props.initialFormValues) {
      this.props.changeField(SearchResultsConfigurationComponent.MODULE_DISPLAY_MODE, DISPLAY_MODE_ENUM.DISPLAY_DATA)
    }
  }
  changeDisplayMode = (event, value) => {
    this.props.changeField(SearchResultsConfigurationComponent.MODULE_DISPLAY_MODE, value)
    if (value === DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT) {
      this.props.changeField(SearchResultsConfigurationComponent.CONF_ENABLE_FACETTES, false)
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
    const dataEnableFacettes = get(currentFormValues, 'enableFacettes', false)

    // Dataset
    const currentDatasetAttributesConf = get(currentFormValues, 'datasetAttributes', [])
    const initialDatasetAttributesConf = get(initialFormValues, 'datasetAttributes', [])

    // Document
    const currentDocumentAttributesConf = get(currentFormValues, 'documentAttributes', [])
    const initialDocumentAttributesConf = get(initialFormValues, 'documentAttributes', [])

    switch (displayMode) {
      case DISPLAY_MODE_ENUM.DISPLAY_DATA:
        return this.renderObjectsAttributesConfiguration(
          currentAttributesConf,
          initialAttributesConf,
          currentAttributesGroupsConf,
          initialAttributesGroupsConf,
          dataEnableFacettes,
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
                dataEnableFacettes,
)}
            </Tab>
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
        )
      default:
        throw new Error(`Unknow display type : ${displayMode}`)
    }
  }
  renderObjectsAttributesConfiguration = (currentAttributesConf, initialAttributesConf, currentAttributesGroupsConf, initialAttributesGroupsConf, dataEnableFacettes) => (
    <MainAttributesConfigurationComponent
      allowFacettes={dataEnableFacettes}
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
  renderDocumentsAttributesConfiguration = (currentDocumentAttributesConf, initialDocumentAttributesConf) => (
    <MainAttributesConfigurationComponent
      allowFacettes={false}
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
    const onlyAllowDataConfiguration = get(this.props.initialFormValues, 'onlyAllowDataConfiguration', false)
    const displayMode = get(this.props.currentFormValues, 'displayMode', DISPLAY_MODE_ENUM.DISPLAY_DATA)

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
            name="display_mode"
          >
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DATA}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.data' })}
            />
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DATA_DATASET}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.data_datasets' })}
              disabled={onlyAllowDataConfiguration}
            />
            <RadioButton
              value={DISPLAY_MODE_ENUM.DISPLAY_DOCUMENT}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.documents' })}
              disabled={onlyAllowDataConfiguration}
            />
          </RadioButtonGroup>
          <Field
            name="conf.enableFacettes"
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.facettes.label' })}
            disabled={displayMode === SearchResultsConfigurationComponent.DISPLAY_DOCUMENT}
          />
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
