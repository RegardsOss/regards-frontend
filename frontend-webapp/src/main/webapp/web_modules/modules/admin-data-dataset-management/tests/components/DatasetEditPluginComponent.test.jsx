/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { List } from 'material-ui/List'
import { DatasetEditPluginComponent } from '../../src/components/DatasetEditPluginComponent'
import PluginConfigurationDump from '../model/dump/PluginConfigurationDump'
import PluginMetaDataDump from '../model/dump/PluginMetaDataDump'
import LinkPluginDatasetDump from '../model/dump/LinkPluginDatasetDump'


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginComponent', () => {
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
    assert.isDefined(DatasetEditPluginComponent)
    assert.isDefined(List)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      linkPluginDataset: LinkPluginDatasetDump[23],
      pluginConfigurationFiltersList: PluginConfigurationDump,
      pluginConfigurationConvertersList: PluginConfigurationDump,
      pluginConfigurationServicesList: PluginConfigurationDump,
      pluginMetaDataFiltersList: PluginMetaDataDump,
      pluginMetaDataConvertersList: PluginMetaDataDump,
      pluginMetaDataServicesList: PluginMetaDataDump,
      onSubmit: () => {},
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<DatasetEditPluginComponent {...props} />, { context })
    expect(enzymeWrapper.find(List)).to.have.length(3)
  })
})
