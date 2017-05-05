/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProfileEditionDialogComponent from '../../src/components/ProfileEditionDialogComponent'
import { ProfileEditionContainer } from '../../src/containers/ProfileEditionContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionContainer)
  })
  it('should render properly', () => {
    const props = {
      visible: true,
      myUser: null,
      hideDialog: () => {},
      fetchMyUser: () => {},
      updateMyUser: () => {},
    }
    const enzymeWrapper = shallow(<ProfileEditionContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ProfileEditionDialogComponent), 1, 'The corresponding component should be rendered')

    // child should be unmounted when not visible
    enzymeWrapper.setProps({
      ...props,
      visible: false,
    })
    assert.lengthOf(enzymeWrapper.find(ProfileEditionDialogComponent), 0, 'The child should be unmounted for fields to reset')
  })
})
