/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionEditLinksContainer } from '../../src/containers/CollectionEditLinksContainer'

const context = buildTestContext()

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionEditLinksContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionEditLinksContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        collectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Collection'),
      },
      // from mapStateToProps
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),
      // from mapDispatchToProps
      removeTagFromCollection: () => {},
      addTagToCollection: () => {},
      fetchCollection: () => {},
      fetchCollectionList: () => {},
    }
    const enzymeWrapper = shallow(<CollectionEditLinksContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    enzymeWrapper.instance().setState({ isLoading: false })
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
