import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'attrmodel.list.title': 'Liste des attribts modèles de données',
  'attrmodel.list.subtitle': 'Gestion des attributs de modèle de données de REGARDS',
  'attrmodel.list.table.name': 'Nom',
  'attrmodel.list.table.description': 'Description',
  'attrmodel.list.table.type': 'Type',
  'attrmodel.list.table.actions': 'Actions',
  'attrmodel.list.action.add': 'Ajouter',
  'attrmodel.list.action.cancel': 'Annuler',

  'attrmodel.edit.title': 'Editer l\'attribut de modèle {name}',
  'attrmodel.create.title': 'Ajouter un attribut de modèle',
  'attrmodel.form.name': 'Nom du l\'attribut',
  'attrmodel.form.description': 'Description',
  'attrmodel.form.alterable': 'Modifiable',
  'attrmodel.form.optional': 'Optionnel',
  'attrmodel.form.queryable': 'Requêtable, utilisable en temps que critère lors des recherches utilisateurs',
  'attrmodel.form.facetable': 'Facettable',
  'attrmodel.form.type': 'Type',
  'attrmodel.form.action.cancel': 'Annuler',
  'attrmodel.form.action.submit': 'Sauvegarder',

  'attrmodel.form.restriction.NUMBER_RANGE.active': 'Activer une restriction pour limiter l\'ensemble des valeurs',
  'attrmodel.form.restriction.NUMBER_RANGE.min': 'Valeur minimale autorisée',
  'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive': 'Borne minimale incluse dans l\'ensemble',
  'attrmodel.form.restriction.NUMBER_RANGE.max': 'Valeur maximale autorisée',
  'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive': 'Borne maximale incluse dans l\'ensemble',

  'attrmodel.form.restriction.ENUMERATION.add': 'Ajouter une nouvelle valeur:',
  'attrmodel.form.restriction.ENUMERATION.value': 'Valeur',
  'attrmodel.form.restriction.ENUMERATION.active': 'Définir l\'ensemble des valeurs autorisées à l\'aide d\'une énumération',
  'attrmodel.form.restriction.ENUMERATION.addinput': 'Nouvelle valeur de l\'ensemble',

  'attrmodel.form.restriction.PATTERN.pattern': 'Motif',
  'attrmodel.form.restriction.PATTERN.active': 'Activer une restriction par motif (aka Pattern ou Expression régulières)',

  'invalid.min_3_carac': 'Minimum 3 caractères',
  'invalid.max_32_carac': 'Maximum 32 caractères',

  'invalid.only_1_restriction_on_the_same_time': 'Vous ne pouvez activer qu\'une seule restriction à la fois',
}, Locales.fr)

export default messages
