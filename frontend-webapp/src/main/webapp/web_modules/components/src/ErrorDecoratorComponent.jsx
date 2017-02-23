import { themeContextType } from '@regardsoss/theme'


/**
 * React components to add the color on a text or another components
 */
class ErrorDecoratorComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const errorStyle = {
      color: this.context.muiTheme.textField.errorColor,
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
