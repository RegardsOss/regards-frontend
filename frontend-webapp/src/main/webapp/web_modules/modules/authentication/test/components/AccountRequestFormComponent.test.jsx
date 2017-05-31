/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import forEach from 'lodash/forEach'
import { Card } from 'material-ui/Card'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { AccountRequestFormComponent, requestFormIds } from '../../src/components/AccountRequestFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing AccountRequestFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountRequestFormComponent)
  })

  const context = buildTestContext(styles)

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
      assert(enzymeShallow.find(Card).length, 1, 'There should be one and only material-ui Card in component')
    })
  })
})
