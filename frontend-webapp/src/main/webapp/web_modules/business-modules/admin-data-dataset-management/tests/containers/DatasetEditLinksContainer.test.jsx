/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditLinksContainer } from '../../src/containers/DatasetEditLinksContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditLinksContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditLinksContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Dataset'),
      },
      // from mapStateToProps
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),

      // from mapDispatchToProps
      removeTagFromDataset: () => {},
      addTagToDataset: () => {},
      fetchDataset: () => {},
      fetchCollectionList: () => {},
      updateDataset: () => {},
    }
    const enzymeWrapper = shallow(<DatasetEditLinksContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
