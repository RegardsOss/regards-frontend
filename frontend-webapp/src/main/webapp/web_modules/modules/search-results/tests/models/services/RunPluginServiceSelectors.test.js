/**
* LICENSE_PLACEHOLDER
**/
import isNull from 'lodash/isNull'
import { assert } from 'chai'
import datasetServicesActions from '../../../src/models/services/RunPluginServiceActions'
import reduce, { DEFAULT_STATE } from '../../../src/models/services/RunPluginServiceReducer'
import datasetServicesSelectors from '../../../src/models/services/RunPluginServiceSelectors'

const buildMockStore = (initState = DEFAULT_STATE) => ({
  'modules.search-results': {
    datasetServices: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['modules.search-results'].datasetServices, action))

describe('[Search Results] Test RunPluginServiceSelectors', () => {
  it('Should select the running service and its target', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(datasetServicesSelectors.getRunningService(fakeStore), DEFAULT_STATE.runningService, 'Should return default service')
    assert.deepEqual(datasetServicesSelectors.getTarget(fakeStore), DEFAULT_STATE.target, 'Should return default target')

    fakeStore = mockReduce(fakeStore, datasetServicesActions.runService({ id: 'fakeService' }, { id: 'fakeTarget' }))
    assert.deepEqual(datasetServicesSelectors.getRunningService(fakeStore), { id: 'fakeService' }, DEFAULT_STATE.levels, 'Should return running service')
    assert.deepEqual(datasetServicesSelectors.getTarget(fakeStore), { id: 'fakeTarget' }, 'Should return service target')

    fakeStore = mockReduce(fakeStore, datasetServicesActions.closeService())
    assert.isTrue(isNull(datasetServicesSelectors.getRunningService(fakeStore)), 'Should not return running service after closing service')
    assert.isTrue(isNull(datasetServicesSelectors.getTarget(fakeStore)), 'Should not return target after closing service')
  })
})
