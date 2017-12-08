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
const messages = {
  'invalid.required': 'Champs requis',
  'invalid.email': 'Addresse e-mail invalide',
  'invalid.url': 'Url invalide',
  'invalid.only_alphanumeric': 'Utilisez les caractères alphanumériques et "_"',
  'invalid.only_numeric': 'Utilisez les caractères numériques',
  'invalid.ip': 'IP invalide',
  'invalid.password': 'Le mot de passe doit correspondre au format attendu (voir ci-dessus)',
  'invalid.regex.pattern': 'La valeur doit correspondre au pattern {regexp} ',
  'invalid.numeric.range': 'Votre valeur doit être comprise entre {lowerBound} et {upperBound}',
  'invalid.string.size': 'La valeur doit contenir entre {minSize} et {maxSize} caractères',
  'invalid.number.lower.than.min': 'La valeur est trop petite',
  'invalid.number.greater.than.max': 'La valeur est trop grande',
  'invalid.integer.number': 'La valeur doit être un nombre entier',
  'invalid.floating.number': 'La valeur doit être un nombre flottant',
  'invalid.character': 'La valeur doit être un unique caractère',
  'different.password': 'Les mots de passe doivent être identiques',
  'type.string': 'Le type devrait être String',
  'invalid.length.less.than': 'Utilisez {number} caractères ou moins',
  'invalid.length.more.than': 'Utilisez {number} caractères ou plus',
  'invalid.less.than': '{number} ou moins',
  'invalid.more.than': '{number} ou plus',

  'form.datetimepicker.ok': 'Ok',
  'form.datetimepicker.cancel': 'Annuler',
  'form.datetimepicker.date.label': '{label} / date',
  'form.datetimepicker.time.label': '{label} / heure',
  'form.datetimepicker.clear': 'Reinitialiser',

  'renderer.fileField.file.name': 'Nom',
  'renderer.fileField.file.type': 'Type',
  'renderer.fileField.file.size': 'Taille',
  'renderer.fileField.button.select.label': 'Sélectionner un fichier',
  'renderer.fileField.button.change.label': 'Changer le fichier sélectionné',
  'renderer.fileField.no.file.selected': 'Aucun fichier sélectionné',

  'render.pageableAutoCompleteField.loading': 'Chargement ...',

  'render.array-field.values.title': 'Valeurs définies',
  'render.array-field.add.new.value.button': 'Ajouter',
  'render.array-field.new.value.hint': 'Nouvelle valeur ...',

}

export default messages
