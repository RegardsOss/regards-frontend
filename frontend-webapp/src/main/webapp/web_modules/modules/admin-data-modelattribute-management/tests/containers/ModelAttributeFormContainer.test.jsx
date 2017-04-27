/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ModelAttributeFormContainer } from '../../src/containers/ModelAttributeFormContainer'
import ModelAttributeFormComponent from '../../src/components/ModelAttributeFormComponent'

const distributedAttrModels = {
  ATTR_REMAINING: {
    fragments: {},
    attrs: [DumpProvider.getNthEntity('DataManagementClient', 'AttributeModel', 1)],
  },
  ATTR_ASSOCIATED: {
    fragments: {},
    attrs: [DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel')],
  },
}
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT]Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)


  it('should exists', () => {
    assert.isDefined(ModelAttributeFormContainer)
    assert.isDefined(ModelAttributeFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'project name',
        model_id: '1',
      },
      // from mapStateToProps
      model: DumpProvider.get('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      attributeModelList: DumpProvider.get('DataManagementClient', 'AttributeModel'),
      isModelFetching: false,
      isModelAttributeFetching: false,
      isAttributeModelFetching: false,
      // from mapDispatchToProps
      createModelAttribute: () => { },
      fetchAttributeModelList: () => { },
      fetchModelAttributeList: () => { },
      deleteModelAttribute: () => { },
      fetchModel: () => { },
      bindFragment: () => { },
      unbindFragment: () => { },
    }

    const enzymeWrapper = shallow(<ModelAttributeFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeFormComponent)
    expect(subComponent).to.have.length(1)
    assert.deepEqual(subComponent.prop('distributedAttrModels'), distributedAttrModels)
  })
})
