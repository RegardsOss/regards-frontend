/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { storage } from '@regardsoss/units'

/**
 * Module french messages
 * @author Raphaël Mechali
 */
const messages = {
  // admin
  'module.description.configuration.type.COLLECTION': 'Collections',
  'module.description.configuration.type.DATASET': 'Jeux de données',
  'module.description.configuration.type.DOCUMENT': 'Documents',
  'module.description.configuration.type.DATA': 'Données',
  'module.description.configuration.allow.tag.search': 'Proposer la recherche des données par mot-clés',

  'module.description.configuration.general': 'Configuration principale',
  'module.description.configuration.show.description': 'Proposer la description pour ce type d\'objets',
  'module.description.configuration.show.tags': 'Afficher les mot-clés liés',
  'module.description.configuration.show.linked.documents': 'Afficher les documents liés',
  'module.description.configuration.show.thumbnail': 'Afficher la vignette',
  'module.description.configuration.add.group': 'Ajouter un groupe d\'attributs',
  'module.description.configuration.group.title': 'Groupe n°{number}',
  'module.description.configuration.group.show.title': 'Afficher le titre du groupe',
  'module.description.configuration.group.title.en.field': 'Titre anglais',
  'module.description.configuration.group.title.fr.field': 'Titre français',
  'module.description.configuration.group.title.required.error': 'Le titre est requis car l\'option d\'affichage du titre est sélectionnée',
  'module.description.configuration.group.elements.hint': 'Ajoutez ici les attributs à afficher dans ce groupe',
  'module.description.configuration.group.move.action.label': 'Déplacer',
  'module.description.configuration.group.move.action.tooltip': 'Déplacer ce groupe',
  'module.description.configuration.group.move.group.first': 'En premier',
  'module.description.configuration.group.move.group.after': 'Après le groupe n°{number}',
  'module.description.configuration.group.remove.action.label': 'Supprimer',
  'module.description.configuration.group.remove.action.tooltip': 'Supprimer ce groupe',

  // user
  'module.description.main.loading.message': 'Chargement du contenu...',
  'module.description.file.loading.message': 'Chargement du fichier...',
  'module.description.invalid.entity.title': 'Donnée invalide',
  'module.description.invalid.entity.message': 'La donnée demandée ne peut être affichée car elle n\'a pas de configuration de description. La configuration du site Web a-t-elle été modifiée récemment? Veuillez contacter l\'administrateur.',
  'module.description.model.retrieval.failed.title': 'Erreur de chargement',
  'module.description.model.retrieval.failed.message': 'La donnée demandée ne peut pas être affichée car son modèle n\'a pas pu être téléchargé.',
  'module.description.no.parameter.title': 'Aucun paramètre',
  'module.description.no.parameter.message': 'Cette donnée ne dispose d\'aucun paramètre à afficher.',
  'module.description.unsuported.file.media.type.title': 'Prévisualisation impossible',
  'module.description.unsuported.file.media.type.message': 'La prévisualisation du fichier ne peut pas être affichée car ce type contenu n\'est pas supporté',
  'module.description.file.download.error.title': 'Erreur de téléchargement',
  'module.description.file.download.error.message': 'Le téléchargement du fichier a échoué',
  'module.description.common.search.simple.tag.tooltip': 'Rechercher les resultats pour ce mot-clé',
  'module.description.common.search.coupling.tag.tooltip': 'Rechercher les données couplées',
  'module.description.common.search.entity.tooltip': 'Rechercher les données liées à celle-ci',
  'module.description.common.download.file.tooltip': 'Télécharger le fichier',
  'module.description.header.toggle.tree.visible.tooltip': 'Afficher / cacher l\'arbre de navigation dans la description',
  'module.description.header.search.entity.label': 'Rechercher les données liées',
  'module.description.header.search.entity.tooltip': 'Rechercher les données liées à celle couramment affichée',
  'module.description.tree.section.PARAMETERS.label': 'Paramètres',
  'module.description.tree.section.PARAMETERS.tooltip': 'Afficher les paramètres',
  'module.description.tree.section.INFORMATION.label': 'Information',
  'module.description.tree.section.INFORMATION.tooltip': 'Afficher la liste des fichiers d\'information',
  'module.description.tree.section.QUICKLOOKS.label': 'Quicklooks',
  'module.description.tree.section.QUICKLOOKS.tooltip': 'Afficher la prévisualisation des quicklooks',
  'module.description.tree.section.SIMPLE_TAGS.label': 'Mots-clés',
  'module.description.tree.section.SIMPLE_TAGS.tooltip': 'Afficher la list des mots-clefs',
  'module.description.tree.section.LINKED_ENTITIES.label': 'Données liées',
  'module.description.tree.section.LINKED_ENTITIES.tooltip': 'Afficher la liste des données liées',
  'module.description.tree.section.COUPLED_TAGS.label': 'Couplages',
  'module.description.tree.section.COUPLED_TAGS.tooltip': 'Afficher la liste des couplages',
  'module.description.tree.section.LINKED_DOCUMENTS.label': 'Documents liés',
  'module.description.tree.section.LINKED_DOCUMENTS.tooltip': 'Afficher la liste des documents liés',
  'module.description.tree.section.FILES.label': 'Fichiers',
  'module.description.tree.section.FILES.tooltip': 'Fichiers',
  'module.description.tree.section.file.tooltip': 'Afficher la prévisualisation du fichier',
  'module.description.tree.show.entity.description.tooltip': 'Afficher la description de cette donnée',
  'module.description.content.parameters.thumbnail.alt.text': 'Vignette: {label}',
  // TODO old: delete or move
  'module.description.breadcrumb.root': 'Description: {entityLabel}',
  'module.description.file.subheader': 'Cliquez sur un des fichiers ci-dessous pour le télécharger',
  'module.description.close.button': 'Fermer',
  'module.description.properties.attributes': 'Attributs',
  'module.description.properties.loading.attributes': 'Chargement des attributs',
  'module.description.properties.no.attribute': 'Aucun attribut à afficher',
  'module.description.properties.tags.entities': 'Mot-clefs liés',
  'module.description.properties.documents.entities': 'Documents associés',
  'module.description.properties.document.entities': 'Documents associés',
  'module.description.properties.loading.tags': 'Chargement des mot-clefs',
  'module.description.properties.loading.document': 'Chargement des documents',
  'module.description.properties.no.tag': 'Cette entité n\'a pas de mot-clef',
  'module.description.properties.no.document': 'Cette entité n\'a pas de document',
  'module.description.properties.tag.search.tooltip': 'Rechercher les entités portant ce tag',
  'module.description.properties.tag.show.description.tooltip': 'Afficher les détails de l\'entité',

  'module.description.file.selector.file.label': '{filename} ({sizeMessage})',
  'module.description.file.selector.file.unkown.size': 'taille inconnue',
  'module.description.files.download.button': 'Télécharger',
  'module.description.file.loading': 'Chargement du fichier',

  // Forms i18n messages for admin
  ...Locales.fr,
  // Storage units messages
  ...storage.messages.fr,
}

export default messages
