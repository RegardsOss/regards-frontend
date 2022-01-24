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

export default ({
  palette: { textColor },
  spacing: { iconSize },
}) => ({
  svgURLIconStyle: {
    display: 'inline-block',
    fill: textColor,
    height: iconSize,
    width: iconSize,
  },
  commonURLIconStyle: {
    height: iconSize,
    width: iconSize,
  },
  placeholderURLIconStyle: {
    display: 'inline-block',
    height: iconSize,
    width: iconSize,
  },
  clickablePicture: {
    root: { // a default style for root container (can be overridden)
      height: iconSize,
      width: iconSize,
    },
    normalPicture: {
      cursor: 'zoom-in',
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    noPicture: {
      height: '100%',
      width: '100%',
    },
    dialog: {
      content: {
        padding: 0,
      },
    },
  },
})
