/**
* LICENSE_PLACEHOLDER
**/
import DefaultIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'
import ShowableAtRender from './ShowableAtRender'


/**
* Shows icon and messages for a no content area, shows area otherwise
*/
class NoContentMessageInfo extends React.Component {

  static propTypes = {
    noContent: React.PropTypes.bool.isRequired,
    title: React.PropTypes.node.isRequired,
    message: React.PropTypes.node, // optional, default title otherwise
    Icon: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, message, noContent, Icon, children } = this.props
    const theme = this.context.muiTheme
    return (
      <div>
        <ShowableAtRender show={noContent}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '30vh' }}>
            <Icon color={theme.palette.primary2Color} style={{ width: '128px', height: '128px', opacity: '0.2' }} />
            <div style={{ maxWidth: '40%', marginTop: '0.2em', color: theme.palette.textColor, fontSize: '1.5em' }}>
              {title || <FormattedMessage id="no.content.information.title" />}
            </div>
            <div style={{ maxWidth: '40%', marginTop: '0.6em', color: theme.palette.accent3Color, textAlign: 'center', fontSize: '1em' }}>
              {message}
            </div>
          </div>
        </ShowableAtRender>
        <ShowableAtRender show={!noContent}>
          {children}
        </ShowableAtRender>
      </div>
    )
  }
}
export default NoContentMessageInfo
