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
const jsonFieldNameInTheme = 'forms-extension:jsonField'
const dateFieldNameInTheme = 'forms-extension:dateField'

/**
 * Form utils styles
 * @author Raphaël Mechali
 */
export default function styles(theme) {
  const jsonFieldThemeValues = theme[jsonFieldNameInTheme]
  const dateFieldThemeValues = theme[dateFieldNameInTheme]
  return {
    // json editor field
    jsonFieldStyles: {
      containerStyle: {
        padding: jsonFieldThemeValues.padding,
        lineHeight: jsonFieldThemeValues.lineHeight,
      },
      fieldStyle: {
        width: '100%',
        height: jsonFieldThemeValues.height,
        marginTop: jsonFieldThemeValues.marginTop,
      },
      labelStyle: {
        color: theme.textField.floatingLabelColor,
      },
      editorProps: {
        showLineNumbers: jsonFieldThemeValues.showLineNumbers,
        readOnly: false,
      },
    },
    // date field
    dateFieldStyles: {
      fieldsLine: {
        marginTop: dateFieldThemeValues.marginTop,
        height: dateFieldThemeValues.height,
        display: 'flex',
        alignItems: 'center',
      },
      datePicker: {
        margin: dateFieldThemeValues.innerMargins,
        flexGrow: 1,
      },
      datePickerText: {
        width: '100%',
        top: dateFieldThemeValues.textTop,
      },
      timePicker: {
        flexGrow: 1,
      },
      timePickerText: {
        width: '100%',
        top: dateFieldThemeValues.textTop,
      },
    },
  }
}