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
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import ModuleConfiguration from '../../models/ModuleConfiguration'
import FormParametersComponent from './parameters/FormParametersComponent'
import FormDatasetsConfigurationComponent from './datasets/FormDatasetsConfigurationComponent'
import FormLayoutComponent from './layout/FormLayoutComponent'
import FromCriterionComponent from './criterion/FormCriterionComponent'
import FormPreviewComponent from './preview/FormPreviewComponent'

/**
 * Display form divided with tabs to handle search form module configuration
 * @author Sébastien binda
 */
class FormTabsComponent extends React.Component {
  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: PropTypes.string,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),

    // Default props given to the form
    defaultConf: ModuleConfiguration.isRequired,

    selectableDataObjectsAttributes: DataManagementShapes.AttributeModelList,
    selectableDataObjectsAttributesFectching: PropTypes.bool,
    disableChangeDatasets: PropTypes.bool,
    availableCriterion: AccessShapes.UIPluginDefinitionList,
    criterionFetching: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  renderCriterionTab = () => {
    if (!this.props.criterionFetching && !this.props.selectableDataObjectsAttributesFectching && this.props.adminForm.form.conf) {
      return (
        <FromCriterionComponent
          defaultCriterion={this.props.defaultConf.criterion}
          criterion={this.props.adminForm.form.conf.criterion}
          layout={this.props.adminForm.form.conf.layout}
          selectableAttributes={this.props.selectableDataObjectsAttributes}
          changeField={this.props.adminForm.changeField}
          availableCriterion={this.props.availableCriterion}
        />
      )
    }
    return null
  }

  renderAttributesParameterTab = () => (
    <FormParametersComponent
      project={this.props.project}
      appName={this.props.appName}
      adminForm={this.props.adminForm}
      attributes={this.props.defaultConf.attributes}
      attributesRegroupements={this.props.defaultConf.attributesRegroupements}
      selectableAttributes={this.props.selectableDataObjectsAttributes}
      resultType={this.props.defaultConf.resultType}
    />
  )

  render() {
    return (
      <Tabs>
        <Tab label={this.context.intl.formatMessage({ id: 'form.dataset.selection.tab.label' })}>
          <FormDatasetsConfigurationComponent
            changeField={this.props.adminForm.changeField}
            defaultType={this.props.defaultConf.datasets.type}
            defaultSelectedDatasets={this.props.defaultConf.datasets.selectedDatasets}
            defaultSelectedDatasetModels={this.props.defaultConf.datasets.selectedModels}
            disableChangeDatasets={this.props.disableChangeDatasets}
          />
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'form.layout.tab.label' })}>
          <FormLayoutComponent
            defaultLayout={this.props.defaultConf.layout}
            changeField={this.props.adminForm.changeField}
          />
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'form.criterions.tab.label' })}>
          {this.renderCriterionTab()}
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'form.preview.tab.label' })}>
          <FormPreviewComponent
            project={this.props.project}
            module={this.props.adminForm.form}
          />
        </Tab>
        <Tab label={this.context.intl.formatMessage({ id: 'form.configuration.tab.label' })}>
          {this.renderAttributesParameterTab()}
        </Tab>
      </Tabs>
    )
  }
}

export default FormTabsComponent
