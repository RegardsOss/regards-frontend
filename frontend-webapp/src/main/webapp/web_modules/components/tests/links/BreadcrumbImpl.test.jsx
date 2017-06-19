/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BreadcrumbImpl from '../../src/links/BreadcrumbImpl'
import BreadcrumbElement from '../../src/links/BreadcrumbElement'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing BreadcrumbImpl', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbImpl)
  })
  it('should render properly', () => {
    const props = {
      elements: [{
        label: 'l1',
        onAction: () => { },
      }, {
        label: 'l2',
        onAction: () => { },
      }],
    }
    const enzymeWrapper = shallow(<BreadcrumbImpl {...props} />, { context })
    const elementsWrapper = enzymeWrapper.find(BreadcrumbElement)
    assert.lengthOf(elementsWrapper, 2, 'There shold be one rendered element for each breadcrumb entry')
  })
})
