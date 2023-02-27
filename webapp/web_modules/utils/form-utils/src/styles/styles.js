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
* Form utils styles
* @author Raphaël Mechali
*/
export default function styles(theme) {
  return {
    /** Form presentation */
    field: {
      error: {
        color: theme.textField.errorColor,
      },
    },
    formContainer: {
      class: 'container-fluid',
    },
    formRow: {
      class: 'row',
    },
    // fields group
    fieldsGroup: {
      defaultClass: 'col-xs-100 col-md-48',
      fullWidthClass: 'col-xs-100',
      titleStyle: {
        color: theme.palette.textColor,
        fontSize: '1.2em',
      },
      defaultStyle: {
        marginRight: 20,
      },
      defaultContentStyle: {
        marginTop: 15,
        marginBottom: 20,
      },
      clearSpaceToChildrenStyle: {
        marginTop: -10, // this is used to clear some of the MUI space on top of text fields
        marginBottom: 20,
      },
    },
    // json editor field
    jsonFieldStyles: {
      containerStyle: {
        width: '100%',
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
    fieldsLine: {
      height: theme.formsExtensions.dateField.height,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    // date field
    dateFieldStyles: {
      datePickerDivStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '75%',
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
      cardStyle: {
        width: '100%',
      },
      titleStyle: {
        width: '100%',
      },
      contentStyle: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '196px',
        width: '100%',
      },
      leftColumnStyle: {
        width: '18%',
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
    renderFieldArray: {
      fieldListStyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginBottom: 20,
      },
      chipSeparator: {
        height: 24,
        width: 1,
        background: theme.toolbar.separatorColor,
        margin: '12px 25px 12px 10px',
      },
      info: {
        marginTop: '26px',
        marginBottom: '-5px',
      },
      warnMessageStyle: {
        color: theme.formsExtensions.validation.warningColor,
      },
      errorMessageStyle: {
        color: theme.formsExtensions.validation.errorColor,
      },
      chip: {
        margin: '8px 20px 8px 0',
      },
    },
  }
}
