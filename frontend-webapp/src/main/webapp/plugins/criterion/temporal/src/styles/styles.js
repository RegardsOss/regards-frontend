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

/**
 * Styles for plugin
 * @param theme Material UI theme, can be used to computed dynamic style values from current theme (automatically updated)
 * @author Raphaël Mechali
 */
const pluginStyles = theme => ({
  rootStyle: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  labelSpanStyle: {
    margin: '0px 10px',
  },
  datePickerTextFieldStyle: {
    top: -13,
    width: 120,
    margin: '0px 10px',
  },
  datePickerStyle: {
    margin: '0px 10px',
  },
  timePickerStyles: {
    width: 120,
    top: -13,
  },
  secondsTextFieldStyle: {
    top: -13,
    width: 90,
    margin: '0px 10px',
  },
  millisecondsTextFieldStyle: {
    top: -13,
    width: 90,
    margin: '0px 10px',
  },
  comparatorButtonStyle: {
    height: theme.button.iconButtonSize,
    width: theme.button.iconButtonSize,
    minWidth: 'initial',
  },
  comparatorMenuStyle: {
    display: 'none',
  },
  comparatorMenuItemStyle: {
    display: 'flex',
    textTransform: 'uppercase',
    justifyContent: 'center',
  },
})

export default pluginStyles
