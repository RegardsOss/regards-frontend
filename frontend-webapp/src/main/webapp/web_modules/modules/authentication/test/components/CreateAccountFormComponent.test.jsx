/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { Field } from '@regardsoss/form-utils'
import { CreateAccountFormComponent } from '../../src/components/CreateAccountFormComponent'

import styles from '../../src/styles/styles'


describe('[AUTHENTICATION] Testing CreateAccountFormComponent', () => {
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
    assert.isDefined(CreateAccountFormComponent)
  })

  const context = {
    // intl: IntlStub,
    muiTheme: {},
    moduleTheme: styles({ palette: {} }),
  }
  const props = {
    onRequestAction: () => {},
    onBack: () => {},
    project: 'any',
    handleSubmit: () => {},
    initialize: () => {},
  }
  it('should render properly', () => {
    // render disconnected
    shallow(<CreateAccountFormComponent {...props} />, { context })
  })
  it('should show fields for each account input', () => {
    // render disconnected
    const existingAccountRender = shallow(<CreateAccountFormComponent useExistingAccount {...props} />, { context })
    // first name, last name, email, password, confirm password
    assert.equal(existingAccountRender.find(Field).length, 5, 'There should be less fields in existing account case than in the new one!')
  })
})
