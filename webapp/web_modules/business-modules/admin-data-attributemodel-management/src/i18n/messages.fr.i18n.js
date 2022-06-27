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
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

const messages = {
  'attrmodel.list.delete.conditions': 'Seuls les attributs n\'appartenant à aucun modèle sont supprimables',
  'attrmodel.list.title': 'Attributs de modèles',
  'attrmodel.list.subtitle': 'Tous les attributs de modèles de données du projet',
  'attrmodel.list.table.fragment': 'Fragment',
  'attrmodel.list.table.name': 'Nom',
  'attrmodel.list.table.label': 'Label',
  'attrmodel.list.table.description': 'Description',
  'attrmodel.list.table.type': 'Type',
  'attrmodel.list.table.actions': 'Actions',
  'attrmodel.list.action.add': 'Ajouter',
  'attrmodel.list.action.cancel': 'Annuler',
  'attrmodel.list.action.edit': 'Éditer',
  'attrmodel.list.action.delete': 'Supprimer',
  'attrmodel.list.delete.title': 'Supprimer l\'attribut {name} ?',
  'attrmodel.list.empty.title': 'Aucun attribut défini',
  'attrmodel.list.filter.name': 'Filtrer par nom d\'attribut',

  'attrmodel.edit.title': 'Éditer l\'attribut de modèle {name}',
  'attrmodel.create.title': 'Ajouter un attribut de modèle',
  'attrmodel.form.name': 'Nom du l\'attribut',
  'attrmodel.form.label': 'Label de l\'attribut',
  'attrmodel.form.unit': 'Unité',
  'attrmodel.form.fragment': 'Fragment',
  'attrmodel.form.description': 'Description',
  'attrmodel.form.arraysize': 'Taille du tableau',
  'attrmodel.form.precision': 'Précision',
  'attrmodel.form.alterable': 'Modifiable',
  'attrmodel.form.optional': 'Optionnel',
  'attrmodel.form.config.elastic': 'Configuration ElasticSearch',
  'attrmodel.form.config.elastic.type.SIMPLE': 'Simple',
  'attrmodel.form.config.elastic.type.SIMPLE.searchable': 'Recherchable',
  'attrmodel.form.config.elastic.type.SIMPLE.searchable.info.button': 'Détails',
  'attrmodel.form.config.elastic.type.SIMPLE.searchable.dialog.title': 'Modification de l`\'attribut Recherchable',
  'attrmodel.form.config.elastic.type.SIMPLE.searchable.dialog.message': 'Si vous vous choisissez de rendre cet attribute recherchable, vous devez effacer l\'index manuellement puis réindexer tout votre catalogue. Rendre un attribut recherchable sur un grand volume de données utilise un très grand volume sur disque, veillez à ne rendre recherchable que les attributs qui doivent l\'être.',
  'attrmodel.form.config.elastic.type.SIMPLE.searchable.dialog.close': 'Fermer',
  'attrmodel.form.config.elastic.type.SIMPLE.restrict': 'Restreindre la recherche à certains champs',
  'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.title': 'JsonPath des champs recherchables',
  'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.add.warn': 'Confirmer l\'ajout du champ',
  'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.add.exist': 'Ce champ existe déjà',
  'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.hint': 'Nouveau champ',
  'attrmodel.form.config.elastic.type.ADVANCED': 'Avancée',
  'attrmodel.form.config.elastic.type.ADVANCED.esmapping': 'Mapping ElasticSearch',
  'attrmodel.form.type': 'Type',
  'attrmodel.form.action.cancel': 'Annuler',
  'attrmodel.form.action.submit': 'Sauvegarder',

  'attrmodel.form.unit.description.dialog.title': 'Unité de l\'attribut',
  'attrmodel.form.unit.description.dialog.content':
    'Saisissez l\'unité de mesure associée aux valeurs de l\'attribut, en suivant la norme IEEE 1541.<br/>'
    + 'Vous pouvez utiliser : <ul>'
    + '<li> - octets, octet, , ko, mo, go, to, po, eo</li>'
    + '<li> - bit, bits, b, kb, mb, gb, tb, pb, eb</li>'
    + '</ul>',
  'attrmodel.form.unit.description.dialog.close': 'Close',

  'attrmodel.form.restriction.NUMBER_RANGE.active': 'Activer une restriction pour limiter l\'ensemble des valeurs',
  'attrmodel.form.restriction.NUMBER_RANGE.min': 'Valeur minimale autorisée',
  'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive': 'Borne minimale incluse dans l\'ensemble',
  'attrmodel.form.restriction.NUMBER_RANGE.max': 'Valeur maximale autorisée',
  'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive': 'Borne maximale incluse dans l\'ensemble',

  'attrmodel.form.restriction.ENUMERATION.add': 'Ajouter une valeur :',
  'attrmodel.form.restriction.ENUMERATION.value': 'Valeur',
  'attrmodel.form.restriction.ENUMERATION.active': 'Définir l\'ensemble des valeurs autorisées à l\'aide d\'une énumération',
  'attrmodel.form.restriction.ENUMERATION.addinput': 'Nouvelle valeur de l\'ensemble',

  'attrmodel.form.restriction.PATTERN.pattern': 'Motif',
  'attrmodel.form.restriction.PATTERN.active': 'Activer une restriction par motif (Pattern ou Expression régulière)',

  'attrmodel.form.restriction.JSON_SCHEMA.schema': 'Json schema',

  'attrmodel.form.info.what-happens-when-you-add-an-attribute-to-fragment-already-used': 'Ajouter un attribut obligatoire à un fragment déjà utilisé par des modèles peut provoquer des erreurs lors des ingestions et des mises à jour futures',

  'invalid.only_1_restriction_on_the_same_time': 'Vous ne pouvez activer qu\'une seule restriction à la fois',
  ...Locales.fr,
}
messages[`attrmodel.form.fragment.${DEFAULT_FRAGMENT_NAME}`] = 'Pas de fragment'

export default messages
