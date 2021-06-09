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
const messages = {
  'data.board.action.list.tooltip': 'Liste',
  'data.board.action.add.tooltip': 'Ajouter',

  'data.board.dashboard.title': 'Tableau de bord',
  'data.board.dashboard.description': 'Le tableau de bord permet de centraliser toutes les informations concernant les produits référencés dans votre projet. Vous pouvez ici visualiser via un regroupement par source/session l\"avancement de vos chaînes de traitements des produits.',
  'data.board.action.dashboard.tooltip': 'Consulter le tableau de bord',

  'data-provider.board.title': 'Acquisition de données',
  'data-provider.board.description': 'Permet de configurer des processus d\'acquisition de nouvelles données détectées (la méthode de détection est configurable). Pour chaque donnée détectée, un paquet d\'information (SIP) est généré et ensuite fourni au système pour ingestion.',
  'data-provider.board.action.configure.tooltip': 'Chaînes d\'acquisition',
  'data-provider.board.action.sessions.tooltip': 'Sessions d\'acquisition',

  'data.board.oais.title': 'Gestionnaire de produits (OAIS)',
  'data.board.oais.description': 'Gestionnaire de produits (OAIS) vous permet de gérer les produits référéncés ou en cours de traitement dans le service Ingest. Un produit est une association entre un SIP (Submission Information Package) et un AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Consulter les produits',
  'data.board.oais.tooltip.configure': 'Configurer l\'ingestion',
  'data.board.oais.tooltip.submition': 'Soumettre des produits',

  'data.board.featuremanager.title': 'Gestionnaire de produits (GeoJson)',
  'data.board.featuremanager.description': 'Le gestionnaire de produits (GeoJson) vous permet de gérer les produits référencés ou en cours de traitement dans le service FeatureManager. Un produit est défini par un objet au format GeoJson standard contenant les métadonnées et optionnelement les fichiers physiques associés au produit.',
  'data.board.action.featuremanager.tooltip': 'Consulter les produits',

  'ingest.board.external.datasources.title': 'Aspiration',
  'ingest.board.external.datasources.description': 'Permet de construire le catalogue de données depuis des produits référencés depuis diverses sources de données. Cette étape est obligatoire pour rendre visible à vos utilisateurs les produits référencés depuis les gestionnaire de produits ou bien présents dans une base de données ou même accessible depuis un service web.',
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
