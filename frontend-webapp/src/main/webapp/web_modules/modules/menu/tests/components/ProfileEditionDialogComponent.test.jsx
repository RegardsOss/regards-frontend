/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProfileEditionDialogComponent from '../../src/components/ProfileEditionDialogComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionDialogComponent)
  })
  it('should render properly', () => {
    const props = {
      userMetadata: [],
      onHideDialog: () => { },
      onEdit: () => { },
    }
    shallow(<ProfileEditionDialogComponent {...props} />, { context })
  })
})
