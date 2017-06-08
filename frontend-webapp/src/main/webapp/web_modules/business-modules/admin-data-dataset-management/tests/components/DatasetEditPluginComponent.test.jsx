/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { List } from 'material-ui/List'
import { DatasetEditPluginComponent } from '../../src/components/DatasetEditPluginComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditPluginComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditPluginComponent)
    assert.isDefined(List)
  })

  it('Render properly', () => {
    const props = {
      linkPluginDataset: DumpProvider.getFirstEntity('CatalogClient', 'LinkPluginDataset'),
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      onSubmit: () => {},
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<DatasetEditPluginComponent {...props} />, { context })
    expect(enzymeWrapper.find(List)).to.have.length(1)
  })
})
