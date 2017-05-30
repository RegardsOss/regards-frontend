/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { getMetadataArray } from '@regardsoss/user-metadata-common'
import { AskProjectAccessFormComponent } from '../../src/components/AskProjectAccessFormComponent'
import styles from '../../src/styles/styles'

const options = {
  context: buildTestContext(styles),
}

describe('[AUTHENTICATION] Testing AskProjectAccessFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(AskProjectAccessFormComponent)
  })
  const props = {
    passwordRules: 'The password should have two legs, three eyes and one egg, turning around a planet',
    fetchPasswordValidity: () => { },
    onRequestAction: () => { },
    onBack: () => { },
    project: 'any',
    projectMetadata: getMetadataArray(),
    handleSubmit: () => { },
    initialize: () => { },
  }
  it('should render properly', () => {
    // render disconnected
    shallow(<AskProjectAccessFormComponent {...props} />, options)
  })

  it('should show create user fields when "use existing account" is unticked, and hide it otherwise', () => {
    // render disconnected
    const existingAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount {...props} />, options)
    const newAccountRender = shallow(<AskProjectAccessFormComponent useExistingAccount={false} {...props} />, options)
    assert.isBelow(existingAccountRender.find(Field).length, newAccountRender.find(Field).length, 'There should be less fields in existing account case than in the new one!')
  })
})
