/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoadingDisplayerComponent from '../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing LoadingDisplayerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadingDisplayerComponent)
  })
  it('should render correctly', () => {
    const props = {
      message: 'I am loading, naaaab',
    }
    shallow(<LoadingDisplayerComponent {...props} />, { context })
  })
})
