/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Locales } from '@regardsoss/form-utils'

const messages = {
  'entities-attributes.form.table.value': 'Fixed value',
  'entities-attributes.form.table.type': 'Type',
  'entities-attributes.form.table.fragmentAndLabel': 'Fragment and attribute name',
  'entities-attributes.form.table.input': 'Attribute value',
  'entities-attributes.form.table.input.multiple': 'Attribute values',
  'entities-attributes.form.table.stringarray.action.remove': 'Remove the value',
  'entities-attributes.form.table.stringarray.action.add': 'Add a new value',

  'entities-files.form.DESCRIPTION.title': 'Description',
  'entities-files.form.DESCRIPTION.subtitle': 'Files describing the entité',
  'entities-files.form.THUMBNAIL.title': 'Thumbnail',
  'entities-files.form.THUMBNAIL.subtitle': 'The entity thumbnail',
  'entities-files.form.DOCUMENT.title': 'Documents',
  'entities-files.form.DOCUMENT.subtitle': 'Entity documents',
  'entities-files.form.nbFile.tooltip': `{nbFile} file{nbFile, plural, 
    =0 {} 
    one {} 
    other {s}
  }`,
  'entities-files.form.no-file.title': 'No file linked',
  'entities-files.form.no-file.message': 'This entity doesn\'t have any file linked',
  'entities-files.form.file.subtitle': 'File associated',
  'entities-files.form.action.add-file': 'Add files',
  'entities-files.form.upload.files.subtitle': 'Upload these files:',
  'entities-files.form.upload.refs.subtitle': 'Create link to external files: ',
  'entities-files.form.upload.action.send': 'Send',
  'entities-files.form.upload.action.cancel': 'Cancel',

  'entities-files.form.reference': 'Reference file n°',
  'entities-files.form.uri': 'Public URI of the file (*)',
  'entities-files.form.mimeType': 'Media type (*)',
  'entities-files.form.filename': 'Name to display for this file (*)',
  'entities-files.form.imageWidth': 'Image width',
  'entities-files.form.imageHeight': 'Image height',
  ...Locales.en,
}

export default messages
