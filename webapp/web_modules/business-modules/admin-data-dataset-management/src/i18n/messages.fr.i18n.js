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
  'dataset.list.action.add': 'Ajouter',
  'dataset.list.action.cancel': 'Annuler',
  'dataset.list.title': 'Jeux de données',
  'dataset.list.subtitle': 'Les jeux de données sont des regroupements de données qui partagent une même thématique',
  'dataset.list.table.label': 'Label',
  'dataset.list.table.actions': 'Actions',
  'dataset.list.table.model': 'Modèle',
  'dataset.list.tooltip.edit': 'Éditer',
  'dataset.list.tooltip.delete': 'Supprimer',
  'dataset.list.tooltip.info.button': 'Détails',
  'dataset.list.tooltip.copy.button': 'Copier la référence dans le presse-papier',
  'dataset.list.delete.title': 'Supprimer le jeu de données {name} ?',

  'dataset.info.urn.label': 'Référence unique (ipId) : ',
  'dataset.info.creationdate.label': 'Date de création : ',
  'dataset.info.datamodel.label': 'Modèle de données : ',
  'dataset.info.model.label': 'Modèle de jeux : ',
  'dataset.info.close': 'Fermer',
  'dataset.info.title': 'Informations sur le jeu de données {name}',

  'dataset.form.links.subtitle': 'Les jeux de données sont liés à des collections et à des mots clés afin de simplifier la recherche',
  'dataset.form.links.title': 'Édition des liens du jeu de données',
  'dataset.form.links.collection.title': 'Liste des collections liées',
  'dataset.form.links.collection.remove.button': 'Supprimer le lien',
  'dataset.form.links.collection.none': 'Aucune collection liée',
  'dataset.form.links.tag.subtitle': 'Associer à des mots clés',
  'dataset.form.links.tag.add': 'Nouveau mot clé',
  'dataset.form.links.tag.add.button': 'Ajouter',
  'dataset.form.links.tag.remove.button': 'Supprimer',
  'dataset.form.links.remainingcollection.subtitle': 'Collections disponibles',
  'dataset.form.links.remainingcollection.search': 'Filtrer les collections sur leur nom',
  'dataset.form.links.remainingcollection.add.button': 'Lier la collection',
  'dataset.form.links.action.next': 'Suivant',
  'dataset.form.links.action.cancel': 'Retour',

  'dataset.form.pluginsUIProcessing.title': 'Gestion des Plugins - Services IHM - Traitements sur le jeu de données',
  'dataset.form.pluginsUIProcessing.subtitle': 'Réalisez des traitements sur le jeu de données',
  'dataset.form.pluginsUIProcessing.action.next': 'Terminer',
  'dataset.form.pluginsUIProcessing.action.cancel': 'Retour',

  'dataset.form.plugin.services': 'Activation de services',
  'dataset.form.no.plugin.found': 'Pas de plugin',
  'dataset.form.no.plugin.found.create': 'Créez votre premier plugin',
  'dataset.form.no.plugin.found.message': 'Ces plugins servent à apporter des fonctionnalités supplémentaires sur les données du catalogue. Ces données seront ensuite disponible au téléchargement sous forme de fichier(s)',

  'dataset.form.uiservices.services': 'Services IHMs',
  'dataset.form.no.uiservices.found': 'Pas de service IHM',
  'dataset.form.no.uiservices.found.create': 'Créez votre premier service IHM',
  'dataset.form.no.uiservices.found.message': 'Ces services servent à apporter des fonctionnalités supplémentaires sur les données du catalogue. Ces données seront ensuite disponible à l\'affichage sur votre navigateur',

  'dataset.form.processing.services': 'Traitements',
  'dataset.form.no.processing.found': 'Pas de traitement',
  'dataset.form.no.processing.found.create': 'Créez votre premier traitement',
  'dataset.form.no.processing.found.message': 'Ces traitements servent à transformer des jeux de données. Ils sont utilisables par l\'utilisateur lorsque celui-ci passe une commande',

  'dataset.form.no.data.found': 'Pas de données trouvées',
  'dataset.form.create.configuration': 'Créer',

  'dataset.form.files.action.cancel': 'Retour',
  'dataset.form.files.action.next': 'Suivant',
  'dataset.form.files.subtitle': 'Ajouter un ou plusieurs fichier(s) de description au jeu de données pour expliquer son contenu. Trois formats de fichier sont supportés : HTML, PDF et Markdown.',
  'dataset.form.files.title': 'Gestion des fichiers associés au jeu de données',

  'dataset.form.subsetting.subtitle': 'Mise en place du subsetting',
  'dataset.form.subsetting.attributes': 'Attributs du modèle d\'objet',
  'dataset.form.subsetting.opensearch': 'Requête de filtre en OpenSearch',
  'dataset.form.subsetting.action.next': 'Sauvegarder',
  'dataset.form.subsetting.action.cancel': 'Retour',

  'dataset.form.action.next': 'Suivant',
  'dataset.form.action.cancel': 'Annuler',
  'dataset.form.model': 'Modèles de jeu de données (*)',
  'dataset.form.providerId': 'Identifiant producteur (*)',
  'dataset.form.label': 'Libellé (*)',
  'dataset.form.geometry': 'Géométrie',
  'dataset.form.descriptionUrl': 'URL de la page décrivant le jeu de données',
  'dataset.form.descriptionFileContent': 'Envoyer un fichier Markdown ou PDF',
  'dataset.form.descriptionFileContentReuploadToOverride': 'Pour écraser la description existante, envoyez un nouveau fichier Markdown ou PDF',
  'dataset.form.datasource': 'Source de données',
  'dataset.form.radio.descriptionUrl': 'Donner l\'URL contenant la description',
  'dataset.form.radio.descriptionFileContent': 'Envoyer un fichier contenant la description',
  'dataset.form.radio.none': 'Pas de description',
  'dataset.form.subtitle': 'Gestion des attributs d\'un jeu de données',
  'dataset.table.filter.dataset.label': 'Jeu de données',
  'dataset.table.filter.clear.button': 'Effacer',
  'dataset.table.filter.button': 'Appliquer',
  'dataset.table.refresh.button': 'Rafraîchir',
  'dataset.no.dataset.title': 'Pas de jeux de données',
  'dataset.no.dataset.subtitle': 'Créez votre premier jeu de données',

  'dataset.edit.title': 'Édition du jeu de données {name}',
  'dataset.create.title': 'Création d\'un nouveau jeu de données',

  'dataset.form.create.action.datasource': 'Créer une source de données',
  'dataset.form.create.action.cancel': 'Retour',
  'dataset.form.create.action.next': 'Continuer',
  'dataset.form.create.datasource': 'Source de données',
  'dataset.form.create.title': 'Création d\'un nouveau jeu de données',
  'dataset.form.create.subtitle': 'Pour créer un jeu de données, sélectionnez une source de données. Si vous ne l\'avez pas déjà créée, vous pouvez cliquer sur le bouton ci-dessous',

  'dataset.stepper.links': 'Édition des liens',
  'dataset.stepper.attributes': 'Saisie des attributs',
  'dataset.stepper.files': 'Fichiers associés',
  'dataset.stepper.subsetting': 'Filtrage',
  'dataset.stepper.pluginsUIProcessing': 'Plugins - Services IHM - Traitements',
  ...Locales.fr,
}

export default messages
