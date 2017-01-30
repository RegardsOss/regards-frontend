/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import AccountOperationMessage, { operationIds } from '../../src/components/AccountOperationMessage'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AccountOperationMessage', () => {
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
    assert.isDefined(AccountOperationMessage)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
    moduleTheme: styles({}),
  }
  it('Should render properly all modes', () => {
    operationIds.forEach((operationId) => {
      const props = {
        operationId,
        operationAction: () => {},
      }
      shallow(<AccountOperationMessage {...props} />, { context })
    })
  })
})
