/**
 * LICENSE_PLACEHOLDER
 **/
import FormTabsComponent from '../components/admin/FormTabsComponent'
import DatasetConfShape from '../models/datasets/DatasetsConfShape'
import Criteria from '../models/criterion/Criteria'
/**
 * Main container to display administration view of the module form.
 */
class AdminContainer extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    change: React.PropTypes.func,
    datasets: DatasetConfShape,
    criterion: React.PropTypes.arrayOf(Criteria),
    layout: React.PropTypes.string,
    resultType: React.PropTypes.string,
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      change: this.props.change,
      resultType: this.props.resultType ? this.props.resultType : 'datasets',
      datasets: this.props.datasets ? this.props.datasets : {
        type: 'all',
      },
      criterion: this.props.criterion ? this.props.criterion : [],
      layout: this.props.layout,
    }
  }

  render() {
    const props = this.initEmptyProps()
    return (
      <div>
        <FormTabsComponent
          {...props}
        />
      </div>
    )
  }
}

export default AdminContainer
