/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Tabs, Tab } from 'material-ui/Tabs'
import DatasetsConfShape from '../../models/datasets/DatasetsConfShape'
import FormParameters from './FormParametersConfigurationComponent'
import FormDasets from './FormDatasetsConfigurationComponent'
import FormLayoutComponent from './FormLayoutComponent'
import FormPreviewComponent from './FormPreviewComponent'

/**
 * Display form divided with tabs to handle search form module configuration
 */
class FormTabsComponent extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    project: React.PropTypes.string,
    change: React.PropTypes.func,
    datasets: DatasetsConfShape,
    criterion: React.PropTypes.string,
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
            appName={this.props.appName}
            change={this.props.change}
            type={this.props.datasets.type}
            selectedDatasets={this.props.datasets.datasets}
            selectedDatasetModels={this.props.datasets.models}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.layout.tab.label" />} >
          <FormLayoutComponent
            layout={this.props.layout}
            change={this.props.change}
          />
        </Tab>
        <Tab label={<FormattedMessage id="form.criterions.tab.label" />} />
        <Tab label={<FormattedMessage id="form.preview.tab.label" />} >
          <FormPreviewComponent />
        </Tab>
      </Tabs>
    )
  }

}

export default FormTabsComponent
