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

/**
 * Styles for board items components
 * @param theme
 * @author Sébastien Binda
 */
const styles = (theme) => ({
  section: {
    classes: ['row'].join(' '),
    styles: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  items: {
    classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
    styles: {
      margin: 10,
      minHeight: 200,
    },
    titleStyles: {
      backgroundColor: theme.palette.accent2Color,
    },
    contentStyles: {
      minHeight: '170px',
    },
  },
  action: {
    classes: ['row'].join(' '),
    styles: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
  },
  cardActionsStyles: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  links: {
    textDecoration: 'blink',
  },
  icon: {
    smallIcon: {
      width: 36,
      height: 36,
    },
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
  },
  actionIconWithNotifications: {
    badgeStyles: {
      position: 'absolute',
      zIndex: '1',
      top: '-5px',
      right: '7px',
      width: '16px',
      height: '16px',
    },
    iconStyles: {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
    },
  },
})

export default styles
