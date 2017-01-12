/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import Criteria from '../../models/criterion/Criteria'
import DatasetsConfShape from '../../models/datasets/DatasetsConfShape'
import FormParameters from './parameters/FormParametersConfigurationComponent'
import FormDasets from './datasets/FormDatasetsConfigurationComponent'
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
    formConf: React.PropTypes.any,
    // Default props given to the form
    datasets: DatasetsConfShape,
    criterion: React.PropTypes.arrayOf(Criteria),
    layout: React.PropTypes.string,
    resultType: React.PropTypes.string,
  }

  render() {
    return (
      <Tabs>
        <Tab label={<FormattedMessage id="form.configuration.tab.label" />} >
          <FormParameters resultType={this.props.resultType} />
        </Tab>
        <Tab label={<FormattedMessage id="form.dataset.selection.tab.label" />} >
          <FormDasets
            changeField={this.props.changeField}
            type={this.props.datasets.type}
            selectedDatasets={this.props.datasets.datasets}
            selectedDatasetModels={this.props.datasets.models}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.layout.tab.label" />} >
          <FormLayoutComponent
            layout={this.props.layout}
            changeField={this.props.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.criterions.tab.label" />} >
          <FromCriterionComponent
            criterion={this.props.formConf.criterion}
            changeField={this.props.changeField}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.preview.tab.label" />} >
          <FormPreviewComponent
            module={this.props.formConf}
          />
        </Tab>
      </Tabs>
    )
  }

}

export default FormTabsComponent
