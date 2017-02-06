import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Datasource } from '@regardsoss/model'
import DatasourceActions from '../../src/model/DatasourceActions'
import DatasourceReducers from '../../src/model/DatasourceReducers'
import DatasourceSelectors from '../../src/model/DatasourceSelectors'

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

const entityTester = new ReduxEntityTester(DatasourceActions, DatasourceReducers, DatasourceSelectors, React.PropTypes.objectOf(Datasource).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing model Datasource', () => {
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

