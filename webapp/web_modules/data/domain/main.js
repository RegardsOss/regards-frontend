/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import * as DamDom from './dam'
import * as AccessDom from './access'
import * as AdminDom from './admin'
import * as AdminInstanceDom from './admin-instance'
import * as ArchivalStorageDom from './archival-storage'
import * as CatalogDom from './catalog'
import * as CommonDom from './common'
import * as DataProviderDom from './data-provider'
import * as FemDom from './fem'
import * as IngestDom from './ingest'
import * as OrderDom from './order'
import * as StorageDom from './storage'
import * as UIDom from './ui'
import * as AuthenticationDom from './authentication'
import * as ProcessingDom from './processing'
import * as WorkerDom from './worker'

export const DamDomain = DamDom
export const AccessDomain = AccessDom
export const AdminDomain = AdminDom
export const AdminInstanceDomain = AdminInstanceDom
export const ArchivalStorageDomain = ArchivalStorageDom
export const CatalogDomain = CatalogDom
export const CommonDomain = CommonDom
export const DataProviderDomain = DataProviderDom
export const FemDomain = FemDom
export const IngestDomain = IngestDom
export const OrderDomain = OrderDom
export const StorageDomain = StorageDom
export const UIDomain = UIDom
export const AuthenticationDomain = AuthenticationDom
export const ProcessingDomain = ProcessingDom
export const WorkerDomain = WorkerDom
