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