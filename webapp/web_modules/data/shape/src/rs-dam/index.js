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
export { AccessGroup, AccessGroupContent, AccessGroupList } from './AccessGroup'
export { AccessRight, AccessRightContent, AccessRightList } from './AccessRight'
export {
  attributeModelFields, AttributeModelContent, AttributeModel, AttributeModelList, AttributeModelArray,
} from './AttributeModel'
export { Collection, CollectionList, CollectionArray } from './Collection'
export { Connection, ConnectionList } from './Connection'
export { Dataset, DatasetContent, DatasetList } from './Dataset'
export { DatasetWithAccessRight, DatasetWithAccessRightContent, DatasetWithAccessRightList } from './DatasetWithAccessRight'
export { Datasource, DatasourceList } from './Datasource'
export { DataFile } from './DataFile'
export { default as Entity, EntityProperties } from './Entity'

export { FragmentContent, Fragment, FragmentList } from './Fragment'
export { ModelContent, Model, ModelList } from './Model'
export { ModelAttribute, ModelAttributeList } from './ModelAttribute'
export { StandardAttributeModelContent, StandardAttributeModel } from './StandardAttributeModel'
export { ModelAttributeComputationTypes, ModelAttributeComputationTypesList } from './ModelAttributeComputationTypes'
export { Document, DocumentContent, DocumentList } from './Document'
export {
  CrawlerDatasource, CrawlerDatasourceContent, CrawlerDatasourceList, CrawlerDatasourceArray,
} from './CrawlerDatasource'
export {
  OpenSearchDescriptor, OpenSearchQueryDescription,
  OpenSearchURLDescription, OpenSearchURLParameterDescription, OpenSearchURLParameterOptionDescription,

} from './OpenSearchDescriptor'
