/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { FormattedMessage } from 'react-intl'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationLinkComponent from '../../../../src/components/user/navigation/NavigationLinkComponent'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationLinkComponent)
  })
  it('first level should render properly', () => {
    // Default label
    let wrapper = shallow(<NavigationLinkComponent
      firstLevel
      level={NavigationLevel.buildRootLevel()}
      onClickLevel={() => { }}
    />, { context })
    assert.lengthOf(wrapper.find(FormattedMessage), 1, 'Should show default label')

    // Custom label
    wrapper = shallow(<NavigationLinkComponent
      firstLevel
      level={NavigationLevel.buildRootLevel('Homehome')}
      onClickLevel={() => { }}
    />, { context })
    assert.lengthOf(wrapper.find(FormattedMessage), 0, 'Should not show default label')
    assert.isTrue(wrapper.text().includes('Homehome'), 'The custom label should be shown')
  })

  it('next levels should render properly', () => {
    shallow(<NavigationLinkComponent
      firstLevel={false}
      level={NavigationLevel.buildSearchTagLevel('styles:patatoes')}
      onClickLevel={() => { }}
    />, { context })
  })
})
