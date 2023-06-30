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
import { Locales } from '@regardsoss/form-utils'

const messages = {
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
  'collection.form.providerId': 'Identifiant producteur (*)',
  'collection.form.model': 'Modèles de collection',
  'collection.form.label': 'Libellé (*)',
  'collection.form.geometry': 'Géométrie',
  'collection.form.table.value': 'Valeur fixe',
  'collection.form.table.fragmentAndLabel': 'Fragment et Nom de l\'attribut du modèle',
  'collection.form.table.type': 'Type',
  'collection.form.table.input': 'Valeur de l\'attribut',
  'collection.form.subtitle': 'Gestion des attributs d\'une collection',
  'collection.form.duplicate.warning.subtitle': 'Gestion des attributs d\'une collection. Attention : les fichiers de la collection d\'origine ne seront pas copiés.',
  'collection.edit.title': 'Édition de la collection {name}',
  'collection.create.title': 'Création d\'une collection',
  'collection.duplicate.title': 'Dupliquer la collection {name}',
  'collection.stepper.links': 'Édition des liens avec les autres collections',
  'collection.stepper.files': 'Fichiers associés',
  'collection.stepper.attributes': 'Saisie des attributs d\'une collection',

  'collection.form.descriptionUrl': 'URL de la page décrivant le jeu de données',
  'collection.form.descriptionFileContent': 'Envoyer un fichier Markdown ou PDF',
  'collection.form.descriptionFileContentReuploadToOverride': 'Envoyer un fichier Markdown ou PDF contenant la description si vous voulez écraser celle déjà présente',
  'collection.form.datasource': 'Source de données',
  'collection.form.radio.descriptionUrl': 'Fournir l\'URL contenant la description',
  'collection.form.radio.descriptionFileContent': 'Envoyer un fichier contenant la description',
  'collection.form.radio.none': 'Pas de description',

  'collection.list.action.edit': 'Éditer',
  'collection.list.action.duplicate': 'Dupliquer',
  'collection.list.action.delete': 'Supprimer',
  'collection.list.tooltip.info.button': 'Détails',
  'collection.list.tooltip.copy.button': 'Copier la référence dans le presse-papier',
  'collection.table.filter.collection.label': 'Collection',
  'collection.table.filter.clear.button': 'Effacer',
  'collection.table.filter.button': 'Appliquer',
  'collection.table.refresh.button': 'Rafraîchir',
  'collection.no.collection.title': 'Pas de collection',
  'collection.no.collection.subtitle': 'Créez votre première collection',

  'collection.form.files.action.cancel': 'Retour',
  'collection.form.files.action.next': 'Suivant',
  'collection.form.files.subtitle': 'Ajouter un ou plusieurs fichier(s) de description à la collection pour expliquer son contenu. Trois formats de fichier sont supportés : HTML, PDF et Markdown.',
  'collection.form.files.title': 'Gestion des fichiers associés à la collection',

  'collection.form.links.tag.remove.button': 'Supprimer',
  'collection.form.links.tag.add.button': 'Ajouter',
  'collection.form.links.tag.add': 'Nouveau mot clé',
  'collection.form.links.tag.subtitle': 'Associer à des mots clés',
  'collection.form.links.collection.none': 'Aucune collection liée',

  'collection.info.urn.label': 'Référence unique (ipId) : ',
  'collection.info.creationdate.label': 'Date de création : ',
  'collection.info.model.label': 'Modèle de collection : ',
  'collection.info.close': 'Fermer',
  'collection.info.title': 'Informations sur la collection {name}',
  ...Locales.fr,
}

export default messages
