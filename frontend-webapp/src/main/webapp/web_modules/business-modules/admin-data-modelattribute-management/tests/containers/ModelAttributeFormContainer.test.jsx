/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ModelAttributeFormContainer } from '../../src/containers/ModelAttributeFormContainer'

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
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'project name',
        model_id: '1',
      },
      // from mapStateToProps
      model: DumpProvider.getFirstEntity('DataManagementClient', 'Model'),
      modelAttributeList: [DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute')],
      attributeModelList: [DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel')],
      isModelFetching: false,
      isModelAttributeFetching: false,
      isAttributeModelFetching: false,
      // from mapDispatchToProps
      createModelAttribute: () => { },
      fetchAttributeModelList: () => { },
      fetchModelAttributeList: () => { },
      deleteModelAttribute: () => { },
      fetchPluginConfiguration: () => { },
      fetchPluginMetaData: () => { },
      fetchModel: () => { },
      bindFragment: () => { },
      unbindFragment: () => { },
    }

    const enzymeWrapper = shallow(<ModelAttributeFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    expect(subComponent).to.have.length(1)
    assert.isFunction(subComponent.prop('children'))
    assert.deepEqual(subComponent.prop('children'), enzymeWrapper.instance().getFormComponent)
    assert.deepEqual(enzymeWrapper.instance().getFormComponent().props.distributedAttrModels, distributedAttrModels)
  })
})
