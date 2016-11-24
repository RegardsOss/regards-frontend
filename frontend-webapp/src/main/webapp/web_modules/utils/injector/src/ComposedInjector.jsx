import { intlShape } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'

/**
 * Retrieves intl fom the context
 * and injects it as a prop to its child
 */
class ComposedInjector extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  }
  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }

  mapContextToChildProps() {
    return {
      intl: this.context.intl,
      theme: this.context.muiTheme,
    }
  }

  render() {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps.bind(this))
    // const mergedContexts = _
    //   .chain(this.props.injectors)
    //   .map((injector: any) => React.createElement(injector, {}, child))
    //   .keyBy((injector: any) => _.keys(injector.props.map))
    //   .value()
  }
}


export default ComposedInjector
