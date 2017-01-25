/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { PluginConf, PluginDefinition, AttributeModel } from '@regardsoss/model'
import { ModuleShape } from '@regardsoss/modules'
import DatasetsConfShape from '../../models/datasets/DatasetsConfShape'
import FormParameters from './parameters/FormParametersConfigurationComponent'
import { FormDatasetsConfigurationComponent } from './datasets/FormDatasetsConfigurationComponent'
import FormLayoutComponent from './layout/FormLayoutComponent'
import FromCriterionComponent from './criterion/FormCriterionComponent'
import FormPreviewComponent from './preview/FormPreviewComponent'

/**
 * Display form divided with tabs to handle search form module configuration
 */
class FormTabsComponent extends React.Component {

  static propTypes = {
    // Props supplied by redux-form to get the current form values
    changeField: React.PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    currentConf: React.PropTypes.object,
    module: ModuleShape,
    // Default props given to the form
    defaultConf: React.PropTypes.shape({
      datasets: DatasetsConfShape,
      criterion: React.PropTypes.arrayOf(PluginConf),
      layout: React.PropTypes.string,
      resultType: React.PropTypes.string,
    }),
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    disableChangeDatasets: React.PropTypes.bool,
    availableCriterion:  React.PropTypes.objectOf(React.PropTypes.shape({
      content: PluginDefinition,
    })),
    criterionFetching: React.PropTypes.bool,
  }

  renderCriterionTab = () => {
    if (!this.props.criterionFetching) {
      return (
        <FromCriterionComponent
          defaultCriterion={this.props.defaultConf.criterion}
          criterion={this.props.currentConf.criterion}
          layout={this.props.currentConf.layout}
          selectableAttributes={this.props.selectableAttributes}
          changeField={this.props.changeField}
          availableCriterion={this.props.availableCriterion}
        />
      )
    }
    return null
  }

  render() {
    return (
      <Tabs>
        <Tab label={<FormattedMessage id="form.configuration.tab.label" />} >
          <FormParameters defaultResultType={this.props.defaultConf.resultType} />
        </Tab>
        <Tab label={<FormattedMessage id="form.dataset.selection.tab.label" />} >
          <FormDatasetsConfigurationComponent
            changeField={this.props.changeField}
            defaultType={this.props.defaultConf.datasets.type}
            defaultSelectedDatasets={this.props.defaultConf.datasets.selectedDatasets}
            defaultSelectedDatasetModels={this.props.defaultConf.datasets.selectedModels}
            disableChangeDatasets={this.props.disableChangeDatasets}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.layout.tab.label" />} >
          <FormLayoutComponent
            defaultLayout={this.props.defaultConf.layout}
            changeField={this.props.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.criterions.tab.label" />} >
          {this.renderCriterionTab()}
        </Tab>
        <Tab label={<FormattedMessage id="form.preview.tab.label" />} >
          <FormPreviewComponent
            module={this.props.module}
          />
        </Tab>
      </Tabs>
    )
  }

}

export default FormTabsComponent
