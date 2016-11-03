/** @module Todo */

import { ThemeContextType, ThemeContextInterface } from '@regardsoss/theme'
// Containers
/*

export interface ErrorDecoratorProps {
  muiTheme?: any
}
*/

/**
 * React component to add the color on a text or another component
 */
export default class ErrorDecoratorComponent extends React.Component {
  static contextTypes = ThemeContextType
  context

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

