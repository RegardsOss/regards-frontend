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
import { CardText } from 'material-ui/Card'
import { Tabs, Tab } from 'material-ui/Tabs'
import { i18nContextType } from '@regardsoss/i18n'
import {
  AttributeModel,
  AttributeConfiguration,
  AttributesRegroupementConfiguration,
} from '@regardsoss/model'
import { ShowableAtRender, Title } from '@regardsoss/components'
import { Field, RenderCheckbox } from '@regardsoss/form-utils'
import { MainAttributesConfigurationComponent } from '@regardsoss/attributes-common'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display form to configure main parameters of search form.
 * @author Sébastien binda
 */
class SearchResultsConfigurationComponent extends React.Component {

  static MODULE_ATTRIBUTES_CONF = 'conf.attributes'
  static MODULE_DATASET_ATTRIBUTES_CONF = 'conf.datasetAttributes'
  static MODULE_REGROUPEMENTS_CONF = 'conf.attributesRegroupements'

  static propTypes = {
    defaultDisplayDatasets: PropTypes.bool,
    defaultEnableFacettes: PropTypes.bool,
    defaultAttributesConf: PropTypes.arrayOf(AttributeConfiguration),
    defaultAttributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    defaultDatasetAttributes: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    attributesConf: PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupementsConf: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    datasetAttributes: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    datasetSelectableAttributes: PropTypes.objectOf(AttributeModel),
    hideDatasetsConfiguration: PropTypes.bool.isRequired,
    changeField: PropTypes.func.isRequired,
    displayDataset: PropTypes.bool,
  }
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  renderAttributesConfiguration = () => {
    if (!this.props.displayDataset) {
      return this.renderObjectsAttributesConfiguration()
    }

    return (
      <Tabs>
        <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.conf.selection.tab.label' })}>
          {this.renderObjectsAttributesConfiguration()}
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'form.attribute.dataset.conf.selection.tab.label' })}>
          {this.renderDatasetsAttributesConfiguration()}
        </Tab>
      </Tabs>
    )
  }

  renderObjectsAttributesConfiguration = () => (
    <MainAttributesConfigurationComponent
      allowFacettes
      allowAttributesRegroupements
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_ATTRIBUTES_CONF}
      regroupementsFieldName={SearchResultsConfigurationComponent.MODULE_REGROUPEMENTS_CONF}
      attributesConf={this.props.attributesConf}
      attributesRegroupementsConf={this.props.attributesRegroupementsConf}
      defaultAttributesConf={this.props.defaultAttributesConf}
      defaultAttributesRegroupementsConf={this.props.defaultAttributesRegroupementsConf}
      selectableAttributes={this.props.selectableAttributes}
      changeField={this.props.changeField}
    />
  )

  renderDatasetsAttributesConfiguration = () => (
    <MainAttributesConfigurationComponent
      allowFacettes={false}
      allowAttributesRegroupements={false}
      attributesFieldName={SearchResultsConfigurationComponent.MODULE_DATASET_ATTRIBUTES_CONF}
      attributesConf={this.props.datasetAttributes}
      defaultAttributesConf={this.props.defaultDatasetAttributes}
      selectableAttributes={this.props.datasetSelectableAttributes}
      changeField={this.props.changeField}
    />
  )

  render() {
    const { topOptions } = this.context.moduleTheme.configuration
    return (
      <CardText>
        <Title
          level={3}
          label={this.context.intl.formatMessage({ id: 'form.configuration.tab.title' })}
        />
        <div style={topOptions.styles}>
          { /* Show result type choice only if the datasets results are not hidden */}
          <ShowableAtRender show={!this.props.hideDatasetsConfiguration}>
            <Field
              name="conf.displayDatasets"
              component={RenderCheckbox}
              checked={this.props.defaultDisplayDatasets}
              label={this.context.intl.formatMessage({ id: 'form.configuration.result.type.datasets' })}
            />

          </ShowableAtRender>
          <Field
            name="conf.enableFacettes"
            component={RenderCheckbox}
            checked={this.props.defaultEnableFacettes}
            label={this.context.intl.formatMessage({ id: 'form.configuration.result.enable.facettes.label' })}
          />
        </div>
        {this.renderAttributesConfiguration()}
      </CardText>
    )
  }
}

export default SearchResultsConfigurationComponent
