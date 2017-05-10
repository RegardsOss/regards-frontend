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
      },
      // from mapStateToProps
      pluginConfigurationFiltersList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginConfigurationConvertersList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginConfigurationServicesList: DumpProvider.get('CommonClient', 'PluginConfiguration'),

      pluginMetaDataFiltersList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      pluginMetaDataConvertersList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      pluginMetaDataServicesList: DumpProvider.get('CommonClient', 'PluginMetaData'),

      // from mapDispatchToProps
      fetchConvertersConfiguration: () => {},
      fetchServicesConfiguration: () => {},
      fetchFiltersConfiguration: () => {},

      fetchConvertersPluginMetaData: () => {},
      fetchServicesPluginMetaData: () => {},
      fetchFiltersPluginMetaData: () => {},

      fetchLinkPluginDataset: () => {},
      updateLinkPluginDataset: () => {},

    }
    const enzymeWrapper = shallow(<DatasetEditPluginContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
