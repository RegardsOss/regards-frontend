import ReactTransitionGroup from 'react-transition-group'
import { MakesFade } from './transitions/MaterialDesignMotions'
import { LoadingComponent } from '@regardsoss/display-control'

class ShowableAtLoad extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoading, children } = this.props
    const loadingComponent = <MakesFade><LoadingComponent /></MakesFade>
    const notLoadingContent = React.createElement(MakesFade, null, children)

    return (
      <div>
        <ReactTransitionGroup>
          {isLoading ? loadingComponent : null}
        </ReactTransitionGroup>
        <ReactTransitionGroup>
          {!isLoading ? notLoadingContent : null}
        </ReactTransitionGroup>
      </div>
    )
  }
}

export default ShowableAtLoad
