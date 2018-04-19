/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Account from './schemas/Account'
import Project from './schemas/Project'
import ProjectConnection from './schemas/ProjectConnection'
import ProjectUser from './schemas/ProjectUser'
import Role from './schemas/Role'
import Notification from './schemas/Notification'
import Model from './schemas/Model'
import Accesses from './schemas/Accesses'
import AttributeModel from './dam/AttributeModel'
import AttributeModelRestriction from './dam/AttributeModelRestriction'
import Module from './access/Module'
import Layout from './access/Layout'
import LinkUIPluginDataset from './access/LinkUIPluginDataset'
import Theme from './access/Theme'
import Plugin from './access/Plugin'
import UIPluginConf from './access/UIPluginConf'
import Fragment from './dam/Fragment'
import Dataset from './dam/Dataset'
import DatasetWithAccessRight from './dam/DatasetWithAccessRight'
import AccessRight from './dam/AccessRight'
import AccessGroup from './dam/AccessGroup'
import CrawlerDatasource from './dam/CrawlerDatasource'
import Datasource from './dam/Datasource'
import Document from './dam/Document'
import Entity from './catalog/Entity'
import ResourceAccess from './admin/ResourceAccess'
import ModelAttribute from './dam/ModelAttribute'
import PluginMetaData from './common/PluginMetaData'
import AdminPluginConfiguration from './common/PluginConfiguration'
import PluginParameter from './common/PluginParameter'
import PrioritizedDataStorage from './storage/PrioritizedDataStorage'
import StorageMonitoring from './storage/StorageMonitoring'
import Collection from './dam/Collection'
import Connection from './dam/Connection'
import ModelAttributeComputationTypes from './dam/ModelAttributeComputationTypes'
import AIPStatus from './storage/AIPStatus'
import Endpoint from './admin/Endpoint'
import LinkPluginDataset from './catalog/LinkPluginDataset'
import ProcessingChain from './ingest/ProcessingChain'
import Order from './order/Order'
import OrderFile from './order/OrderFile'
import Sip from './ingest/SIP'
import Session from './ingest/Session'
import AcquisitionProcessingChain from './data-provider/AcquisitionProcessingChain'
import AcquisitionProcessingChainMonitor from './data-provider/AcquisitionProcessingChainMonitor'
import Product from './data-provider/Product'
import AcquisitionFile from './data-provider/AcquisitionFile'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Schemas for API responses.
module.exports = {
  // TODO-V3 Schema !?! move to each associated microservice
  ...Accesses,
  ...Account,
  ...Model,
  ...Notification,
  ...ProjectConnection,
  ...Project,
  ...ProjectUser,
  ...Role,

  // Admin
  ...Endpoint,
  ...ResourceAccess,

  // Access
  ...Module,
  ...Layout,
  ...LinkPluginDataset,
  ...LinkUIPluginDataset,
  ...Plugin,
  ...Theme,
  ...UIPluginConf,

  // Storage
  ...PrioritizedDataStorage,
  ...StorageMonitoring,
  ...AIPStatus,

  // Catalog
  ...Entity,

  // Common
  ...AdminPluginConfiguration,
  ...PluginMetaData,
  ...PluginParameter,

  // DAM
  ...AccessGroup,
  ...AttributeModel,
  ...AttributeModelRestriction,
  ...AccessRight,
  ...Connection,
  ...Collection,
  ...CrawlerDatasource,
  ...Dataset,
  ...DatasetWithAccessRight,
  ...Datasource,
  ...Document,
  ...Fragment,
  ...ModelAttributeComputationTypes,
  ...ModelAttribute,

  // Data Provider
  ...AcquisitionProcessingChain,
  ...AcquisitionProcessingChainMonitor,
  ...Product,
  ...AcquisitionFile,

  // Ingest
  ...ProcessingChain,
  ...Sip,
  ...Session,

  // Order
  ...Order,
  ...OrderFile,

}