/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import { NavigationContainer } from '../../../../src/containers/user/navigation/NavigationContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationContainer)
  })
  it('should render properly', () => {
    const props = {
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildSearchTagLevel('xxx')],
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NavigationComponent), 1, 'The corresponding component should be rendered')
  })
})
