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
  'data.board.action.list.tooltip': 'Liste',
  'data.board.action.add.tooltip': 'Ajouter',

  'data-provider.board.title': 'Acquisition de données',
  'data-provider.board.description': 'Permet de configurer des processus d\'acquisition de nouvelles données détectées (la méthode de détection est configurable). Pour chaque donnée détectée, un paquet d\'information (SIP) est généré et ensuite fourni au système pour ingestion.',
  'data-provider.board.action.configure.tooltip': 'Configurer les chaînes d\'acquisition',
  'data-provider.board.action.sessions.tooltip': 'Suivre les sessions d\'acquisition',

  'data.board.oais.title': 'Manager de paquets (OAIS)',
  'data.board.oais.description': 'Manager de paquets (OAIS) vous permet de gérer les SIP (Submission Information Package) et AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Suivre les ingestions',
  'data.board.oais.tooltip.configure': 'Configurer',
  'data.board.oais.tooltip.sumition': 'Soumettre des SIPs',

  'ingest.board.external.datasources.title': 'Aspiration',
  'ingest.board.external.datasources.description': 'Permet d\'aspirer des données depuis une source de données déjà existante en associant les champs de la source de données aux modèles de données.',
  'ingest.board.action.external.datasources.list.tooltip': 'Configurer les aspirations de données',
  'ingest.board.action.connection.list.tooltip': 'Configurer les connexions aux bases de données externes',
  'ingest.board.action.datasource.monitor.tooltip': 'Suivre les aspirations de données',
  'ingest.board.index.delete': 'Réinitialiser le catalogue',
  'ingest.board.index.delete.confirm': 'Attention, si vous lancez la réinitialisation du catalogue de données, toutes les données seront supprimées du catalogue. Ce dernier sera alors reconstruit automatiquement par les aspirations de données configurées.',
  'ingest.board.index.delete.error.message': 'Une erreur est survenue durant la réinitialisation du catalogue de données.',

  'data.board.storage.title': 'Stockage',
  'data.board.storage.description': 'Permet de configurer un ou plusieurs espaces de stockage de données.',
  'data.board.action.storages.tooltip': 'Espaces de stockage',

}

export default messages
