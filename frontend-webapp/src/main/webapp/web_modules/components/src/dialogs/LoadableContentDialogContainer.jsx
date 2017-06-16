/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { Percent } from '@regardsoss/model'
import ShowableAtRender from '../cards/ShowableAtRender'
import PositionedDialog from './PositionedDialog'

/**
* Shows loadable children in a dialog. Must be driven using loaded true / false
*/
class LoadableContentDialogContainer extends React.Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    dialogHeightPercent: Percent.isRequired,
    dialogWidthPercent: Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  render() {
    const { loaded, loadingMessage, dialogHeightPercent, dialogWidthPercent, children, ...dialogProperties } = this.props
    return (
      <PositionedDialog
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        {...dialogProperties}
      >
        <ShowableAtRender show={!loaded}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <CircularProgress size={256} />
            <p style={{ marginTop: '2em' }}>{loadingMessage}</p>
          </div>
        </ShowableAtRender>
        <div style={loaded ? { height: '100%', maxHeight: '100%' } : { display: 'none' }}>
          {children}
        </div>
      </PositionedDialog >
    )
  }
}
export default LoadableContentDialogContainer
