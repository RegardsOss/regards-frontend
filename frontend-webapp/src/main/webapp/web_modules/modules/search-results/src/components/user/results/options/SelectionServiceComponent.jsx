/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import ServiceIconComponent from './ServiceIconComponent'

/**
* Selection service button
*/
class SelectionServiceComponent extends React.Component {

  static propTypes = {
    onRunService: PropTypes.func.isRequired,
    iconSize: PropTypes.number.isRequired, // icon size style is injected, as this component is rendered in table context
    service: AccessShapes.PluginService,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onClick = () => {
    const { onRunService, service } = this.props
    onRunService(service)
  }

  render() {
    const { service, iconSize } = this.props
    return (
      <FlatButton
        label={service.label}
        onTouchTap={this.onClick}
      />
    )
  }
}
export default SelectionServiceComponent
