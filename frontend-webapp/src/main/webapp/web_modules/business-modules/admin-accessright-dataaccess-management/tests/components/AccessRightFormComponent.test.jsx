/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessRightFormComponent } from '../../src/components/AccessRightFormComponent'

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
      currentAccessRight: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(5)
  })
})
