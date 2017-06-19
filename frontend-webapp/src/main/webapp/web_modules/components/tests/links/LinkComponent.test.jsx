/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LinkComponent from '../../src/links/LinkComponent'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing LinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LinkComponent)
  })
  it('should render properly', () => {
    const props = {
      link: 'xxxx',
      label: 'hello link',
    }
    shallow(<LinkComponent {...props} />, { context })
  })
})
