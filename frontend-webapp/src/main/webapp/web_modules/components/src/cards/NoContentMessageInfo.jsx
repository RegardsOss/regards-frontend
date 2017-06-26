/**
* LICENSE_PLACEHOLDER
**/
import DefaultIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied'
import { themeContextType } from '@regardsoss/theme'
import ShowableAtRender from './ShowableAtRender'
import NoContentComponent from '../content/NoContentComponent'

/**
* Shows icon and messages for a no content area, shows area otherwise
*/
class NoContentMessageInfo extends React.Component {

  static propTypes = {
    noContent: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    message: PropTypes.node,
    Icon: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    Icon: DefaultIcon,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, message, noContent, Icon, children } = this.props
    return (
      <div>
        <ShowableAtRender show={noContent}>
          <NoContentComponent title={title} message={message} Icon={Icon} />
        </ShowableAtRender>
        <ShowableAtRender show={!noContent}>
          {children}
        </ShowableAtRender>
      </div>
    )
  }
}
export default NoContentMessageInfo
