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
export default (theme) => {
  const scrollContainerStyles = { zIndex: 5, background: 'rgba(0,0,0,0)' }
  const scrollbarStyles = {
    background: theme.palette.textColor,
    borderRadius: '3px',
    width: '6px',
  }
  return {
    scrollArea: {
      // scroll area common styles
      verticalScrollContainer: {
        styles: scrollContainerStyles,
      },
      horizontalScrollContainer: {
        styles: scrollContainerStyles,
      },
      verticalScrollbar: {
        styles: scrollbarStyles,
      },
      horizontalScrollbar: {
        styles: scrollbarStyles,
      },
    },
  }
}
