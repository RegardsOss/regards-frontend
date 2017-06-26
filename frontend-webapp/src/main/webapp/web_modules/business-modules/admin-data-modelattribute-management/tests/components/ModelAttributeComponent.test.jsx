/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRowColumn } from 'material-ui/Table'
import { spy } from 'sinon'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import ModelAttributeComponent from '../../src/components/ModelAttributeComponent'

const context = buildTestContext()

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeComponent)
    assert.isDefined(PluginConfigurationPickerComponent)
  })


  it('should render', () => {
    const onSelectFieldChange = spy()

    const props = {
      modelAttribute: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute'),
      handleComputationUpdate: onSelectFieldChange,
    }
    const enzymeWrapper = shallow(<ModelAttributeComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(3)
    const subComponentSelectField = enzymeWrapper.find(PluginConfigurationPickerComponent)
    expect(subComponentSelectField).to.have.length(1)
    subComponentSelectField.simulate('change', 'FROM_DESCENDANTS')
    expect(onSelectFieldChange.calledOnce).to.equal(true)
  }).timeout(60000)
})
