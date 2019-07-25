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

  'ingest.board.title': 'Ingestion (SIP)',
  'ingest.board.description': 'Permet d\'ingérer des données qui sont déjà sous la forme de SIP. Un paquet de soumission ou SIP contient toutes les informations nécessaires pour à la fois décrire les données et définir comment accéder aux fichiers physiques associés.',
  'ingest.board.action.chain.list.tooltip': 'Configurer les chaînes d\'ingestion',
  'ingest.board.action.monitor.tooltip': 'Visualiser les ingestions',
  'ingest.board.action.sumition.tooltip': 'Ingérer des SIP',

  'data-provider.board.title': 'Acquisition de données',
  'data-provider.board.description': 'Permet de configurer des processus d\'acquisition de nouvelles données détectées (la méthode de détection est configurable). Pour chaque donnée détectée, un paquet d\'information (SIP) est généré et ensuite fourni au système pour ingestion.',
  'data-provider.board.action.chain.list.tooltip': 'Configurer les chaînes d\'acquisition',
  'data-provider.board.action.monitoring.tooltip': 'Suivre l\'activité des chaînes d\'acquisition',
  'data-provider.board.action.sessions.tooltip': 'Suivre toute la chaine d\'acquisition',

  'ingest.board.external.datasources.title': 'Aspiration',
  'ingest.board.external.datasources.description': 'Permet d\'aspirer des données depuis une source de données déjà existante en associant les champs de la source de données aux modèles de données.',
  'ingest.board.action.external.datasources.list.tooltip': 'Configurer les aspirations',
  'ingest.board.action.connection.list.tooltip': 'Sources de données externes',
  'ingest.board.action.datasource.monitor.tooltip': 'Suivi des aspirations de données',

  'data.board.document.title': 'Documents',
  'data.board.document.description': 'Consulter/ajouter des documents. Les documents sont des données consultables par prévisualisation ou par téléchargement depuis l\'interface utilisateur.',

  'data.board.storage.title': 'Stockage',
  'data.board.storage.description': 'Permet de configurer un ou plusieurs espaces de stockage des données ainsi que la stratégie de répartition que le système utilisera.',
  'data.board.action.storages.tooltip': 'Espaces de stockage',
  'data.board.action.allocations.tooltip': 'Stratégies de répartition',
  'data.board.action.monitoring.tooltip': 'Taux d\'occupation des espaces de stockage',
  'data.board.action.security.tooltip': 'Configurer les droits d\'accès aux fichiers archivés',
  'data.board.action.aip-management.tooltip': 'Visualiser les AIPs',

  'data.board.oais.title': 'Manager de paquets (OAIS)',
  'data.board.oais.description': 'Manager de paquets (OAIS) vous permet de gérer les SIP (Submission Information Package) et AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Suivre les ingestions et le stockage',

}

export default messages
