/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionFormContainer } from '../../src/containers/CollectionFormContainer'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        collectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Collection'),
        mode: 'duplicate',
      },
      // from mapStateToProps
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      isFetchingCollection: false,
      isFetchingModelAttribute: false,
      isFetchingModel: false,
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      createCollection: () => {},
      updateCollection: () => {},
      fetchCollection: () => {},
      fetchModelList: () => {},
      fetchModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<CollectionFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})

