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
    // pointer of the constructor of the icon
    Icon: PropTypes.func,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getStyle = theme => ({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '30vh',
    },
    iconStyle: {
      width: '128px',
      height: '128px',
      opacity: '0.2',
    },
    titleWrapper: {
      maxWidth: '40%',
      marginTop: '0.2em',
      color: theme.palette.textColor,
      fontSize: '1.5em',
    },
    messageWrapper: {
      maxWidth: '40%',
      marginTop: '0.6em',
      color: theme.palette.secondaryTextColor,
      textAlign: 'center',
      fontSize: '1em',
    },
  })

  render() {
    const { title, message, Icon } = this.props
    const theme = this.context.muiTheme
    const style = this.getStyle(theme)
    return (
      <div style={style.wrapper}>
        <Icon color={theme.palette.primary1Color} style={style.iconStyle} />
        <div style={style.titleWrapper}>
          {title || <FormattedMessage id="no.content.information.title" />}
        </div>
        <div style={style.messageWrapper}>
          {message}
        </div>
      </div>
    )
  }
}
export default NoContentComponent
