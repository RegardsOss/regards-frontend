/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ModelAttributeContainer } from '../../src/containers/ModelAttributeContainer'
import ModelAttributeComponent from '../../src/components/ModelAttributeComponent'


describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeContainer)
    assert.isDefined(ModelAttributeComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      attribute: DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
      // from mapStateToProps
      modelAttribute: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute'),
      modelAttributeComputationType: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttributesComputationTypes'),
      // from mapDispatchToProps
      updateModelAttribute: () => { },
    }
    const enzymeWrapper = shallow(<ModelAttributeContainer {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeComponent)
    expect(subComponent).to.have.length(1)
  })
})
