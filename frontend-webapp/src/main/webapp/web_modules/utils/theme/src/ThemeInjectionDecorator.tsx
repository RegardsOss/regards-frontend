/** @module Common.Theme */
import * as React from "react"
import ThemeInjector from "./ThemeInjector"

/**
 * Decorator for injecting the Material-UI theme grabbed from context
 * as props to the the decorated component
 *
 * @type {function}
 * @return {React.Component<any, any>}
 */
export default function injectTheme(DecoratedComponent: React.ComponentClass<any>): any {

    class ThemeInjectionDecorator extends React.Component<any, any> {

      render (): JSX.Element {
        const decoratedComponentElement = React.createElement(
          DecoratedComponent,
          this.props
        )

        return (
          <ThemeInjector>
            {decoratedComponentElement}
          </ThemeInjector>
        )
      }
    }

    return ThemeInjectionDecorator

}
