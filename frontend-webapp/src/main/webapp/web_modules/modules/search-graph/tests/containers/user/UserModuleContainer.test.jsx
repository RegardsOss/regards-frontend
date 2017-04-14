/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserModuleContainer } from '../../../src/containers/user/UserModuleContainer'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing UserModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      // supplied by LazyModuleComponent
      appName: 'any',
      project: 'any',
      moduleConf: {}, // Module configuration
      // from map state to props
      selectedDataset: null,
      attributeModels: {},
      moduleCollapsed: false,
      // from map dispatch to props
      fetchAttributeModels: () => { },
    }
    const enzymeWrapper = shallow(<UserModuleContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(SearchGraph).length, 1, 'The corresponding component should be rendered')
  })
})
