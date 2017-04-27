/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import FragmentComponent from '../../src/components/FragmentComponent'
import ItemTypes from '../../src/components/ItemTypes'
import AttributeModelComponent from '../../src/components/AttributeModelComponent'
import ModelAttributeContainer from '../../src/containers/ModelAttributeContainer'

const props = {
  attributes: [
    DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
    DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
  ],
}
// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing FragmentComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FragmentComponent)
  })

  it('should render ModelAttributeContainer', () => {
    props.type = ItemTypes.ATTR_ASSOCIATED
    const enzymeWrapper = shallow(<FragmentComponent {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeContainer)
    expect(subComponent).to.have.length(2)
  })
  it('should render AttributeModelComponent', () => {
    props.type = ItemTypes.ATTR_REMAINING
    const enzymeWrapper = shallow(<FragmentComponent {...props} />)
    const subComponent = enzymeWrapper.find(AttributeModelComponent)
    expect(subComponent).to.have.length(2)
  })
})
