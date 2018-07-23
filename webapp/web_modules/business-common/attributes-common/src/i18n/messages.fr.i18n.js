/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  // Attributes configuration
  'attributes.configuration.header.count': `{count, plural, 
    =0 {Aucun élément défini}
    one {# élément défini}
    other {# éléments définis}
  }`,
  'attributes.configuration.add.item.label': 'Ajouter',
  'attributes.configuration.type.column': 'Type',
  'attributes.configuration.label.simple.column': 'Label',
  'attributes.configuration.label.english.column': 'Label anglais',
  'attributes.configuration.label.french.column': 'Label français',
  'attributes.configuration.attributes.column': 'Attribut(s)',
  'attributes.configuration.edit.option.tooltip': 'Editer l\'élément',
  'attributes.configuration.delete.option.tooltip': 'Supprimer l\'élément',
  'attribute.configuration.new.item.title': 'Créer un élément',
  'attribute.configuration.edit.item.title': 'Modifief un élément',
  'attribute.configuration.cancel.edition': 'Annuler',
  'attribute.configuration.confirm.edition': 'Confirmer',
  'attribute.configuration.label.en.field': 'Label anglais',
  'attribute.configuration.label.fr.field': 'Label français',
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
  'attribute.configuration.selectable.attributes.no.data': 'No available attribute',
  'attribute.configuration.selected.attributes.header': `{count, plural, 
    =0 {Aucun attribut défini}
    one {# attribut défini}
    other {# attributs définis}
  }`,
  'attribute.configuration.selected.attributes.table.attribute.column': 'Attribut',
  'attribute.configuration.selected.attributes.no.data': 'Ajouter ici des attributs depuis le tableau des attributs disponibles, à gauche. Si vous en sélectionnez plusieurs, cet élément sera présenté groupé',
  'attribute.configuration.selected.attributes.error': 'Aucun attribut défini',
}

export default messages
