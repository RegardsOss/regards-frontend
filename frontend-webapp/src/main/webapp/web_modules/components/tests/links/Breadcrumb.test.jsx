/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import Breadcrumb from '../../src/links/Breadcrumb'
import BreadcrumbImpl from '../../src/links/BreadcrumbImpl'

const context = buildTestContext()

describe('[Components] Testing Breadcrumb', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Breadcrumb)
  })
  it('should render properly', () => {
    const props = {
      elements: ['a', 'b', 'c'],
      labelGenerator: (elt, index) => `${elt}-${index}`, // make simple label to check generator
      onAction: () => { },
    }
    const enzymeWrapper = shallow(<Breadcrumb {...props} />, { context })
    const breadcrumbImplWrappers = enzymeWrapper.find(BreadcrumbImpl)
    assert.lengthOf(breadcrumbImplWrappers, 1, 'Breadcrumb should delegate rendering to breadcrumb impl (with style context)')
    const renderedElements = breadcrumbImplWrappers.props().elements
    assert.lengthOf(renderedElements, 3, 'Elements rendered should keep the same size')
    assert.deepEqual(renderedElements.map(({ label }) => label), ['a-0', 'b-1', 'c-2'], 'Invalid generated labels')
    assert.isFalse(renderedElements.some(({ onAction }) => !onAction), 'Rendered elements action callback should always be defined')
  })
})
