/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ModelAttributeFormComponent } from '../../src/components/ModelAttributeFormComponent'
import DraggableCard from '../../src/components/DraggableCard'
import ContainerCard from '../../src/components/ContainerCard'

const distributedAttrModels = {
  ATTR_REMAINING: {
    fragments: {
      2: [
        DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
      ],
    },
    attrs: [],
  },
  ATTR_ASSOCIATED: {
    fragments: {
      2: [
        DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
      ],
    },
    attrs: [],
  },
}

const options = {
  context: buildTestContext(),
}


// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeFormComponent)
  })

  it('should render', () => {
    const props = {
      distributedAttrModels,
      onCreateFragment: () => { },
      onDeleteFragment: () => { },
      onCreateAttributeModel: () => { },
      onDeleteAttributeModel: () => { },
      backUrl: '#',
      currentModel: DumpProvider.getFirstEntity('DataManagementClient', 'Model'),
    }
    const enzymeWrapper = shallow(<ModelAttributeFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(DraggableCard)
    const subComponentContainerCard = enzymeWrapper.find(ContainerCard)
    expect(subComponent).to.have.length(2)
    expect(subComponentContainerCard).to.have.length(2)
  })
})
