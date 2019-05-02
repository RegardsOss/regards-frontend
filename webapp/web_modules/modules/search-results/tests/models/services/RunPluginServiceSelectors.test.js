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
import isNull from 'lodash/isNull'
import { assert } from 'chai'
import datasetServicesActions from '../../../src/models/services/RunPluginServiceActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/services/RunPluginServiceReducer'
import datasetServicesSelectors from '../../../src/models/services/RunPluginServiceSelectors'

const buildMockStore = (initState = DEFAULT_STATE) => ({
  'modules.search-results': {
    runPluginService: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].runPluginService, action))

describe('[Search Results] Test RunPluginServiceSelectors', () => {
  it('Should select the running service and its target', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(datasetServicesSelectors.getServiceRunModel(fakeStore), DEFAULT_STATE.serviceRunModel, 'Should return default service')

    fakeStore = mockReduce(fakeStore, datasetServicesActions.runService({ id: 'fakeService' }))
    assert.deepEqual(datasetServicesSelectors.getServiceRunModel(fakeStore), { id: 'fakeService' }, DEFAULT_STATE.serviceRunModel, 'Should return running service')

    fakeStore = mockReduce(fakeStore, datasetServicesActions.closeService())
    assert.isTrue(isNull(datasetServicesSelectors.getServiceRunModel(fakeStore)), 'Should not return running service after closing service')
  })
})
