/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'

import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import AskProjectAccessFormComponent from '../../src/components/AskProjectAccessFormComponent'
import { AskProjectAccessFormContainer } from '../../src/containers/AskProjectAccessFormContainer'

describe('[AUTHENTICATION] Testing AskProjectAccessFormContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AskProjectAccessFormContainer)
  })
  const context = {
    intl: IntlStub,
  }
  it('should render properly', () => {
    const props = {
      project: 'any',
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
