/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import NextLevelIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { themeContextType } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'

/**
* Breadcrumb element displayer, to be built by a parent Breadcrumb
*/
class BreadcrumbElement extends React.Component {
  static propTypes = {
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onAction: PropTypes.func.isRequired, // callback () => void
    label: PropTypes.string.isRequired,
    rootIcon: PropTypes.node,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      isFirst, isLast, onAction, label, rootIcon,
    } = this.props
    const { element: { style, iconStyle, labelStyle } } = this.context.moduleTheme.breadcrumb
    // clone root icon to provide style or show next level element
    const icon = isFirst ? HOCUtils.cloneChildrenWith(rootIcon, { style: iconStyle }) :
    <NextLevelIcon style={iconStyle} />

    return (
      <FlatButton
        icon={icon}
        label={label}
        labelStyle={labelStyle}
        secondary={isLast && !isFirst}
        onClick={onAction}
        style={style}
      />
    )
  }
}

export default BreadcrumbElement
