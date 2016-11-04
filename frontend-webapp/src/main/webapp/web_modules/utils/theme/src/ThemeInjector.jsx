/** @module CommonTheme */

import ThemeContextType from './ThemeContainerInterface'

/**
 * Retrieves the Material UI theme fom the context and injects it as a prop to its child.
 */
class ThemeInjector extends React.Component {

  static contextTypes = {
    muiTheme: ThemeContextType.muiTheme,
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
  children: React.PropTypes.element.isRequired,
}

export default ThemeInjector
