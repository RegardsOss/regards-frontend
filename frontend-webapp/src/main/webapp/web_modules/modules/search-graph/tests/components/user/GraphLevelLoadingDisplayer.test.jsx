/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import GraphLevelLoadingDisplayer from '../../../src/components/user/GraphLevelLoadingDisplayer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing GraphLevelLoadingDisplayer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GraphLevelLoadingDisplayer)
  })
  it('should render properly', () => {
    const props = {}
    shallow(<GraphLevelLoadingDisplayer {...props} />, { context })
  })
})
