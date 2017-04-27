/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRowColumn } from 'material-ui/Table'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import AttributeModelComponent from '../../src/components/AttributeModelComponent'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing AttributeModelComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeModelComponent)
  })

  it('should render', () => {
    const props = {
      attribute: DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
    }
    const enzymeWrapper = shallow(<AttributeModelComponent {...props} />)
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(2)
  })
})
