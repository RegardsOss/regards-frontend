/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import { Percent } from '@regardsoss/model'
import ShowableAtRender from '../cards/ShowableAtRender'


/**
* Shows loadable children in a dialog. Must be driven using loaded true / false

*/
class LoadableContentDialogContainer extends React.Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    dialogHeightPercent: Percent.isRequired,
    dialogWidthPercent: Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  componentWillMount = () => {
    this.setState({
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
    if (this.props.open) {
      this.forceUpdate()
    }
  }

  getDialogDimensions = () => {
    const { dialogWidthPercent, dialogHeightPercent } = this.props
    const dialogWidth = (root.screen.availWidth * dialogWidthPercent) / 100
    const dialogHeight = (root.screen.availHeight * dialogHeightPercent) / 100
    return { dialogWidth, dialogHeight }
  }

  render() {
    const { loaded, open, loadingMessage, children, ...dialogProperties } = this.props
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
          <div style={loaded ? { height: '100%', maxHeight: '100%' } : { display: 'none' }}>
            {children}
          </div>
        </div>
      </Dialog >
    )
  }
}
export default LoadableContentDialogContainer
