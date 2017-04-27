/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import GraphLevelMessageDisplayer from '../../../src/components/user/GraphLevelMessageDisplayer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing GraphLevelMessageDisplayer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GraphLevelMessageDisplayer)
  })
  it('should render properly', () => {
    const props = {
      messageKey: 'any',
    }
    shallow(<GraphLevelMessageDisplayer {...props} />, { context })
  })
})
