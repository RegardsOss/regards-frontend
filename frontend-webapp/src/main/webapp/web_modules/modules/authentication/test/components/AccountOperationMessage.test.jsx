/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import forEach from 'lodash/forEach'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AccountOperationMessage, { operationIds } from '../../src/components/AccountOperationMessage'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AccountOperationMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountOperationMessage)
  })

  const context = buildTestContext(styles)

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
