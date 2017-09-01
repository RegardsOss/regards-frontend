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
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'document.list.action.add': 'Ajouter',
  'document.list.action.cancel': 'Annuler',
  'document.list.title': 'Documents',
  'document.list.subtitle': 'Les documents sont des entités portant des fichiers',
  'document.list.delete.message': 'Supprimer le document {name} ?',

  'document.list.action.edit': 'Editer',
  'document.list.action.duplicate': 'Dupliquer',
  'document.list.action.delete': 'Supprimer',

  'document.list.table.label': 'Label',
  'document.list.table.actions': 'Actions',
  'document.list.table.model': 'Modèle',

  'document.no.dataset.title': 'Aucun document',

  'document.form.links.component.subtitle': 'Lien de la document courante',
  'document.form.links.remainingdocument.subtitle': 'Document disponibles',
  'document.form.links.document.subtitle': 'Document liées',
  'document.form.links.subtitle': 'Les documents disposent de liens entre elles afin de simplifier la recherche',
  'document.form.links.title': 'Mise à jour des liens entre documents',
  'document.form.links.action.done': 'Terminer',
  'document.form.links.action.cancel': 'Retour',
  'document.form.links.remainingdocument.search': 'Filtrer les documents sur leur nom',


  'document.form.files.title': 'Gestion des fichiers du document {name}',
  'document.form.files.subtitle': 'Vous pouvez ajouter de nouveaux fichiers à votre document, ou supprimer ceux déjà présent',
  'document.form.files.action.next': 'Suite',
  'document.form.files.action.cancel': 'Annuler',



  'document.form.action.next': 'Suivant',
  'document.form.action.cancel': 'Annuler',
  'document.form.model': 'Modèles de document',
  'document.form.label': 'Libellé',
  'document.form.geometry': 'Géometrie',
  'document.form.table.value': 'Valeur fixe',
  'document.form.table.fragmentAndLabel': 'Fragment et Nom de l\'attribut du modèle',
  'document.form.table.type': 'Type',
  'document.form.table.input': 'Valeur de l\'attribut',
  'document.form.subtitle': 'Gestion des attributs d\'une document',
  'document.edit.title': 'Edition de la document {name}',
  'document.create.title': 'Création d\'une document',
  'document.duplicate.title': 'Dupliquer la document {name}',
  'invalid.max_128_carac': 'Le label d\'une document ne peut dépasser 128 caractères',

  'document.stepper.links': 'Edition des liens avec les autres documents',
  'document.stepper.attributes': 'Saisie des attributs d\'une document',
  'document.stepper.files': 'Fichiers associés',

  'document.form.files.docFiles.subtitle': 'Liste des fichiers associés',
  'document.form.files.addFile.subtitle': 'Ajouter des fichiers',
}, Locales.fr)

export default messages

