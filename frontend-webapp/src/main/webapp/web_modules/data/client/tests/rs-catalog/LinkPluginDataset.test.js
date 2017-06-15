import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { CatalogShapes } from '@regardsoss/shape'
import LinkPluginDatasetActions from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetActions'
import LinkPluginDatasetReducer from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetReducer'
import LinkPluginDatasetSelectors from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetSelectors'
import LinkPluginDatasetNetworkDump from './LinkPluginDataset.dump'

const backendServerResultList = LinkPluginDatasetNetworkDump
const options = {
}


const linkPluginDatasetActions = new LinkPluginDatasetActions('test/action')
const linkPluginDatasetReducer = LinkPluginDatasetReducer('test/action')
const linkPluginDatasetSelectors = LinkPluginDatasetSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(linkPluginDatasetActions, linkPluginDatasetReducer, linkPluginDatasetSelectors, CatalogShapes.LinkPluginDatasetList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model LinkPluginDataset', () => {
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
