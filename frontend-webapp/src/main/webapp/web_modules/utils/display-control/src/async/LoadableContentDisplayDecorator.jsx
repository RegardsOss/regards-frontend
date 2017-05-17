/**
 * LICENSE_PLACEHOLDER
 **/
import { ShowableAtRender } from '@regardsoss/components'
import LoadingComponent from './LoadingComponent'
import ContentErrorComponent from './ContentErrorComponent'

/**
 * Component handling the proper display of a subcomponent with async loading content.
 * If the subcomponent is waiting for content to load, display a waiting loading component.
 * If the content fetched with error, display a generic error.
 * Else, display the subcomponent.
 *
 * @author Xavier-Alexandre Brochard
 */
class LoadableContentDisplayDecorator extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isLoading: PropTypes.bool,
    isContentError: PropTypes.bool,
    isEmpty: PropTypes.bool,
    emptyMessage: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    isContentError: false,
    isEmpty: false,
  }

  /**
   * Don't try to render the child if it's loading
   * Then execute the children function if it is, or just render it
   * @returns {XML}
   */
  renderChild = () => {
    if (this.props.isLoading) {
      return (<div />)
    }
    if (typeof this.props.children === 'function') {
      return this.props.children()
    }
    return this.props.children
  }

  render() {
    const { isLoading, isContentError, isEmpty } = this.props
    return (
      <div>
        <ShowableAtRender
          show={isLoading}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingComponent />
          </div>
        </ShowableAtRender>
        <ShowableAtRender show={isContentError && !isLoading}>
          <ContentErrorComponent />
        </ShowableAtRender>
        <ShowableAtRender show={isEmpty && !isContentError && !isLoading}>
          <div>{this.props.emptyMessage ? this.props.emptyMessage : 'No content!'}</div>
        </ShowableAtRender>
        <ShowableAtRender show={!isEmpty && !isContentError && !isLoading}>
          {this.renderChild()}
        </ShowableAtRender>
      </div>
    )
  }
}
export default LoadableContentDisplayDecorator
