/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Dialog containing all the service run steps (not related with shown content)
*/
class RunServiceDialogComponent extends React.Component {

  static propTypes = {
    serviceName: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="close.button"
        label={formatMessage({ id: 'entities.common.close.service' })}
        onTouchTap={onClose}
        primary
      />,
    ]
  }

  render() {
    const { serviceName, children } = this.props
    console.log('WTFLEOOOOOOOOOOO')
    // TODO theme
    return (
      <Dialog
        title={serviceName}
        actions={this.renderActions()}
        modal
        open
      >
        {children}
      </Dialog>
    )
  }
}
export default RunServiceDialogComponent
