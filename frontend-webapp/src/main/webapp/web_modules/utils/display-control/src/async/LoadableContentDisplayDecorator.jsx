/**
 * LICENSE_PLACEHOLDER
 **/
import isFunction from 'lodash/isFunction'
import { ShowableAtRender } from '@regardsoss/components'
import LoadingComponent from './loading/LoadingComponent'
import DefaultErrorComponent from './error/DefaultErrorComponent'
import DefaultEmptyComponent from './empty/DefaultEmptyComponent'
import DefaultRequestEntityTooLargeComponent from './error/DefaultRequestEntityTooLargeComponent'

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
    loadingComponent: PropTypes.element,
    isContentError: PropTypes.bool,
    contentErrorComponent: PropTypes.element,
    isEmpty: PropTypes.bool,
    emptyComponent: PropTypes.element,
    isRequestEntityTooLarge: PropTypes.bool,
    requestEntityTooLargeComponent: PropTypes.element,
  }

  static defaultProps = {
    isLoading: false,
    loadingComponent: <LoadingComponent />,
    isContentError: false,
    contentErrorComponent: <DefaultErrorComponent />,
    isEmpty: false,
    emptyComponent: <DefaultEmptyComponent />,
    isRequestEntityTooLarge: false,
    requestEntityTooLargeComponent: <DefaultRequestEntityTooLargeComponent />,
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
    if (isFunction(this.props.children)) {
      return this.props.children()
    }
    return this.props.children
  }

  render() {
    const { isLoading, loadingComponent, isContentError, contentErrorComponent, isEmpty, emptyComponent, isRequestEntityTooLarge, requestEntityTooLargeComponent } = this.props
    return (
      <div>
        <ShowableAtRender show={isLoading}>
          {loadingComponent}
        </ShowableAtRender>
        <ShowableAtRender show={isContentError && !isLoading}>
          {contentErrorComponent}
        </ShowableAtRender>
        <ShowableAtRender show={isRequestEntityTooLarge && !isContentError && !isLoading}>
          {requestEntityTooLargeComponent}
        </ShowableAtRender>
        <ShowableAtRender show={!isRequestEntityTooLarge && isEmpty && !isContentError && !isLoading}>
          {emptyComponent}
        </ShowableAtRender>
        <ShowableAtRender show={!isRequestEntityTooLarge && !isEmpty && !isContentError && !isLoading}>
          {this.renderChild()}
        </ShowableAtRender>
      </div>
    )
  }
}
export default LoadableContentDisplayDecorator
