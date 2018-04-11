/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicSelector from './BasicSelector'
import BasicActions from './BasicActions'

import BasicListSelectors from './list/BasicListSelectors'
import BasicListActions from './list/BasicListActions'
import BasicListReducers from './list/BasicListReducers'

import BasicPageableSelectors from './pageable/BasicPageableSelectors'
import BasicPageableActions from './pageable/BasicPageableActions'
import BasicPageableReducers from './pageable/BasicPageableReducers'

import BasicFacetsPageableSelectors from './facets/BasicFacetsPageableSelectors'
import BasicFacetsPageableActions from './facets/BasicFacetsPageableActions'
import BasicFacetsPageableReducers from './facets/BasicFacetsPageableReducers'

import BasicArraySelectors from './array/BasicArraySelectors'
import BasicArrayActions from './array/BasicArrayActions'
import BasicArrayReducers from './array/BasicArrayReducers'

import BasicSignalSelectors from './signal/BasicSignalSelectors'
import BasicSignalActions from './signal/BasicSignalActions'
import BasicSignalReducers from './signal/BasicSignalReducers'


import BasicPartitionSelectors from './partition/BasicPartitionSelectors'
import BasicPartitionActions from './partition/BasicPartitionActions'
import BasicPartitionReducers from './partition/BasicPartitionReducers'
import entityListPartitionDataHandler from './partition/EntityListPartitionDataHandler'

import DownloadFileSelectors from './download/DownloadFileSelectors'
import DownloadFileActions from './download/DownloadFileActions'
import DownloadFileReducers from './download/DownloadFileReducers'

import RequestVerbEnum from './RequestVerbEnum'
import RequestErrorShape from './RequestErrorShape'

module.exports = {
  BasicSelector,
  BasicActions,
  BasicListSelectors,
  BasicListActions,
  BasicListReducers,
  BasicPageableSelectors,
  BasicPageableActions,
  BasicPageableReducers,
  BasicFacetsPageableSelectors,
  BasicFacetsPageableActions,
  BasicFacetsPageableReducers,
  BasicArraySelectors,
  BasicArrayActions,
  BasicArrayReducers,
  BasicSignalSelectors,
  BasicSignalActions,
  BasicSignalReducers,
  BasicPartitionActions,
  BasicPartitionReducers,
  BasicPartitionSelectors,
  entityListPartitionDataHandler,
  DownloadFileActions,
  DownloadFileReducers,
  DownloadFileSelectors,
  RequestErrorShape,
  RequestVerbEnum,
}
