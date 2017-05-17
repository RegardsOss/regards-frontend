/**
 * LICENSE_PLACEHOLDER
 **/
import isEqual from 'lodash/isEqual'
import { Card, CardText } from 'material-ui/Card'
import { LazyModuleComponent, ModuleShape } from '@regardsoss/modules'

/**
 * React component to display and configure dynamic module configuration
 * @author Sébastien binda
 */
class DynamicModuleFormComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string.isRequired,
    module: ModuleShape,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      // eslint-disable-next-line react/forbid-prop-types
      form: PropTypes.object,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.adminForm.form || !this.props.adminForm.form.conf) {
      return true
    }
    return !isEqual(this.props.adminForm.form.conf, nextProps.adminForm.form.conf)
  }

  render() {
    return (
      <Card id="dynamicFields" style={this.props.styles}>
        <CardText>
          <LazyModuleComponent
            project={this.props.project}
            module={this.props.module}
            admin
            adminForm={this.props.adminForm}
            appName={this.props.appName}
          />
        </CardText>
      </Card>
    )
  }

}
export default DynamicModuleFormComponent
