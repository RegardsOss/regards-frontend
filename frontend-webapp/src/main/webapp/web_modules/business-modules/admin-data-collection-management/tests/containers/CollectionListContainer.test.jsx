/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionListContainer } from '../../src/containers/CollectionListContainer'


describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),
      isFetching: false,
      // from mapDispatchToProps
      fetchCollectionList: () => {},
      deleteCollection: () => {},

    }
    const enzymeWrapper = shallow(<CollectionListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
