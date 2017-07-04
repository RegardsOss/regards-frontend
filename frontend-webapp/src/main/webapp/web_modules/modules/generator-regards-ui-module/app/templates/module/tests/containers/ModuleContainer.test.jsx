/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MenuContainer from '../../src/containers/MenuContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing MenuContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MenuContainer)
  })
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      moduleConf: {},
    }
    shallow(<MenuContainer {...props} />, { context })
  })
})
