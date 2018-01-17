/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isFunction from 'lodash/isFunction'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { ShowableAtRender } from '@regardsoss/display-control'

/**
 * A generic button used for UI actions
 *
 * It can handle actions defined as:
 * - a url => it will use a <Link> component
 * - a onTouchTap callback
 */
class ActionButtonComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    button: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    url: PropTypes.string,
    onTouchTap: PropTypes.func,
    isVisible: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.any),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
  }

  static defaultProps = {
    label: '',
    button: RaisedButton,
    primary: false,
    secondary: false,
    style: {},
    isVisible: true,
    type: 'button',
  }

  /**
   * Controls that props provided are correct
   * @param props
   */
  componentWillReceiveProps(props) {
    if (props.type === 'submit') {
      // Clicking on this button will submit the parent form
    } else if (props.url === undefined && props.onTouchTap === undefined) {
      throw new Error('No behavior specified. Please specify props.url or props.onTouchTap')
    } else if (props.url && props.url.length > 0 && isFunction(props.onTouchTap)) {
      throw new Error('Too many behavior specified. Please specify either props.url or props.onTouchTap')
    }
  }

  getComponent = (Component, props) => (
    <Component {...props} />
  )

  render() {
    const {
      className, button, isVisible, disabled, url, style, label, primary, secondary, onTouchTap, type, title,
    } = this.props
    return (
      <ShowableAtRender show={isVisible}>
        {(() => {
          if (url) {
            return (
              <Link to={url} style={style}>
                {this.getComponent(button, {
                  className,
                  label,
                  primary,
                  secondary,
                  type,
                  disabled,
                  title,
                })}
              </Link>
            )
          }
          return (
            this.getComponent(button, {
              className,
              label,
              primary,
              secondary,
              onTouchTap,
              type,
              disabled,
              title,
            })
          )
        })()}
      </ShowableAtRender>
    )
  }
}

export default ActionButtonComponent
