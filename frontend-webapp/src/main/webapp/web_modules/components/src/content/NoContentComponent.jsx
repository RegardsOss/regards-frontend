/**
 * LICENSE_PLACEHOLDER
 **/
import DefaultIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

/**
 * Shows illustration/icon and messages for a user-friendly no content area
 */
class NoContentComponent extends React.Component {

  static propTypes = {
    title: PropTypes.node.isRequired,
    message: PropTypes.node,
    Icon: PropTypes.func.isRequired,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, message, Icon } = this.props
    const theme = this.context.muiTheme
    const iconStyle = { width: '128px', height: '128px', opacity: '0.2' }
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '30vh' }}>
        <Icon color={theme.palette.primary1Color} style={iconStyle} />
        <div style={{ maxWidth: '40%', marginTop: '0.2em', color: theme.palette.textColor, fontSize: '1.5em' }}>
          {title || <FormattedMessage id="no.content.information.title" />}
        </div>
        <div style={{ maxWidth: '40%', marginTop: '0.6em', color: theme.palette.secondaryTextColor, textAlign: 'center', fontSize: '1em' }}>
          {message}
        </div>
      </div>
    )
  }
}
export default NoContentComponent
