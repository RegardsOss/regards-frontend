/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import mapValues from 'lodash/mapValues'

/**
 * Decorates the material-ui's RaisedButton in order to handle an entirely specific behaviour on button hover.
 *
 * The component expects for each prop a 2-lenght array argument instead of a single value.
 * The first value will be used as default and the second will be used on button hover.
 */
class OnHoverSwitchRaisedButton extends React.Component {
  static propTypes = {
    label: PropTypes.arrayOf(PropTypes.string),
    // this components also accepts all properties of RaisedButton
  }

  /** Initial state */
  state = {
    usedPropIndex: 0,
  }

  handleOnMouseEnter = () => {
    this.setState({
      usedPropIndex: 1,
    })
  }

  handleOnMouseLeave = () => {
    this.setState({
      usedPropIndex: 0,
    })
  }

  render() {
    const usedProps = mapValues(this.props, (prop) => prop[this.state.usedPropIndex])
    usedProps.onMouseEnter = this.handleOnMouseEnter
    usedProps.onMouseLeave = this.handleOnMouseLeave

    return (
      <RaisedButton {...usedProps} />
    )
  }
}

export default OnHoverSwitchRaisedButton
