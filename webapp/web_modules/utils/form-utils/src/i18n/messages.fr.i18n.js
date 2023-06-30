/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'invalid.array.required': 'Il doit y avoir au moins un élément dans la liste',
  'invalid.email': 'Adresse e-mail invalide',
  'invalid.url': 'Url invalide',
  'invalid.uri': 'URI invalide',
  'invalid.only_alphanumeric': 'Utilisez les caractères alphanumériques et "_"',
  'invalid.only_numeric': 'Utilisez les caractères numériques',
  'invalid.ip': 'IP invalide',
  'invalid.password': 'Le mot de passe doit correspondre au format attendu (voir ci-dessus)',
  'invalid.regex.pattern': 'La valeur doit correspondre au pattern {regexp} ',
  'invalid.numeric.range': 'Votre valeur doit être comprise entre {lowerBound} et {upperBound}',
  'invalid.string.size': 'La valeur doit contenir entre {minSize} et {maxSize} caractères',
  'invalid.number.lower.than.min': 'La valeur est trop petite',
  'invalid.number.greater.than.max': 'La valeur est trop grande',
  'invalid.string.no.space.no.special': 'Champs requis. La valeur contient un espace ou un caractère spécial',
  'invalid.integer.number': 'La valeur doit être un nombre entier',
  'invalid.positive.integer.number': 'La valeur doit être un nombre entier supérieur ou égal à 0',
  'invalid.floating.number': 'La valeur doit être un nombre flottant',
  'invalid.character': 'La valeur doit être un unique caractère',
  'invalid.mime_type': 'MimeType invalide (un mimeType valide est composé de deux mots-clefs séparés par le caractère / : application/xml).',
  'different.password': 'Les mots de passe doivent être identiques',
  'type.string': 'Le type devrait être String',
  'invalid.length.less.than': 'Utilisez {number} caractères ou moins',
  'invalid.length.more.than': 'Utilisez {number} caractères ou plus',
  'invalid.less.than': '{number} ou moins',
  'invalid.more.than': '{number} ou plus',
  'invalid.abs_path': 'Répertoire invalide. le répertoire doit commencer par \'/\'',
  'invalid.configuration': 'La configuration du formulaire n\'est pas valide',
  'invalid.cron': 'L\'expression cron est invalide',

  'form.datetimepicker.ok': 'Ok',
  'form.datetimepicker.cancel': 'Annuler',
  'form.datetimepicker.date.label': '{label} / date',
  'form.datetimepicker.time.label': '{label} / heure',
  'form.datetimepicker.clear': 'Réinitialiser',

  'renderer.fileField.file.name': 'Nom',
  'renderer.fileField.file.type': 'Type',
  'renderer.fileField.file.size': 'Taille',
  'renderer.fileField.button.select.label': 'Sélectionner un fichier',
  'renderer.fileField.button.change.label': 'Changer le fichier sélectionné',
  'renderer.fileField.no.file.selected': 'Aucun fichier sélectionné',

  'render.pageableAutoCompleteField.loading': 'Chargement ...',

  'field.default.help.title': 'A propos de ce champs',
  'field.help.close.button.label': 'Fermer',

  'render.array-field.values.title': 'Valeurs définies',
  'render.array-field.add.new.value.button': 'Ajouter',
  'render.array-field.new.value.hint': 'Nouvelle valeur ...',

  'render.array-object.options.title': 'Options',
  'render.array-object.delete.button': 'Supprimer',
  'render.array-object.duplicate.button': 'Dupliquer',
  'render.array-object.item.title': 'Élément {index}',
  'render.array-object.delete.confirm.title': 'Voulez-vous supprimer l\'élément ?',
  'render.array-object.add.button': 'Ajouter',
  'render.array-object.cancel.button': 'Annuler',

  'render.map-object.add.new.dialog.title': 'Ajouter un nouvel élément au paramètre «{parameter}»',
  'render.map-object.add.new.dialog.key.label': 'Clef du nouvel élément ... ',
  'render.map-object.key.already.exists.error': 'La valeur existe déjà.',
  'render.map-object.duplicate.key.not.exists': 'L\'élément à dupliquer n\'existe plus',

}

export default messages
