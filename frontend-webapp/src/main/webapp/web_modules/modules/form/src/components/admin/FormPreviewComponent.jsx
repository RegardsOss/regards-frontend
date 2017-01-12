/**
 * LICENSE_PLACEHOLDER
 **/
import { getFormValues } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { LazyModuleComponent } from '@regardsoss/modules'

/**
 * Component to display a preview of the current search form module
 */
class FormPreviewComponent extends React.Component {

  static propTypes = {
    module: React.PropTypes.any,
  }

  render() {
    if (this.props.module && this.props.module.name) {
      return (
        <div style={{ marginTop: 10 }}>
          <LazyModuleComponent
            module={this.props.module}
            appName={'admin'}
          />
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  module: getFormValues('edit-module-form')(state),
})

export default connect(mapStateToProps, null)(FormPreviewComponent)
