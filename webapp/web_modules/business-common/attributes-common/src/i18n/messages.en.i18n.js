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
import { Locales } from '@regardsoss/form-utils'

/**
* Module message for EN local
* @author Raphaël Mechali
*/
const messages = {
  ...Locales.en, // form messages
  'attribute.thumbnail.alt': 'Thumbnail',
  'attribute.render.label': '{jsonPath} ({label})',
  // Attributes configuration
  'attributes.configuration.add.one.item.label': 'Add one',
  'attributes.configuration.add.many.items.label': 'Add many',
  'attributes.configuration.type.column': 'Type',
  'attributes.configuration.label.simple.column': 'Label',
  'attributes.configuration.label.english.column': 'English label',
  'attributes.configuration.label.french.column': 'French label',
  'attributes.configuration.attributes.column': 'Attribute(s)',
  'attributes.configuration.edit.option.tooltip': 'Edit item',
  'attributes.configuration.delete.option.tooltip': 'Delete item',
  'attribute.configuration.add.many.items.title': 'Add many items',
  'attribute.configuration.add.many.items.select.all.label': 'Select all',
  'attribute.configuration.add.many.items.select.none.label': 'Unselect all',
  'attribute.configuration.new.item.title': 'Add new item',
  'attribute.configuration.edit.item.title': 'Edit item',
  'attribute.configuration.cancel.edition': 'Cancel',
  'attribute.configuration.confirm.edition': 'Confirm',
  'attribute.configuration.renderer.field': 'Renderer',
  'attribute.configuration.renderer.unset.default': 'Default',
  'attribute.configuration.renderer.STRING.defaultRenderer': 'Default',
  'attribute.configuration.renderer.STRING.multiline': 'Multiline',
  'attribute.configuration.renderer.INTEGER.defaultRenderer': 'Default',
  'attribute.configuration.renderer.DOUBLE.defaultRenderer': 'Default',
  'attribute.configuration.renderer.URL.defaultRenderer': 'Default',
  'attribute.configuration.renderer.URL.renderImage': 'Image',
  'attribute.configuration.renderer.BOOLEAN.defaultRenderer': 'Default',
  'attribute.configuration.renderer.STRING_ARRAY.defaultRenderer': 'Default',
  'attribute.configuration.renderer.INTEGER_ARRAY.defaultRenderer': 'Default',
  'attribute.configuration.renderer.DOUBLE_ARRAY.defaultRenderer': 'Default',
  'attribute.configuration.renderer.INTEGER_INTERVAL.defaultRenderer': 'Default',
  'attribute.configuration.renderer.DOUBLE_INTERVAL.defaultRenderer': 'Default',
  'attribute.configuration.renderer.LONG.defaultRenderer': 'Default',
  'attribute.configuration.renderer.LONG_INTERVAL.defaultRenderer': 'Default',
  'attribute.configuration.renderer.LONG_ARRAY.defaultRenderer': 'Default',
  'attribute.configuration.renderer.THUMBNAIL_PSEUDO_TYPE.defaultRenderer': 'Default',
  'attribute.configuration.renderer.DATE_ISO8601.defaultRenderer': 'Default: MM/DD/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_ISO8601.date': 'Date: MM/DD/YYYY',
  'attribute.configuration.renderer.DATE_ISO8601.dateWithMinutes': 'Date and time: MM/DD/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_ISO8601.dateWithMilliseconds': 'Accurate date and time: MM/DD/YYYY HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_ISO8601.time': 'Time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ISO8601.timeWithMilliseconds': 'Accurate time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ISO8601.dateIso': 'ISO Date: YYYY-MM-DDTHH:MM:SSZ',
  'attribute.configuration.renderer.DATE_ARRAY.defaultRenderer': 'Default: MM/DD/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_ARRAY.date': 'Date: MM/DD/YYYY',
  'attribute.configuration.renderer.DATE_ARRAY.dateWithMinutes': 'Date and time: MM/DD/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_ARRAY.dateWithMilliseconds': 'Accurate date and time: MM/DD/YYYY HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_ARRAY.time': 'Time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ARRAY.timeWithMilliseconds': 'Accurate time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ARRAY.dateIso': 'ISO Date: YYYY-MM-DDTHH:MM:SSZ',
  'attribute.configuration.renderer.DATE_INTERVAL.defaultRenderer': 'Default: MM/DD/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_INTERVAL.date': 'Date: MM/DD/YYYY',
  'attribute.configuration.renderer.DATE_INTERVAL.dateWithMinutes': 'Date and time: MM/DD/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_INTERVAL.dateWithMilliseconds': 'Accurate date and time: MM/DD/YYYY HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_INTERVAL.time': 'Time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_INTERVAL.timeWithMilliseconds': 'Accurate time: HH:MM:SS',
  'attribute.configuration.renderer.DATE_INTERVAL.dateIso': 'ISO Date: YYYY-MM-DDTHH:MM:SSZ',
  'attribute.render.version.label': '{label}:{version}',
  'attribute.render.simple.label': '{label}',
  'attribute.configuration.label.en.field': 'English label',
  'attribute.configuration.label.fr.field': 'French label',
  'attribute.configuration.index.field': 'Order',
  'attribute.configuration.index.first': '1 - First',
  'attribute.configuration.index.after.element': '{index} - After {label}',
  'attribute.configuration.single.attribute.field': 'Attribute',
  'attribute.configuration.single.attribute.error': 'Valid attribute required',
  'attribute.configuration.multiple.attribute.field': 'Attributes',
  'attribute.configuration.selectable.attributes.table.attribute.column': 'Attribute',
  'attribute.configuration.selectable.attributes.header': `{count, plural, 
    =0 {No available attribute}
    one {# available attribute}
    other {# available attributes}
  }`,
  'attribute.configuration.selectable.attributes.filter': 'Filter',
  'attribute.configuration.selectable.attributes.no.data': 'No attribute available',
  'attribute.configuration.selected.attributes.header': `{count, plural, 
    =0 {No attribute}
    one {# attribute}
    other {# attributes}
  } defined`,
  'attribute.configuration.selected.attributes.table.attribute.column': 'Attribute',
  'attribute.configuration.selected.attributes.table.renderer.column': 'Renderer',
  'attribute.configuration.selected.attributes.no.data': 'Add here attributes from the available attributes table on the left. When adding more than one attribute, that element will be displayed as a group',
  'attribute.configuration.selected.attributes.error': 'No attribute defined',
}

export default messages
