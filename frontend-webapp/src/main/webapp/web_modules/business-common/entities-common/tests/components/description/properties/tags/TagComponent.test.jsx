/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TagComponent from '../../../../../src/components/description/properties/tags/TagComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing TagComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagComponent)
  })
  it('should render correctly', () => {
    const props = {
      tagLabel: 'any',
      isEntity: false,
    }
    shallow(<TagComponent {...props} />, { context })
  })
})
