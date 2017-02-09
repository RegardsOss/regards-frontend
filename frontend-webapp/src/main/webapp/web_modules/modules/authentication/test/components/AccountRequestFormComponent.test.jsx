/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { forEach } from 'lodash'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { AccountRequestFormComponent, requestFormIds } from '../../src/components/AccountRequestFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AccountRequestFormComponent', () => {
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
    assert.isDefined(AccountRequestFormComponent)
  })
  const muiTheme = {
    palette: {},
  }
  const context = {
    intl: IntlStub,
    muiTheme,
    moduleTheme: styles(muiTheme),
  }
  it('should render properly, in all modes', () => {
    const props = {
      onRequestAction: () => {},
      onBack: () => {},
      handleSubmit: () => {},
      initialize: () => {},
      requestFormId: '',
    }
    // test all rendering
    forEach(requestFormIds, (formId) => {
      props.requestFormId = formId
      const enzymeShallow = shallow(<AccountRequestFormComponent {...props} />, { context })
      // check it uses one connected form component from regards
      assert(enzymeShallow.find(ReduxConnectedForm).length, 1, 'There should be one and only redux connected form in component')
    })
  })
})
