import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Dataset } from '@regardsoss/model'
import DatasetActions from '../../src/model/DatasetActions'
import DatasetReducers from '../../src/model/DatasetReducers'
import DatasetSelectors from '../../src/model/DatasetSelectors'

const backendServerResultList = {
  content: [{
    content: {
      id: 1,
    },
    links: [],
  }],
  metadata: {
    number: '0',
    size: '100',
    totalElements: 1,
  },
  links: [],
}
const options = {
}

const entityTester = new ReduxEntityTester(DatasetActions, DatasetReducers, DatasetSelectors, React.PropTypes.objectOf(Dataset).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model Dataset', () => {
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

