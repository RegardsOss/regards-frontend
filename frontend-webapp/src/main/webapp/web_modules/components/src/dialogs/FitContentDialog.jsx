/**
* LICENSE_PLACEHOLDER
**/
import Dialog from 'material-ui/Dialog'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import styles from './styles'


/**
* This dialog fits its children height and width
*/
class FitContentDialog extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    contentStyle: PropTypes.object, // allows locally overriding the styles
    // eslint-disable-next-line react/forbid-prop-types
    actionsContainerStyle: PropTypes.object, // allows locally overriding the styles

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    // Others props are used by the Dialog
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      children,
      actionsContainerStyle: customActionsContainerStyle = {},
      contentStyle: customContentStyle = {},
      ...dialogProperties
    } = this.props

    const { fitContentDialog, dialogCommon } = this.context.moduleTheme

    // merge custom and local styles
    const actionsContainerStyle = { customActionsContainerStyle, ...dialogCommon.actionsContainerStyle }
    const contentStyle = { customContentStyle, ...fitContentDialog.contentStyle }

    return (
      <Dialog
        paperProps={fitContentDialog.paperProps}
        contentStyle={contentStyle}
        actionsContainerStyle={actionsContainerStyle}
        {...dialogProperties}
      >
        {HOCUtils.renderChildren(children)}
      </Dialog >
    )
  }
}

export default withModuleStyle(styles, true)(FitContentDialog)
