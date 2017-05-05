/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { MetadataField, editors } from '@regardsoss/user-metadata-common'
import { ProfileEditionFormComponent } from '../../src/components/ProfileEditionFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionFormComponent)
  })
  it('should render properly', () => {
    const props = {
      // project metadata
      userMetadata: [{
        key: 'meta1',
        labelKey: 'xxx',
        editor: editors.textEditor,
        mandatory: false,
        onlyAtRegistration: false,
      }, {
        key: 'meta2',
        labelKey: 'xxx',
        editor: editors.countriesEditor,
        mandatory: true,
        onlyAtRegistration: false,
      }, {
        key: 'meta3',
        labelKey: 'xxx',
        editor: editors.countriesEditor,
        mandatory: true,
        onlyAtRegistration: true, // should not be in form
      }],
      onCancel: () => { },
      onEdit: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProfileEditionFormComponent {...props} />, { context })
    // we should find one metadata field for each
    assert.lengthOf(enzymeWrapper.find(MetadataField), 2, 'Metadata used "onlyAtRegistration" should be displayed')
  })
})
