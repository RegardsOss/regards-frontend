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

const messages = {
  'entities-attributes.form.table.value': 'Valeur fixe',
  'entities-attributes.form.table.type': 'Type',
  'entities-attributes.form.table.fragmentAndLabel': 'Fragment et nom de l\'attribut',
  'entities-attributes.form.table.input': 'Valeur de l\'attribut',
  'entities-attributes.form.table.input.multiple': 'Valeurs de l\'attribut',
  'entities-attributes.form.table.stringarray.action.remove': 'Supprimer la valeur',
  'entities-attributes.form.table.stringarray.action.add': 'Ajouter une valeur',

  'entities-files.form.DESCRIPTION.title': 'Description',
  'entities-files.form.DESCRIPTION.subtitle': 'Fichiers décrivant l\'entité',
  'entities-files.form.THUMBNAIL.title': 'Vignette',
  'entities-files.form.THUMBNAIL.subtitle': 'La vignette de l\'entité',
  'entities-files.form.DOCUMENT.title': 'Documents',
  'entities-files.form.DOCUMENT.subtitle': 'Les différents documents',
  'entities-files.form.nbFile.tooltip': `{nbFile} fichier{nbFile, plural, 
    =0 {} 
    one {} 
    other {s}
  }`,
  'entities-files.form.no-file.title': 'Aucun fichier lié',
  'entities-files.form.no-file.message': 'Cette entité ne dispose pas de fichier associé',
  'entities-files.form.file.subtitle': 'Liste des fichiers associés',
  'entities-files.form.action.add-file': 'Ajouter des fichiers',
  'entities-files.form.upload.files.subtitle': 'Téléverser les fichiers suivant :',
  'entities-files.form.upload.refs.subtitle': 'Associer à des fichiers externes : ',
  'entities-files.form.upload.action.send': 'Envoyer',
  'entities-files.form.upload.action.cancel': 'Annuler',

  'entities-files.form.reference': 'Fichier référence n°',
  'entities-files.form.uri': 'URI public du fichier (*)',
  'entities-files.form.mimeType': 'Type de media (*)',
  'entities-files.form.filename': 'Nom à afficher pour ce fichier (*)',
  'entities-files.form.imageWidth': 'Largeur de l\'image',
  'entities-files.form.imageHeight': 'Hauteur de l\'image',
  ...Locales.fr,
}

export default messages
