/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessRightFormComponent } from '../../src/components/AccessRightFormComponent'
import AccessRightsEnum from '../../src/components/AccessRightsEnum'

const context = buildTestContext()

describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightFormComponent)
  })

  it('Render properly', () => {
    const props = {
      onSubmit: () => {},
      onCancel: () => {},
      currentAccessRight: DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight').content,
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(Field)).to.have.length(5)
  })

  it('Render properly without data access rights if meta is NO_ACCESS', () => {
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight').content
    accessRight.accessLevel = AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS
    const props = {
      onSubmit: () => {},
      onCancel: () => {},
      currentAccessRight: accessRight,
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context, lifecycleExperimental: true })
    const formFields = enzymeWrapper.find(Field)
    const expectedFieldNumber = 4
    // Only 4 fields, in this case, the DATA_ACCESS is hidden
    assert.equal(formFields.length, expectedFieldNumber, 'The DATA_ACCESS field should not be rendered if the METADATA_ACCESS is not FULL_ACCESS')
  })

  it('Render properly without data access rights if meta is DATASET_ACCESS', () => {
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight').content
    accessRight.accessLevel = AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_ACCESS
    const props = {
      onSubmit: () => {},
      onCancel: () => {},
      currentAccessRight: accessRight,
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context, lifecycleExperimental: true })
    const formFields = enzymeWrapper.find(Field)
    const expectedFieldNumber = 4
    // Only 4 fields, in this case, the DATA_ACCESS is hidden
    assert.equal(formFields.length, expectedFieldNumber, 'The DATA_ACCESS field should not be rendered if the METADATA_ACCESS is not FULL_ACCESS')
  })
})
