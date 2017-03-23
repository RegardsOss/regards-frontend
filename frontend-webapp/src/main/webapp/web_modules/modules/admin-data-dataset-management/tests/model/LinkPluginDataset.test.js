import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { LinkPluginDataset } from '@regardsoss/model'
import LinkPluginDatasetActions from '../../src/model/LinkPluginDatasetActions'
import LinkPluginDatasetReducers from '../../src/model/LinkPluginDatasetReducers'
import LinkPluginDatasetSelectors from '../../src/model/LinkPluginDatasetSelectors'
import LinkPluginDatasetNetworkDump from './dump/LinkPluginDatasetNetworkDump'

const backendServerResultList = LinkPluginDatasetNetworkDump
const options = {
}
const entityTester = new ReduxEntityTester(LinkPluginDatasetActions, LinkPluginDatasetReducers, LinkPluginDatasetSelectors, React.PropTypes.objectOf(LinkPluginDataset).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model LinkPluginDataset', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})
