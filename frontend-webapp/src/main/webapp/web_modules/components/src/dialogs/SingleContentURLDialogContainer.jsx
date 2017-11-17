/**
* LICENSE_PLACEHOLDER
**/
import { CommonShapes } from '@regardsoss/shape'
import IFrameURLContentDisplayer from '../content/IFrameURLContentDisplayer'
import LoadableContentDialogContainer from './LoadableContentDialogContainer'

/**
* Loadable content dialog showing only one content with its URL
*/
class SingleContentURLDialogContainer extends React.Component {

  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    open: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }

  componentWillReceiveProps({ contentURL: nextURL }) {
    const { contentURL } = this.props
    if (nextURL !== contentURL) {
      this.setState({ loaded: false })
    }
  }

  onContentLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { contentURL, open, dialogWidthPercent, dialogHeightPercent, loadingMessage, ...otherDialogProps } = this.props
    const { loaded } = this.state
    return (
      <LoadableContentDialogContainer
        loaded={loaded}
        open={open}
        loadingMessage={loadingMessage}
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        {...otherDialogProps}
      >
        <IFrameURLContentDisplayer contentURL={contentURL} onContentLoaded={this.onContentLoaded} />
      </LoadableContentDialogContainer>
    )
  }
}
export default SingleContentURLDialogContainer
