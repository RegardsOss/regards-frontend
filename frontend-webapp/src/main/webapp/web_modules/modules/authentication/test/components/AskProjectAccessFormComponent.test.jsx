/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { Field } from '@regardsoss/form-utils'
import { AskProjectAccessFormComponent } from '../../src/components/AskProjectAccessFormComponent'

import styles from '../../src/styles/styles'


describe('[AUTHENTICATION] Testing AskProjectAccessFormComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.

  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AskProjectAccessFormComponent)
  })

  const context = {
    // intl: IntlStub,
    muiTheme: {},
    moduleTheme: styles({ palette: {} }),
  }
  const props = {
    onRequestAction: () => { },
    onBack: () => { },
    project: 'any',
    handleSubmit: () => { },
    initialize: () => { },
  }
  it('should render properly', () => {
    // render disconnected
    shallow(<AskProjectAccessFormComponent {...props} />, { context })
  })

  it('should show create user fields when "use existing account" is unticked, and hide it otherwise', () => {
    // render disconnected
    const existingAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount {...props} />, { context })
    const newAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount={false} {...props} />, { context })
    assert.isBelow(existingAccountRender.find(Field).length, newAccountRender.find(Field).length, 'There should be less fields in existing account case than in the new one!')
  })
})
