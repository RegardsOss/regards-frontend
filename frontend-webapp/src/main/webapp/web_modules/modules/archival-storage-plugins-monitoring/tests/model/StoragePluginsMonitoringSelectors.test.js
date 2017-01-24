/**
 * LICENSE_PLACEHOLDER
 **/
import { expect } from 'chai'
import StoragePluginsMonitoringSelectors from '../../src/model/StoragePluginsMonitoringSelectors'


describe('[STORAGE PLUGINS MONITORING] Testing StoragePluginsMonitoringSelectors', () => {
  it('returns correct part of the state', () => {
    const someStore = {
      'modules.archival-storage-plugins-monitoring': {
        'storage-plugins': {
          items: {
            hello: 'world',
          },
        },
      },
    }
    expect(StoragePluginsMonitoringSelectors.getList(someStore)).to.eql({ hello: 'world' })
  })
})
