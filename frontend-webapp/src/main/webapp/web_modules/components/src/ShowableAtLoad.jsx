import ReactTransitionGroup from 'react-addons-transition-group'
import { MakesFade } from '@regardsoss/components/src/transitions/MaterialDesignMotions'
import { LoadingComponent } from '@regardsoss/display-control'

class ShowableAtLoad extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
    isLoading: React.PropTypes.bool.isRequired,
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
