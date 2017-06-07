/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditPluginContainer } from '../../src/containers/DatasetEditPluginContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditPluginContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '69',
        datasetIpId: 'URN:AIP:DATASET:project1:08ff5cb0-1f02-4918-8a9e-66247e52777f:V1',
      },
      // from mapStateToProps
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      linkPluginDataset: DumpProvider.getFirstEntity('CatalogClient', 'LinkPluginDataset'),
      // from mapDispatchToProps
      fetchPluginConfiguration: () => {},
      fetchPluginMetaData: () => {},
      fetchLinkPluginDataset: () => {},
      updateLinkPluginDataset: () => {},
    }
    const enzymeWrapper = shallow(<DatasetEditPluginContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
