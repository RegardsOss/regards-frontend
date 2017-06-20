/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'

/**
* Breadcrumb element displayer, to be built by a parent Breadcrumb
*/
class BreadcrumbElement extends React.Component {

  static propTypes = {
    onAction: PropTypes.func.isRequired, // callback () => void
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }


  componentWillMount = () => {
    // initially not hover
    this.setMouseOver(false)
  }

  onMouseOver = () => this.setMouseOver(true)

  onMouseOut = () => this.setMouseOver(false)

  setMouseOver = mouseOver => this.setState({ mouseOver })


  render() {
    const { onAction, label } = this.props
    const { mouseOver } = this.state
    const { path, pathHover } = this.context.moduleTheme.breadcrumb
    const elementStyle = mouseOver ? pathHover : path
    return (
      <button
        style={elementStyle}
        onClick={onAction}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {label}
      </button>
    )
  }
}

export default BreadcrumbElement
