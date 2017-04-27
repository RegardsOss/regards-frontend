/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'

import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import ChangePasswordFormComponent from '../../src/components/ChangePasswordFormComponent'
import { ChangePasswordFormContainer } from '../../src/containers/ChangePasswordFormContainer'

describe('[AUTHENTICATION] Testing ChangePasswordFormContainer', () => {
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
    assert.isDefined(ChangePasswordFormContainer)
  })
  const context = {
    intl: IntlStub,
  }
  it('should render properly', () => {
    const props = {
      mail: 'tiki@tokyo.jp',
      token: '1',
      onDone: () => {},
      onTokenExpired: () => {},
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<ChangePasswordFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(ChangePasswordFormComponent).length, 1, 'There should be the rendered component!')
  })
})
