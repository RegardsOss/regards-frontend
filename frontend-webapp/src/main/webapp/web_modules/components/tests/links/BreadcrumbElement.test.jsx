/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BreadcrumbElement from '../../src/links/BreadcrumbElement'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing BreadcrumbElement', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbElement)
  })
  it('should render properly', () => {
    const props = {
      label: 'l1',
      onAction: () => { },
    }
    shallow(<BreadcrumbElement {...props} />, { context })
  })
})
