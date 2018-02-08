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
import React from 'react'
import IconButton from 'material-ui/IconButton'

const propTypes = {
  iconScale: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string,
  tooltipPosition: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func,
}

const defaultProps = {
  iconScale: 0.8,
  tooltipPosition: 'top-center',
  width: 32,
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
}


export default class SvgButton extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.scaleProp = {
      style: {
        transform: `scale(${props.iconScale})`,
        width: 24,
        margin: '0 auto',
      },
    }
    this.butnProp = {
      style: {
        marginLeft: (24 - props.width) / 2,
        width: props.width,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      title: props.tooltip,
      onClick: props.onClick,
    }
  }

  render() {
    const icon = React.cloneElement(this.props.icon, {
      color: this.context.muiTheme.palette.secondaryTextColor,
    })
    return (
      <div
        style={{
          width: 24,
        }}
      >
        <div {...this.butnProp} >
          <div style={{ width: 48 }}>
            <IconButton
              tooltip={null}
              style={{ padding: 0 }}
            >
              <div>
                <div {...this.scaleProp} >
                  {icon}
                </div>
              </div>
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}


SvgButton.propTypes = propTypes
SvgButton.defaultProps = defaultProps
SvgButton.contextTypes = contextTypes
