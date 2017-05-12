/**
 * LICENSE_PLACEHOLDER
 **/
import themeContextType from './contextType'

/**
 * Retrieves the Material UI theme fom the context and injects it as a prop to its child.
 */
class ThemeInjector extends React.Component {

  static context = {
    ...themeContextType,
  }

  mapContextToChildProps = () => ({
    theme: this.context.muiTheme,
  })

  render() {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
  }
}

ThemeInjector.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ThemeInjector
