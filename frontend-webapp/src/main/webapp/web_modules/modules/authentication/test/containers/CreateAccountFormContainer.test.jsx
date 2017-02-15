/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'

import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import CreateAccountFormComponent from '../../src/components/CreateAccountFormComponent'
import { CreateAccountFormContainer } from '../../src/containers/CreateAccountFormContainer'

describe('[AUTHENTICATION] Testing CreateAccountFormContainer', () => {
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
    assert.isDefined(CreateAccountFormContainer)
  })
  const context = {
    intl: IntlStub,
  }
  it('should render properly', () => {
    const props = {
      project: 'any',
      onBack: () => {},
      onDone: () => {},
    }

    // very small tests for component rendering
    const enzymeWrapper = shallow(<CreateAccountFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(CreateAccountFormComponent).length, 1, 'There should be the rendered component!')
  })
})
