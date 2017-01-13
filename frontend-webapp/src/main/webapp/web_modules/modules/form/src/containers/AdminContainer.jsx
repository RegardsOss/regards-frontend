/**
 * LICENSE_PLACEHOLDER
 **/
import { getFormValues, change } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { PluginConf } from '@regardsoss/model'
import FormTabsComponent from '../components/admin/FormTabsComponent'
import DatasetConfShape from '../models/datasets/DatasetsConfShape'

/**
 * Main container to display administration view of the module form.
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Props supplied by redux-form to get the current form values
    changeField: React.PropTypes.func,
    formConf: React.PropTypes.any,
    // Default props given to the form
    datasets: DatasetConfShape,
    criterion: React.PropTypes.arrayOf(PluginConf),
    layout: React.PropTypes.string,
    resultType: React.PropTypes.string,
  }

  initEmptyProps() {
    return {
      appName: this.props.appName,
      changeField: this.props.changeField,
      currentConf: this.props.formConf.conf,
      defaultConf: {
        resultType: this.props.resultType ? this.props.resultType : 'datasets',
        datasets: this.props.datasets ? this.props.datasets : {
          type: 'all',
        },
        criterion: this.props.criterion ? this.props.criterion : [],
        layout: this.props.layout,
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

const mapStateToProps = (state, ownProps) => ({
  formConf: getFormValues('edit-module-form')(state),
})

const mapDispatchToProps = dispatch => ({
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)

