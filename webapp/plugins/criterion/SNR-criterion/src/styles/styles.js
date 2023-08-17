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
 * Styles for plugin
 * @param theme Material UI theme, can be used to computed dynamic style values from current theme (automatically updated)
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export default function buildCriterionStyles(theme) {
  return {
    labelDivStyle: {
      width: '50%',
    },
    textFieldDivStyle: {
      width: '50%',
    },
    radioButtonGroupStyle: {
      display: 'flex',
      fontSize: '14px',
    },
    fieldLineStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    fieldLineStyleAlt: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      marginTop: '15px',
    },
    unitIconStyle: {
      marginRight: '5px',
    },
    unitLabelSyle: {
      width: '100%',
    },
    errorTextStyle: {
      width: '175px',
    },
  }
}
