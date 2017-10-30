/**
* LICENSE_PLACEHOLDER
**/

import { CommonShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/display-control'
import PositionedDialog from './PositionedDialog'
import DialogLoadingComponent from './DialogLoadingComponent'

import styles from './styles/styles'

const DIALOG_STYLES = { styles }

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
    ]).isRequired,
  }

  /** style to show children  */
  static SHOW_CHILDREN_STYLE = { height: '100%', maxHeight: '100%' }
  /** style to hide children */
  static HIDE_CHILDREN_STYLE = { display: 'none' }

  render() {
    const { loaded, loadingMessage, dialogHeightPercent, dialogWidthPercent, children, ...dialogProperties } = this.props
    return (
      <PositionedDialog
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        {...dialogProperties}
      >
        <ShowableAtRender show={!loaded}>
          <DialogLoadingComponent loadingMessage={loadingMessage} />
        </ShowableAtRender>
        <div style={loaded ? LoadableContentDialogContainer.SHOW_CHILDREN_STYLE : LoadableContentDialogContainer.HIDE_CHILDREN_STYLE}>
          {children}
        </div>
      </PositionedDialog >
    )
  }
}
export default withModuleStyle(DIALOG_STYLES)(LoadableContentDialogContainer)
