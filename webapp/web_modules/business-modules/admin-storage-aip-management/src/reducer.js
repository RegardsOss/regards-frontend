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
import { combineReducers } from 'redux'
import { aipReducer } from './clients/AIPClient'
import { aipSessionReducer } from './clients/AIPSessionClient'
import { aipTagReducer } from './clients/AIPTagClient'
import { tableReducer } from './clients/TableClient'
import { aipFileReducer } from './clients/AIPFileClient'
import { deleteAIPsOnSomeStoragesClientReducer } from './clients/DeleteAIPOnSomeStoragesClient'
import { deleteAIPsOnAllStoragesClientReducer } from './clients/DeleteAIPOnAllStoragesClient'

const aipManagementReducer = combineReducers({
  aip: aipReducer,
  'aip-session': aipSessionReducer,
  'aip-tag': aipTagReducer,
  'aip-file': aipFileReducer,
  'aip-table': tableReducer,
  'delete-aip-on-some-storages': deleteAIPsOnSomeStoragesClientReducer,
  'delete-aip-on-all-storages': deleteAIPsOnAllStoragesClientReducer,
})

export default aipManagementReducer
