/**
 * LICENSE_PLACEHOLDER
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AIPStatus, aipStates, aipDataTypes } from '@regardsoss/model'
import AIPStatusActions from '../../src/model/AIPStatusActions'
import AIPStatusReducers from '../../src/model/AIPStatusReducers'
import AIPStatusSelectors from '../../src/model/AIPStatusSelectors'

const backendServerResultList = {
  content: [{
    content: {
      id: 1,
      ipId: 'ip_idX',
      sipId: 'sip_spaceX_01',
      type: aipDataTypes[0],
      state: aipStates[0],
      date: '1997-07-16T19:20+01:00',
      comment: 'I am the spaceX program, I have nothing to do here =)',
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
// URL options and parameters
const options = {}

const entityTester = new ReduxEntityTester(AIPStatusActions, AIPStatusReducers, AIPStatusSelectors, React.PropTypes.objectOf(AIPStatus).isRequired, backendServerResultList, options)

describe('[ARCHIVAL STORAGE AIP STATUS] Testing model AIPStatus', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it within the store.', (done) => {
    entityTester.runTests(done)
  })
})
