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
  it('should render correctly', () => {
    const props = {
      displayDatasets: true,
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildSearchTagLevel('xxx')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NavigationComponent), 1, 'The corresponding component should be rendered')
  })
  it('should hide dataset level when not displaying dataset', () => {
    const props = {
      displayDatasets: false,
      levels: [NavigationLevel.buildRootLevel(), NavigationLevel.buildSearchTagLevel('xxx'), NavigationLevel.buildDatasetLevel('xxx', 'xxx')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const navCompoWrapper = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(navCompoWrapper, 1, 'The corresponding component should be rendered')
    const renderLevels = navCompoWrapper.props().navigationLevels
    assert.lengthOf(renderLevels, 2, 'There should be 2 render levels')
    assert.isNotOk(NavigationLevel.getDatasetLevel(renderLevels), 'The dataset level should not be present in render levels')
  })
})
