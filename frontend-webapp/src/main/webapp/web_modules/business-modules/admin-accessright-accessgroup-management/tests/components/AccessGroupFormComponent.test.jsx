/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessGroupFormComponent } from '../../src/components/AccessGroupFormComponent'

const context = buildTestContext()

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupFormComponent)
  })

  it('Render properly for creation', () => {
    const props = {
      onSubmit: () => {},
      backUrl: '#',
      isDuplicating: false,
      isCreating: true,
      isEditing: false,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupFormComponent {...props} />, { context, lifecycleExperimental: true })
    const formFields = enzymeWrapper.find(Field)
    const expectedNumberOfFields = 2
    assert.equal(formFields.length, expectedNumberOfFields, `The AccessGroupFormComponent should have ${expectedNumberOfFields}`)
    assert.equal(formFields.at(0).prop('disabled'), false, 'The AccessGroupFormComponent name field should be enabled in creation mode')
  })

  it('Render properly for edition', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      onSubmit: () => {},
      backUrl: '#',
      isDuplicating: false,
      isCreating: false,
      isEditing: true,
      currentAccessGroup: accessGroup,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupFormComponent {...props} />, { context, lifecycleExperimental: true })
    const formFields = enzymeWrapper.find(Field)
    const expectedNumberOfFields = 2
    assert.equal(formFields.length, expectedNumberOfFields, `The AccessGroupFormComponent should have ${expectedNumberOfFields}`)
    assert.equal(formFields.at(0).prop('disabled'), true, 'The AccessGroupFormComponent name field should be enabled in creation mode')
  })

  it('Render properly for duplication', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const props = {
      onSubmit: () => {},
      backUrl: '#',
      currentAccessGroup: accessGroup,
      isDuplicating: true,
      isCreating: false,
      isEditing: false,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupFormComponent {...props} />, { context, lifecycleExperimental: true })
    const formFields = enzymeWrapper.find(Field)
    const expectedNumberOfFields = 2
    assert.equal(formFields.length, expectedNumberOfFields, `The AccessGroupFormComponent should have ${expectedNumberOfFields}`)
    assert.equal(formFields.at(0).prop('disabled'), false, 'The AccessGroupFormComponent name field should be enabled in duplication mode')
  })
})
