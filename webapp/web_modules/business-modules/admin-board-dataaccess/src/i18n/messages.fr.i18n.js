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
const messages = {
  'dataaccess.board.action.list.tooltip': 'Lister',
  'dataaccess.board.action.add.tooltip': 'Ajouter',

  'dataaccess.board.services.title': 'Services',
  'dataaccess.board.services.description': 'Services applicables aux données du catalogue projet. Ces services sont accessibles au travers de l\'interface utilisateur du projet lors de la consultation des données ou directement via des requêtes HTTP.',

  'dataaccess.board.searchengines.title': 'Protocoles de recherche',
  'dataaccess.board.searchengines.description': 'Configuration des protocoles de recherche de données dans le catalogue projet. Le protocole \'Legacy\' est le protocole spécifique à REGARDS. Les autres protocoles peuvent être configurés pour l\'interopérabilité avec d\'autre systèmes qui voudraient interroger le catalogue de données.',

  'accessright.board.tooltip.list': 'Liste',
  'accessright.board.tooltip.add': 'Ajouter',
  'accessright.board.accessgroup.title': 'Groupes d\'accès',
  'accessright.board.accessgroup.description': 'Les groupes d\'accès permettent de limiter l\'accès aux données du catalogue à certains utilisateurs. Ils permettent également d\'affiner le niveau d\'accès en accordant l\'accès aux métadonnées ou aux données ou aux deux.',

  'accessright.board.index.title': 'Catalogue des données',
  'accessright.board.index.description': 'Cette section vous permet de gérer le catalogue des données',
  'accessright.board.index.delete': 'Réinitialiser le catalogue',
  'accessright.board.index.delete.confirm': 'Attention, si vous lancez la réinitialisation du catalogue de données, toutes les données seront supprimées du catalogue. Ce dernier sera alors reconstruit automatiquement par les aspirations de données configurées.',
  'accessright.board.index.delete.error.message': 'Une erreur est survenue durant la réinitialisation du catalogue de données.',
}

export default messages
