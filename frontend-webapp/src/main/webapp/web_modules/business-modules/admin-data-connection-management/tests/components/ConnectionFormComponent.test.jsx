/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ConnectionFormComponent } from '../../src/components/ConnectionFormComponent'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionFormComponent)
    assert.isDefined(Field)
  })

  it('Render properly', () => {
    const props = {
      currentConnection: null,
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      onSubmit: () => {},
      backUrl: '#',
      isCreating: true,
      isEditing: false,
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<ConnectionFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(9)
  })
})
