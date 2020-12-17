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

/**
 * Module message for FR local
 * @author Raphaël Mechali
 */
const messages = {
  ...Locales.fr, // form messages
  'attribute.thumbnail.alt': 'Aucune vignette',
  'attribute.thumbnail.action.close': 'Fermer',
  'attribute.render.label': '{jsonPath} ({label})',
  // Attributes configuration
  'attributes.configuration.add.one.item.label': 'Ajout simple',
  'attributes.configuration.add.many.items.label': 'Ajout multiple',
  'attributes.configuration.type.column': 'Type',
  'attributes.configuration.label.simple.column': 'Libellé',
  'attributes.configuration.label.english.column': 'Libellé anglais',
  'attributes.configuration.label.french.column': 'Libellé français',
  'attributes.configuration.attributes.column': 'Attribut(s)',
  'attributes.configuration.edit.option.tooltip': 'Éditer l\'élément',
  'attributes.configuration.delete.option.tooltip': 'Supprimer l\'élément',
  'attribute.configuration.add.many.items.title': 'Add many items',
  'attribute.configuration.add.many.items.select.all.label': 'Tout sélectionner',
  'attribute.configuration.add.many.items.select.none.label': 'Tout désélectionner',
  'attribute.configuration.new.item.title': 'Créer un élément',
  'attribute.configuration.edit.item.title': 'Modifier un élément',
  'attribute.configuration.cancel.edition': 'Annuler',
  'attribute.configuration.confirm.edition': 'Confirmer',
  'attribute.configuration.renderer.field': 'Affichage',
  'attribute.configuration.renderer.unset.default': 'Par défaut',
  'attribute.configuration.renderer.STRING.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.STRING.multiline': 'Multiligne',
  'attribute.configuration.renderer.INTEGER.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.DOUBLE.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.URL.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.BOOLEAN.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.STRING_ARRAY.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.INTEGER_ARRAY.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.DOUBLE_ARRAY.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.INTEGER_INTERVAL.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.DOUBLE_INTERVAL.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.LONG.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.LONG_INTERVAL.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.LONG_ARRAY.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.THUMBNAIL_PSEUDO_TYPE.defaultRenderer': 'Par défaut',
  'attribute.configuration.renderer.DATE_ISO8601.defaultRenderer': 'Par défaut: DD/MM/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_ISO8601.date': 'Date: DD/MM/YYYY',
  'attribute.configuration.renderer.DATE_ISO8601.dateWithMinutes': 'Date et temps: DD/MM/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_ISO8601.dateWithMilliseconds': 'Date précise: DD/MM/YYYY HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_ISO8601.time': 'Temps: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ISO8601.timeWithMilliseconds': 'Temps précis: HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_ARRAY.defaultRenderer': 'Par défaut: DD/MM/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_ARRAY.date': 'Date: DD/MM/YYYY',
  'attribute.configuration.renderer.DATE_ARRAY.dateWithMinutes': 'Date et temps: DD/MM/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_ARRAY.dateWithMilliseconds': 'Date précise: DD/MM/YYYY HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_ARRAY.time': 'Temps: HH:MM:SS',
  'attribute.configuration.renderer.DATE_ARRAY.timeWithMilliseconds': 'Temps précis: HH:MM:SS.sss',
  'attribute.configuration.renderer.DATE_INTERVAL.defaultRenderer': 'Par défaut: DD/MM/YYYY HH:MM:SS',
  'attribute.configuration.renderer.DATE_INTERVAL.date': 'Date: DD/MM/YYYY',
  'attribute.configuration.renderer.DATE_INTERVAL.dateWithMinutes': 'Date et temps: DD/MM/YYYY HH:MM',
  'attribute.configuration.renderer.DATE_INTERVAL.dateWithMilliseconds': 'Date précise',
  'attribute.configuration.renderer.DATE_INTERVAL.time': 'Temps: HH:MM:SS',
  'attribute.configuration.renderer.DATE_INTERVAL.timeWithMilliseconds': 'Temps précis: HH:MM:SS.sss',
  'attribute.configuration.label.en.field': 'Libellé anglais',
  'attribute.configuration.label.fr.field': 'Libellé français',
  'attribute.configuration.index.field': 'Ordre',
  'attribute.configuration.index.first': '1 - En premier',
  'attribute.configuration.index.after.element': '{index} - Après {label}',
  'attribute.configuration.single.attribute.field': 'Attribut',
  'attribute.configuration.single.attribute.error': 'Attribut valide requis',
  'attribute.configuration.multiple.attribute.field': 'Attributs',
  'attribute.configuration.selectable.attributes.table.attribute.column': 'Attribut',
  'attribute.configuration.selectable.attributes.header': `{count, plural, 
    =0 {Aucun attribut disponible}
    one {# attribut disponible}
    other {# attributs disponibles}
  }`,
  'attribute.configuration.selectable.attributes.filter': 'Filtrer',
  'attribute.configuration.selectable.attributes.no.data': 'Aucun attribut disponible',
  'attribute.configuration.selected.attributes.header': `{count, plural, 
    =0 {Aucun attribut défini}
    one {# attribut défini}
    other {# attributs définis}
  }`,
  'attribute.configuration.selected.attributes.table.attribute.column': 'Attribut',
  'attribute.configuration.selected.attributes.table.renderer.column': 'Affichage',
  'attribute.configuration.selected.attributes.no.data': 'Ajouter ici des attributs depuis le tableau des attributs disponibles, à gauche. Si vous en sélectionnez plusieurs, cet élément sera présenté groupé',
  'attribute.configuration.selected.attributes.error': 'Aucun attribut défini',
}

export default messages
