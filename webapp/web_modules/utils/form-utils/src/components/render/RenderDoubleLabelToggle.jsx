/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { Component } from 'react'
import DoubleLabelToggle from '../DoubleLabelToggle'

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI component needs
 * @author erikras
 */
function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    static displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`

    childRef = React.createRef()

    // eslint-disable-next-line react/no-unused-class-component-methods
    getRenderedComponent() {
      return this.childRef.current
    }

    render() {
      return (
        <MaterialUIComponent
          ref={this.childRef}
          {...mapProps(this.props)}
        />
      )
    }
  }
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
