/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import { Card, CardText } from 'material-ui/Card'
import { LazyModuleComponent } from '@regardsoss/modules'
import {LoadableContentDisplayDecorator} from '@regardsoss/display-control'
import { AccessShapes } from '@regardsoss/shape'

/**
 * React component to display and configure dynamic module configuration
 * @author Sébastien binda
 */
class DynamicModuleFormComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired,
    module: AccessShapes.Module,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
  }

  state = {
    moduleLoading: true,
    noAdminComp: false,
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (!this.props.adminForm.form || !this.props.adminForm.form.conf) {
      return true
    }
    return !isEqual(this.state,nextState) || !isEqual(this.props.adminForm.form.type, nextProps.adminForm.form.type)
  }

  moduleLoaded = (module) => {
    this.setState({
      module: module
    })
  }

  render() {
    if (!this.props.module && !this.props.module.type){
      return null
    }
    let styles = this.props.styles
    if (this.state.module && !this.state.module.adminContainer){
      // Hide Card element if there is no adminContainer to display for the module specific configuration
      styles = merge({},styles,{display:'none'})
    }

    return (
      <Card id="dynamicFields" style={styles}>
        <CardText>
          <LazyModuleComponent
            project={this.props.project}
            module={this.props.module}
            admin
            adminForm={this.props.adminForm}
            appName={this.props.appName}
            onLoadAction={this.moduleLoaded}
          />
        </CardText>
      </Card>
    )
  }

}
export default DynamicModuleFormComponent
