/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field, FormErrorMessage } from '@regardsoss/form-utils'
import { SessionLockedFormComponent } from '../../src/components/SessionLockedFormComponent'

import styles from '../../src/styles/styles'

describe('[AUTHENTICATION] Testing SessionLockedFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionLockedFormComponent)
  })

  const context = buildTestContext(styles)

  it('Renders properly without error', () => {
    const props = {
      hasUnlockingError: false,
      onUnlock: () => { },
    }
    const render = shallow(<SessionLockedFormComponent {...props} />, { context })
    assert.equal(render.find(Field).length, 1, 'There should be 1 field for password')
    assert.equal(render.find(FormErrorMessage).length, 0, 'There should be no error text')
  })
  it('Renders error', () => {
    const props = {
      hasUnlockingError: true,
      onUnlock: () => { },
    }
    const render = shallow(<SessionLockedFormComponent {...props} />, { context })
    assert.equal(render.find(Field).length, 1, 'There should be 1 field for password')
    assert.equal(render.find(FormErrorMessage).length, 1, 'There should be an error text')
  })
})
