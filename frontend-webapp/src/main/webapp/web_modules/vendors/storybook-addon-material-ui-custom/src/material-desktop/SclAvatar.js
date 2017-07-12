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

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const defaultProps = {
  scale: 0.8,
}

const propTypes = {
  scale: PropTypes.number,
  text: PropTypes.string,
}

export default function SclAvatar(props) {
  const style = {
    transform: `scale(${props.scale})`,
    transformOrigin: 'left',
//        left: -95 * (1 - props.scale) / 2,
//        position: 'absolute',
  }
  const chipProps = Object.assign({}, props)
  delete chipProps.text
  return (
    <div>
      <div style={style} >
        <Chip {...chipProps} >

          {<Avatar>{props.text[0].toUpperCase()}</Avatar>}
          {props.text}
        </Chip>

      </div>
    </div>
  )
}
SclAvatar.defaultProps = defaultProps
SclAvatar.propTypes = propTypes
