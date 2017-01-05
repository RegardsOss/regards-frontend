/**
 * LICENSE_PLACEHOLDER
 **/
import FormTabsComponent from '../components/admin/FormTabsComponent'
/**
 * Main container to display administration view of the module form.
 */
class AdminContainer extends React.Component {

  static propTypes = {
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    change: React.PropTypes.func,
    datasets: React.PropTypes.shape({
      type: React.PropTypes.string,
      datasets: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
      })),
      models: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
      })),
    }),
    criterion: React.PropTypes.string,
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
