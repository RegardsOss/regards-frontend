/**
* LICENSE_PLACEHOLDER
**/
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import IFrameURLContentDisplayer from '../content/IFrameURLContentDisplayer'
import LoadableContentDialogContainer from './LoadableContentDialogContainer'
import styles from './styles'

/**
 * Loadable content dialog showing only one content with its URL
 */
export class SingleContentURLDialogContainer extends React.Component {
  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    open: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
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
    const {
      contentURL, open, dialogWidthPercent, dialogHeightPercent, loadingMessage, ...otherDialogProps
    } = this.props
    const { loaded } = this.state
    const { moduleTheme: { urlContentDialog } } = this.context

    return (
      <LoadableContentDialogContainer
        loaded={loaded}
        open={open}
        loadingMessage={loadingMessage}
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        bodyStyle={urlContentDialog.bodyStyle}
        {...otherDialogProps}
      >
        <IFrameURLContentDisplayer contentURL={contentURL} onContentLoaded={this.onContentLoaded} />
      </LoadableContentDialogContainer>
    )
  }
}

export default withModuleStyle(styles)(SingleContentURLDialogContainer)
