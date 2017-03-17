/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { forEach } from 'lodash'
import { IntlStub } from '@regardsoss/tests-helpers'
import AccountOperationMessage, { operationIds } from '../../src/components/AccountOperationMessage'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AccountOperationMessage', () => {
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
    assert.isDefined(AccountOperationMessage)
  })
  const muiTheme = {
    palette: {},
  }
  const context = {
    intl: IntlStub,
    muiTheme,
    moduleTheme: styles(muiTheme),
  }
  it('Should render properly all modes', () => {
    forEach(operationIds, (operationId) => {
      const props = {
        operationId,
        operationAction: () => {},
      }
      shallow(<AccountOperationMessage {...props} />, { context })
    })
  })
})
