/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AskProjectAccessFormComponent from '../../src/components/AskProjectAccessFormComponent'
import { AskProjectAccessFormContainer } from '../../src/containers/AskProjectAccessFormContainer'

describe('[AUTHENTICATION] Testing AskProjectAccessFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AskProjectAccessFormContainer)
  })

  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      project: 'any',
      passwordRules: '',
      fetchPasswordRules: () => { },
      fetchPasswordValidity: () => { },
      onBack: () => { },
      onDone: () => { },
      onNewAccountDone: () => { },
      onNewUserDone: () => { },
    }

    // very small tests for component rendering
    const enzymeWrapper = shallow(<AskProjectAccessFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(AskProjectAccessFormComponent).length, 1, 'There should be the rendered component!')
  })
})
