/**
* LICENSE_PLACEHOLDER
**/
import { URL, Percent } from '@regardsoss/model'
import IFrameURLContentDisplayer from '../content/IFrameURLContentDisplayer'
import LoadableContentDialogContainer from './LoadableContentDialogContainer'

/**
* Loadable content dialog showing only one content with its URL
*/
class SingleContentURLDaialogContainer extends React.Component {

  static propTypes = {
    contentURL: URL.isRequired,
    open: React.PropTypes.bool.isRequired,
    dialogHeightPercent: Percent.isRequired,
    dialogWidthPercent: Percent.isRequired,
    loadingMessage: React.PropTypes.node.isRequired,
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
export default SingleContentURLDaialogContainer
