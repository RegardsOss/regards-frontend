/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const messages = {
  'invalid.required': 'Required',
  'invalid.array.required': 'There should be at least one item in this list',
  'invalid.email': 'Invalid email address',
  'invalid.url': 'Invalid URL',
  'invalid.uri': 'Invalid URI',
  'invalid.only_alphanumeric': 'Use alphanumeric characters and "_"',
  'invalid.only_numeric': 'Use numeric characters',
  'invalid.ip': 'Invalid IP',
  'invalid.password': 'The password must match expected format (see above)',
  'invalid.regex.pattern': 'The value must match {regexp} ',
  'invalid.numeric.range': 'The value must be between {lowerBound} and {upperBound}',
  'invalid.string.size': 'The value must be between {minSize} and {maxSize} characters length',
  'invalid.number.lower.than.min': 'The value is too small',
  'invalid.number.greater.than.max': 'The value is too large',
  'invalid.integer.number': 'The value must be an integer',
  'invalid.positive.integer.number': 'The value must be an integer greater than or equal to 0',
  'invalid.floating.number': 'The value must be a float number',
  'invalid.character': 'The value must be a single character',
  'invalid.mime_type': 'MimeType invalid (mimeType should be composed with two keywords separated by the / character like application/xml).',
  'different.password': 'Entered passwords must match',
  'type.string': 'Type should be String',
  'invalid.length.less.than': 'Use {number} characters or fewer',
  'invalid.length.more.than': 'Use {number} characters or more',
  'invalid.less.than': '{number} or less',
  'invalid.more.than': '{number} or more',
  'invalid.abs_path': 'Directory is not a valid absolute path. Should start with /',
  'invalid.configuration': 'Invalid form configuration',

  'form.datetimepicker.ok': 'Ok',
  'form.datetimepicker.cancel': 'Cancel',
  'form.datetimepicker.date.label': '{label} / date',
  'form.datetimepicker.time.label': '{label} / time',
  'form.datetimepicker.clear': 'Reset',

  'renderer.fileField.file.name': 'Name',
  'renderer.fileField.file.type': 'Type',
  'renderer.fileField.file.size': 'Size',
  'renderer.fileField.button.select.label': 'Select a file',
  'renderer.fileField.button.change.label': 'Change selected file',
  'renderer.fileField.no.file.selected': 'No file selected',

  'render.pageableAutoCompleteField.loading': 'loading ...',

  'field.default.help.title': 'About field',
  'field.help.close.button.label': 'Close',

  'render.array-field.values.title': 'Defined values',
  'render.array-field.add.new.value.button': 'Add',
  'render.array-field.new.value.hint': 'New value ...',

  'render.array-object.options.title': 'Options',
  'render.array-object.delete.button': 'Delete',
  'render.array-object.duplicate.button': 'Duplicate',
  'render.array-object.item.title': 'Item {index}',
  'render.array-object.delete.confirm.title': 'Do you want to delete {index} ?',
  'render.array-object.add.button': 'Add',
  'render.array-object.cancel.button': 'Cancel',

  'render.map-object.add.new.dialog.title': 'Add new element to the map parameter «{parameter}»',
  'render.map-object.add.new.dialog.key.label': 'New element key',
  'render.map-object.key.already.exists.error': 'Selected value already exists.',
  'render.map-object.duplicate.key.not.exists': 'Element to duplicate does not exist anymore',
}

export default messages
