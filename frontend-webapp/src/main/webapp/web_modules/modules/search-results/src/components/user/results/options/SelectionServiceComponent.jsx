/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'

/**
* Selection service button
*/
class SelectionServiceComponent extends React.Component {

  static propTypes = {
    onRunService: PropTypes.func.isRequired,
    service: AccessShapes.PluginService,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static DEFAULT_STATE = {
    serviceIconComponent: null,
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Handles properties update
   */
  onPropertiesChanged = ({ service: oldService }, { service: newService }) => {
    const oldState = this.state
    const newState = oldState ? { ...oldState } : SelectionServiceComponent.DEFAULT_STATE
    if (oldService !== newService) {
      const { muiTheme } = this.context
      // prepare service icon to avoid building new instances at runtime
      newState.serviceIconComponent = newService.icon ?
        <img src={newService.icon} alt="" width={muiTheme.spacing.iconSize} height={muiTheme.spacing.iconSize} />
        : null
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  onClick = () => {
    const { onRunService, service } = this.props
    onRunService(service)
  }

  render() {
    const { service } = this.props
    const { serviceIconComponent } = this.state
    return (
      <FlatButton
        label={service.label}
        onTouchTap={this.onClick}
        icon={serviceIconComponent}
      />
    )
  }
}
export default SelectionServiceComponent
