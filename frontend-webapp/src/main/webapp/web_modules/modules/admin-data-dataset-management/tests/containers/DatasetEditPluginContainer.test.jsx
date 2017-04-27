/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditPluginContainer } from '../../src/containers/DatasetEditPluginContainer'
import PluginConfigurationDump from '../model/dump/PluginConfigurationDump'
import PluginMetaDataDump from '../model/dump/PluginMetaDataDump'


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(DatasetEditPluginContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }


  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '69',
      },
      // from mapStateToProps
      pluginConfigurationFiltersList: PluginConfigurationDump,
      pluginConfigurationConvertersList: PluginConfigurationDump,
      pluginConfigurationServicesList: PluginConfigurationDump,

      pluginMetaDataFiltersList: PluginMetaDataDump,
      pluginMetaDataConvertersList: PluginMetaDataDump,
      pluginMetaDataServicesList: PluginMetaDataDump,

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
