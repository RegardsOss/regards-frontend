/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import { URL, Percent } from '@regardsoss/model'
import ShowableAtRender from '../cards/ShowableAtRender'


/**
* Shows a loadable content of any accepted browser type within an iFrame (required for PDF/ HTML, ...), contained in a dialog
* You can use all accepted dialog properties
*/
class LoadableContentDialogComponent extends React.Component {

  static propTypes = {
    contentURL: URL.isRequired,
    open: React.PropTypes.bool.isRequired,
    dialogHeightPercent: Percent.isRequired,
    dialogWidthPercent: Percent.isRequired,
    loadingMessage: React.PropTypes.node.isRequired,
  }

  componentWillMount = () => {
    this.setState({
      loaded: false,
      ...this.getDialogDimensions(),
    })
  }

  componentDidMount = () => {
    root.addEventListener('resize', this.onResize)
  }

  componentWillUnmount = () => {
    root.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    // force updating when this component is visible
    if (this.props.open && this.state.loaded) {
      this.forceUpdate()
    }
  }

  onFrameLoaded = () => {
    this.setState({
      loaded: true,
    })
  }

  getDialogDimensions = () => {
    const { dialogWidthPercent, dialogHeightPercent } = this.props
    const dialogWidth = (root.screen.availWidth * dialogWidthPercent) / 100
    const dialogHeight = (root.screen.availHeight * dialogHeightPercent) / 100
    return { dialogWidth, dialogHeight }
  }

  render() {
    const { contentURL, open, loadingMessage, ...dialogProperties } = this.props
    const { loaded } = this.state

    const { dialogWidth, dialogHeight } = this.getDialogDimensions()
    return (
      <Dialog
        open={open}
        {...dialogProperties}
        contentStyle={{
          width: dialogWidth,
          maxWidth: 'none',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: dialogHeight }}>
          <ShowableAtRender show={!loaded}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <CircularProgress size={256} />
              <p style={{ marginTop: '2em' }}>{loadingMessage}</p>
            </div>
          </ShowableAtRender>
          <iframe
            height="100%"
            width="100%"
            style={{ position: 'absolute' }}
            src={contentURL}
            onLoad={this.onFrameLoaded}
          />
        </div>
      </Dialog >
    )
  }
}
export default LoadableContentDialogComponent
