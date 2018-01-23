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
  'data.board.action.list.tooltip': 'Liste',
  'data.board.action.add.tooltip': 'Ajouter',

  'ingest.board.title': 'Soumission manuelle',
  'ingest.board.description': 'Cette fonctionnalité vous permet d\'ajouter manuellement des données par soumission de paquets. Un paquet de soumission ou SIP (Submission information package) contient toutes les informations nécessaires pour à la fois décrire les données et définir comment accéder aux fichiers physiques associés',
  'ingest.board.action.chain.list.tooltip': 'Configurer les chaînes de traitements',
  'ingest.board.action.monitor.tooltip': 'Visualiser les soumissions',
  'ingest.board.action.sumition.tooltip': 'Soumettre des données',

  'data-provider.board.title': 'Automatisation',
  'data-provider.board.description': 'Cette fonctionalité vous permet de configurer des processus d\'ajout automatique des nouvelles données détectées. Pour chaque donnée détectée, un paquet d\'information (SIP) est généré et ensuite fourni au système pour soumission.',
  'data-provider.board.action.chain.list.tooltip': 'Configurer les chaînes de traitements',

  'ingest.board.external.datasources.title': 'Aspiration',
  'ingest.board.external.datasources.description': 'Cette fonctionnalité vous permet d\'aspirer des données depuis une source de données déjà existante en associant les champs de la source de données aux modèles de données.',
  'ingest.board.action.external.datasources.list.tooltip': 'Configurer les aspirations',
  'ingest.board.action.connection.list.tooltip': 'Configurer les connexions aux sources de données',
  'ingest.board.action.datasource.monitor.tooltip': 'Suivi des aspirations de données',

  'data.board.document.title': 'Documents',
  'data.board.document.description': 'Vous pouvez ici counsulter/ajouter des données de type documents. Les documents sont des données consultables par prévisualisation ou par téléchargement depuis l\'interface utilisateur.',

  'data.board.storage.title': 'Stockage',
  'data.board.storage.description': 'Cette section vous permet de configurer un ou plusieurs espaces de stockage des données ainsi que la stratégie de répartition que le système utilisera.',
  'data.board.action.storages.tooltip': 'Espaces de sockages',
  'data.board.action.allocations.tooltip': 'Stratégies de répartition',
  'data.board.action.monitoring.tooltip': 'Taux d\'occupation des espaces de stockages',
}

export default messages
