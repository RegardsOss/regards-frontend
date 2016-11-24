import { themeContextType } from '@regardsoss/theme'


/**
 * React component to add the color on a text or another component
 */
class ErrorDecoratorComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const errorStyle = {
      color: this.context.muiTheme.palette.errorColor,
    }
    return (
      <span style={errorStyle}>
        { this.props.children }
      </span>
    )
  }
}

ErrorDecoratorComponent.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
}

export default ErrorDecoratorComponent
