/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { messages as attrMsg } from '@regardsoss/attributes-common'

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
  'module.description.configuration.allow.searching': 'Afficher l\'option de recherche dans la vue de description',

  'module.description.configuration.general': 'Configuration principale',
  'module.description.configuration.show.description': 'Proposer la description',
  'module.description.configuration.hide.empty.attributes': 'Cacher les attributs ayant une valeur indéfinie ou vide',
  'module.description.configuration.show.tags': 'Afficher les mot-clés liés',
  'module.description.configuration.show.coupling': 'Afficher les couplages liés',
  'module.description.configuration.show.linked.documents': 'Afficher les documents liés',
  'module.description.configuration.show.linked.entities': 'Afficher les entités liées',
  'module.description.configuration.show.other.versions': 'Afficher les autres versions de l\'entité',
  'module.description.configuration.show.thumbnail': 'Afficher la vignette',
  'module.description.configuration.show.quicklooks': 'Afficher les quicklooks',
  'module.description.configuration.description.files.title': 'Fichiers de description',
  'module.description.configuration.description.files.hint': 'Saisissez ici les attributs URL à utiliser comme fichiers de description',
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
  'module.description.invalid.entity.title': 'Donnée invalide',
  'module.description.invalid.entity.message': 'La donnée demandée ne peut être affichée car elle n\'a pas de configuration de description. La configuration du site Web a-t-elle été modifiée récemment? Veuillez contacter l\'administrateur.',
  'module.description.model.retrieval.failed.title': 'Erreur de chargement',
  'module.description.model.retrieval.failed.message': 'La donnée demandée ne peut pas être affichée car son modèle n\'a pas pu être téléchargé.',
  'module.description.no.parameter.title': 'Aucun paramètre',
  'module.description.no.parameter.message': 'Cette donnée ne dispose d\'aucun paramètre à afficher.',
  'module.description.common.search.simple.tag.tooltip': 'Rechercher les resultats pour le mot-clé {tag}',
  'module.description.common.search.coupling.tag.tooltip': 'Rechercher les données couplées par {tag}',
  'module.description.common.show.entity.description.tootlip': 'Afficher la description de {entityLabel}',
  'module.description.common.search.entity.tooltip': 'Rechercher les données liées à {entityLabel}',
  'module.description.common.download.file.tooltip': 'Télécharger le fichier {fileName}',
  'module.description.common.open.file.tooltip': 'Ouvrir le fichier {fileName} dans un nouvel onglet',
  'module.description.common.file.preview.tooltip': 'Afficher la prévisualisation de {fileName}',
  'module.description.common.version.link.label': 'Version {version}',
  'module.description.common.version.link.tooltip': 'Afficher la description de cette version',
  'module.description.header.toggle.tree.visible.tooltip': 'Afficher / cacher l\'arbre de navigation dans la description',
  'module.description.header.search.entity.label': 'Rechercher les données liées',
  'module.description.header.search.entity.tooltip': 'Rechercher les données liées à celle affichée',
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
  'module.description.tree.section.OTHER_VERSIONS.label': 'Autres versions',
  'module.description.tree.section.OTHER_VERSIONS.tooltip': 'Autres version de l\'entité',
  'module.description.tree.show.entity.description.tooltip': 'Afficher la description de cette donnée',
  'module.description.content.parameters.thumbnail.alt.text': 'Vignette: {label}',
  'module.description.content.quicklook.group.unknown': 'Groupe anonyme',
  'module.description.content.quicklook.alt.message': 'Vignette',
  // Forms i18n messages for admin
  ...Locales.fr,
  // Storage units messages
  ...storage.messages.fr,
  // Attributes messages
  ...attrMsg.fr,
}

export default messages
