/**
* LICENSE_PLACEHOLDER
**/

import { CommonShapes } from '@regardsoss/shape'
import { ModuleThemeProvider } from '@regardsoss/modules'
import ShowableAtRender from '../cards/ShowableAtRender'
import PositionedDialog from './PositionedDialog'
import DialogLoadingComponent from './DialogLoadingComponent'

import styles from './styles/styles'

const MODULE_STYLES = { styles }

/**
* Shows loadable children in a dialog. Must be driven using loaded true / false
*/
class LoadableContentDialogContainer extends React.Component {

  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  render() {
    const { loaded, loadingMessage, dialogHeightPercent, dialogWidthPercent, children, ...dialogProperties } = this.props
    return (
      <ModuleThemeProvider module={MODULE_STYLES}>
        <PositionedDialog
          dialogHeightPercent={dialogHeightPercent}
          dialogWidthPercent={dialogWidthPercent}
          {...dialogProperties}
        >
          <ShowableAtRender show={!loaded}>
            <DialogLoadingComponent loadingMessage={loadingMessage} />
          </ShowableAtRender>
          <div style={loaded ? { height: '100%', maxHeight: '100%' } : { display: 'none' }}>
            {children}
          </div>
        </PositionedDialog >
      </ModuleThemeProvider>
    )
  }
}
export default LoadableContentDialogContainer
