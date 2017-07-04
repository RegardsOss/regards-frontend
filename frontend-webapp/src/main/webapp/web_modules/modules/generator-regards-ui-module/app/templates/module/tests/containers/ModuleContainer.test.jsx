/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleContainer from '../../src/containers/ModuleContainer'
import styles from '../../src/styles/styles'

/**
 * ModuleContainer tests
 * @author <%= author %>
 */

const context = buildTestContext(styles)

describe('[Menu] Testing MenuContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      moduleConf: {},
    }
    shallow(<ModuleContainer {...props} />, { context })
  })
})
