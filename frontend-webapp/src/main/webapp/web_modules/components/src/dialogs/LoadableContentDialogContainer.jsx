/**
* LICENSE_PLACEHOLDER
**/

import { CommonShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import { HOCUtils, ShowableAtRender } from '@regardsoss/display-control'
import PositionedDialog from './PositionedDialog'
import DialogLoadingComponent from './DialogLoadingComponent'

import styles from './styles'

/**
 * Shows loadable children in a dialog. Must be driven using loaded true / false
 * @author Raphaël Mechali
 */
export class LoadableContentDialogContainer extends React.Component {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    loadingMessage: PropTypes.node.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static VISIBLE_STYLES = { display: 'flex', flexGrow: 1, flexShrink: 1 }
  static HIDDEN_STYLES = { display: 'none', flexGrow: 0, flexShrink: 0 }

  render() {
    const {
      loaded, loadingMessage, dialogHeightPercent, dialogWidthPercent, children, ...dialogProperties
    } = this.props
    return (
      <PositionedDialog
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        {...dialogProperties}
      >
        {
          loaded ? null : <DialogLoadingComponent loadingMessage={loadingMessage} />
        }
        <div style={loaded ? LoadableContentDialogContainer.VISIBLE_STYLES : LoadableContentDialogContainer.HIDDEN_STYLES}>
          {
            HOCUtils.renderChildren(children)
          }
        </div>
      </PositionedDialog >
    )
  }
}
export default withModuleStyle(styles)(LoadableContentDialogContainer)
