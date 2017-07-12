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

const propTypes = {
  scale: PropTypes.number.isRequired,
  path: PropTypes.string,
}

const defaultProps = {
  scale: 0.8,
  path: 'material-ui/svg-icons/action/home',
}

const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
}


export default class SvgIcon extends React.Component {
  constructor(props, context) {
    super(props, context)

    require.ensure([], (require) => {
      const Icon = require('material-ui/svg-icons/action/home')
      this.ActionHome = Icon.default
    })

    this.scaleProp = {
      style: { transform: `scale(${props.scale})` },
    }
  }

  render() {
    return (
      <div>
        <div {...this.scaleProp} >
          {<this.ActionHome
            color={this.context.muiTheme.palette.secondaryTextColor}
          />}
        </div>
      </div>
    )
  }
}


SvgIcon.propTypes = propTypes
SvgIcon.defaultProps = defaultProps
SvgIcon.contextTypes = contextTypes
