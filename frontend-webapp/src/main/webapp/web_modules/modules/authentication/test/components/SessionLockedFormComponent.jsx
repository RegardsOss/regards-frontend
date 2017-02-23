/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { SessionLockedFormComponent } from '../../src/components/SessionLockedFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing SessionLockedFormComponent', () => {
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
    assert.isDefined(SessionLockedFormComponent)
  })
  const muiTheme = {
    palette: {},
  }
  const context = {
    intl: IntlStub,
    muiTheme,
    moduleTheme: styles(muiTheme),
  }
  it('Renders properly', () => {
    const props = {
      onUnlock: () => { },
    }
    const render = shallow(<SessionLockedFormComponent {...props} />, { context })
    assert.equal(render.find(Field).length, 1, 'There should be 1 field for password')
  })
})
