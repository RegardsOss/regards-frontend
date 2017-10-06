/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import NextLevelIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { themeContextType } from '@regardsoss/theme'

/**
* Breadcrumb element displayer, to be built by a parent Breadcrumb
*/
class BreadcrumbElement extends React.Component {

  static propTypes = {
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onAction: PropTypes.func.isRequired, // callback () => void
    label: PropTypes.string.isRequired,
    RootIconConstructor: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { isFirst, isLast, onAction, label, RootIconConstructor } = this.props
    const { element: { style, iconStyle, labelStyle } } = this.context.moduleTheme.breadcrumb
    const IconConstructor = isFirst ? RootIconConstructor : NextLevelIcon
    return (
      <FlatButton
        icon={<IconConstructor style={iconStyle} />}
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
