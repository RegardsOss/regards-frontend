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
import { AccessGroup, AccessGroupContent, AccessGroupList } from './AccessGroup'
import { AccessRight, AccessRightContent, AccessRightList } from './AccessRight'
import { AttributeModelContent, AttributeModel, AttributeModelList, AttributeModelArray } from './AttributeModel'
import { Collection, CollectionList, CollectionArray } from './Collection'
import { Connection, ConnectionList } from './Connection'
import { Dataset, DatasetContent, DatasetList } from './Dataset'
import { DatasetWithAccessRight, DatasetWithAccessRightContent, DatasetWithAccessRightList } from './DatasetWithAccessRight'
import { Datasource, DatasourceList } from './Datasource'
import { DataFile } from './DataFile'
import Entity from './Entity'
import { FragmentContent, Fragment, FragmentList } from './Fragment'
import { Model, ModelList } from './Model'
import { ModelAttribute, ModelAttributeList } from './ModelAttribute'
import { StandardAttributeModelContent, StandardAttributeModel } from './StandardAttributeModel'
import { ModelAttributeComputationTypes, ModelAttributeComputationTypesList } from './ModelAttributeComputationTypes'
import { Document, DocumentContent, DocumentList } from './Document'
import { CrawlerDatasource, CrawlerDatasourceContent, CrawlerDatasourceList, CrawlerDatasourceArray } from './CrawlerDatasource'

module.exports = {
  AccessGroup,
  AccessGroupContent,
  AccessGroupList,

  AccessRight,
  AccessRightContent,
  AccessRightList,

  AttributeModel,
  AttributeModelContent,
  AttributeModelList,
  AttributeModelArray,

  Collection,
  CollectionList,
  CollectionArray,

  Connection,
  ConnectionList,

  DataFile,

  Dataset,
  DatasetContent,
  DatasetList,

  DatasetWithAccessRight,
  DatasetWithAccessRightContent,
  DatasetWithAccessRightList,

  Document,
  DocumentContent,
  DocumentList,

  CrawlerDatasource,
  CrawlerDatasourceContent,
  CrawlerDatasourceList,
  CrawlerDatasourceArray,

  Datasource,
  DatasourceList,

  Entity,

  FragmentContent,
  Fragment,
  FragmentList,

  Model,
  ModelList,

  ModelAttribute,
  ModelAttributeList,

  ModelAttributeComputationTypes,
  ModelAttributeComputationTypesList,

  StandardAttributeModelContent,
  StandardAttributeModel,
}
