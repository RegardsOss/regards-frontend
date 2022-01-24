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

/**
 * Factorization for resizer style to be used with react-split-pane
 * @param {*} theme contextual theme
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export function buildSplitResizerStyle(theme) {
  return {
    backgroundColor: theme.components.resizerSeparator.backgroundColor,
    // Create an handle of 1 pixel visible but width half size * 2 (consume the remaining width on borders)
    width: (theme.components.resizerSeparator.halfSize * 2) + 1,
    margin: `0 -${theme.components.resizerSeparator.halfSize}px`,
    borderLeft: `${theme.components.resizerSeparator.halfSize}px solid #00000000`,
    borderRight: `${theme.components.resizerSeparator.halfSize}px solid #00000000`,
    cursor: 'col-resize',

    zIndex: 1,

    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',

    MozBackgroundClip: 'padding',
    WebkitBackgroundClip: 'padding',
    backgroundClip: 'padding-box',
  }
}
