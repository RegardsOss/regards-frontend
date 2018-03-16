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
  'collection.list.action.add': 'Ajouter',
  'collection.list.action.cancel': 'Annuler',
  'collection.list.title': 'Collections',
  'collection.list.subtitle': 'Les collections sont des regroupements de données par thématique',
  'collection.list.delete.message': 'Supprimer la collection {name} ?',
  'collection.form.links.component.subtitle': 'Lien de la collection courante',
  'collection.form.links.remainingcollection.subtitle': 'Collections disponibles',
  'collection.form.links.collection.subtitle': 'Collections liées',
  'collection.form.links.subtitle': 'Les collections disposent de liens entre elles afin de simplifier la recherche',
  'collection.form.links.title': 'Mise à jour des liens entre collections',
  'collection.form.links.action.done': 'Terminer',
  'collection.form.links.action.cancel': 'Retour',
  'collection.form.links.remainingcollection.search': 'Filtrer les collections sur leur nom',
  'collection.list.table.label': 'Label',
  'collection.list.table.actions': 'Actions',
  'collection.list.table.model': 'Modèle',
  'collection.form.action.next': 'Suivant',
  'collection.form.action.cancel': 'Annuler',
  'collection.form.model': 'Modèles de collection',
  'collection.form.label': 'Libellé',
  'collection.form.geometry': 'Géometrie',
  'collection.form.table.value': 'Valeur fixe',
  'collection.form.table.fragmentAndLabel': 'Fragment et Nom de l\'attribut du modèle',
  'collection.form.table.type': 'Type',
  'collection.form.table.input': 'Valeur de l\'attribut',
  'collection.form.subtitle': 'Gestion des attributs d\'une collection',
  'collection.edit.title': 'Edition de la collection {name}',
  'collection.create.title': 'Création d\'une collection',
  'collection.duplicate.title': 'Dupliquer la collection {name}',
  'collection.stepper.links': 'Edition des liens avec les autres collections',
  'collection.stepper.attributes': 'Saisie des attributs d\'une collection',

  'collection.form.descriptionUrl': 'URL de la page décrivant le jeu de données',
  'collection.form.descriptionFileContent': 'Envoyer un fichier Markdown ou PDF',
  'collection.form.descriptionFileContentReuploadToOverride': 'Envoyer un fichier Markdown ou PDF contenant la description si vous voulez écraser celle déjà présente',
  'collection.form.datasource': 'Source de données',
  'collection.form.radio.descriptionUrl': 'Fournir l\'URL contenant la description',
  'collection.form.radio.descriptionFileContent': 'Envoyer un fichier contenant la description',
  'collection.form.radio.none': 'Pas de description',

  'collection.list.action.edit': 'Editer',
  'collection.list.action.duplicate': 'Dupliquer',
  'collection.list.action.delete': 'Supprimer',
  'collection.table.filter.collection.label': 'Collection',
  'collection.table.filter.clear.button': 'Effacer',
  'collection.table.filter.button': 'Appliquer',
  'collection.table.refresh.button': 'Rafraîchir',
  'collection.no.collection.title': 'Pas de collection',
  'collection.no.collection.subtitle': 'Créez votre première collection',
}, Locales.fr)

export default messages

