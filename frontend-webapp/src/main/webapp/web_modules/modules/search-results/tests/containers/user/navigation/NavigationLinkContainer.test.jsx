/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import NavigationLinkComponent from '../../../../src/components/user/navigation/NavigationLinkComponent'
import { NavigationLinkContainer } from '../../../../src/containers/user/navigation/NavigationLinkContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationLinkContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationLinkContainer)
  })
  it('should render properly', () => {
    const props = {
      level: NavigationLevel.buildRootLevel(),
      levelIndex: 0,
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationLinkContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NavigationLinkComponent), 1, 'The corresponding component should be rendered')
  })
})
