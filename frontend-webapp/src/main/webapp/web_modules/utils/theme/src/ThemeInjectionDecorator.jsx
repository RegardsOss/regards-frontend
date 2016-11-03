/** @module Common.Theme */

import ThemeInjector from './ThemeInjector'

/**
 * Decorator for injecting the Material-UI theme grabbed from context
 * as props to the the decorated component
 *
 * @type {function}
 * @return {React.Component<any, any>}
 */
export default function injectTheme(DecoratedComponent) {
  function ThemeInjectionDecorator(props) {
    const decoratedComponentElement = React.createElement(
      DecoratedComponent,
      props
    )

    return (
      <ThemeInjector>
        {decoratedComponentElement}
      </ThemeInjector>
    )
  }

  return ThemeInjectionDecorator
}
