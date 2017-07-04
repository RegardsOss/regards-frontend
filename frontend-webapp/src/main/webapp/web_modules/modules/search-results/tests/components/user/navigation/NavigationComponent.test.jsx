/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '@regardsoss/components'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationComponent)
  })
  it('should render properly', () => {
    const levels = [
      NavigationLevel.buildDatasetLevel('oki', 'doki'),
      NavigationLevel.buildSearchTagLevel('styles:patatoes'),
    ]
    const props = {
      navigationLevels: levels,
      onLevelSelected: () => { },
    }
    const enzymeWrapper = shallow(<NavigationComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Breadcrumb), 1, 'There should be a breadcrumb component')
  })
})
