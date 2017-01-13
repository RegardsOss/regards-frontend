/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import { PluginConf } from '@regardsoss/model'
import DatasetsConfShape from '../../models/datasets/DatasetsConfShape'
import FormParameters from './parameters/FormParametersConfigurationComponent'
import { FormDatasetsConfigurationComponent, DATASET_MODEL_TYPE, DATASET_TYPE } from './datasets/FormDatasetsConfigurationComponent'
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
    currentConf: React.PropTypes.any,
    // Default props given to the form
    defaultConf: React.PropTypes.shape({
      datasets: DatasetsConfShape,
      criterion: React.PropTypes.arrayOf(PluginConf),
      layout: React.PropTypes.string,
      resultType: React.PropTypes.string,
    }),
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
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.layout.tab.label" />} >
          <FormLayoutComponent
            defaultLayout={this.props.defaultConf.layout}
            changeField={this.props.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.criterions.tab.label" />} >
          <FromCriterionComponent
            defaultCriterion={this.props.defaultConf.criterion}
            layout={this.props.currentConf.layout}
            selectableModels={[]}
            changeField={this.props.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.preview.tab.label" />} >
          <FormPreviewComponent
            module={this.props.currentConf}
          />
        </Tab>
      </Tabs>
    )
  }

}

export default FormTabsComponent
