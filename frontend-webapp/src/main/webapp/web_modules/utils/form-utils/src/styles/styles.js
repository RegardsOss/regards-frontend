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
* Form utils styles
* @author Raphaël Mechali
*/
export default function styles(theme) {
  return {
    // json editor field
    jsonFieldStyles: {
      containerStyle: {
        padding: theme.formsExtensions.jsonField.padding,
        lineHeight: theme.formsExtensions.jsonField.lineHeight,
      },
      fieldStyle: {
        width: '100%',
        height: theme.formsExtensions.jsonField.height,
        marginTop: theme.formsExtensions.jsonField.marginTop,
      },
      labelStyle: {
        color: theme.textField.floatingLabelColor,
      },
      editorProps: {
        showLineNumbers: theme.formsExtensions.jsonField.showLineNumbers,
        readOnly: false,
      },
    },
    // date field
    dateFieldStyles: {
      fieldsLine: {
        marginTop: theme.formsExtensions.dateField.marginTop,
        height: theme.formsExtensions.dateField.height,
        display: 'flex',
        alignItems: 'center',
      },
      datePicker: {
        margin: theme.formsExtensions.dateField.innerMargins,
        flexGrow: 1,
      },
      datePickerText: {
        width: '100%',
        top: theme.formsExtensions.dateField.textTop,
      },
      timePicker: {
        flexGrow: 1,
      },
      timePickerText: {
        width: '100%',
        top: theme.formsExtensions.dateField.textTop,
      },
    },
    autoCompleteFields: {
      listStyle: {
        maxHeight: '200px',
        overflow: 'auto',
      },
    },
    arrayField: {
      layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
      },
      list: {
      },
      listContent: {
        maxHeight: '150px',
        minWidth: '200px',
        overflow: 'auto',
      },
      text: {
        margin: '0px 15px',
      },
      errorIconStyle: {
        color: theme.formsExtensions.validation.errorColor,
      },
    },
    mapField: {
      item: {
        textStyle: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        errorIconStyle: {
          color: theme.formsExtensions.validation.errorColor,
        },
      },
    },
    arrayObject: {
      layoutStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid',
        borderColor: theme.palette.borderColor,
      },
      titleStyle: {
        width: '100%',
      },
      contentStyle: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '196px',
        maxHeight: '484px',
        width: '100%',
      },
      leftColumnStyle: {
        width: '33%',
        borderRight: '1px solid',
        borderColor: theme.palette.borderColor,
        display: 'flex',
        flexDirection: 'column',
      },
      leftListStyle: {
        flexGrow: '1',
        overflow: 'auto',
      },
      leftButtonStyle: {
        flexGrow: '0',
      },
      rightColumnStyle: {
        width: '82%',
        overflow: 'auto',
        margin: '0px 15px',
      },
    },
    doubleLabelToggleStyles: {
      wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
      },
      rightLabel: {
        marginLeft: 10,
      },
    },
  }
}
