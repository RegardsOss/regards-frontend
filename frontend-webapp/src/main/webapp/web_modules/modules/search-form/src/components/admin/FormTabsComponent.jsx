/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import { PluginDefinition, AttributeModel } from '@regardsoss/model'
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

    // From mapStateToProps and mapDispatchToProps
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    selectableAttributesFectching: PropTypes.bool,
    disableChangeDatasets: PropTypes.bool,
    availableCriterion: PropTypes.objectOf(PluginDefinition),
    criterionFetching: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  renderCriterionTab = () => {
    if (!this.props.criterionFetching && !this.props.selectableAttributesFectching && this.props.adminForm.form.conf) {
      return (
        <FromCriterionComponent
          defaultCriterion={this.props.defaultConf.criterion}
          criterion={this.props.adminForm.form.conf.criterion}
          layout={this.props.adminForm.form.conf.layout}
          selectableAttributes={this.props.selectableAttributes}
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
      selectableAttributes={this.props.selectableAttributes}
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
        <Tab label={this.context.intl.formatMessage({ id: 'form.configuration.tab.label' })}>
          {this.renderAttributesParameterTab()}
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
      </Tabs>
    )
  }

}

export default FormTabsComponent
