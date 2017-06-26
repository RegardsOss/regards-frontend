/**
 * LICENSE_PLACEHOLDER
 **/
import { Component, createElement } from 'react'
import DoubleLabelToggle from './DoubleLabelToggle'

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI component needs
 * @author erikras
 */
function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      // legacy from material-ui
      // eslint-disable-next-line react/no-string-refs
      return this.refs.component
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: 'component',
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}

export default createComponent(DoubleLabelToggle, ({
  input: { onChange, value, ...inputProps },
  defaultToggled,
  meta,
  intl,
  ...props
}) => ({
  ...inputProps,
  ...props,
  onToggle: onChange,
  toggled: !!value,
}))
