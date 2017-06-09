/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import { spy } from 'sinon'
import { ListItem } from 'material-ui/List'
import { DumpProvider, buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatasetEditUIServicesComponent } from '../../src/components/DatasetEditUIServicesComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditUIServicesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditUIServicesComponent)
    assert.isDefined(ListItem)
  })


  it('Render properly', () => {
    const handleSubmitSpy = spy()
    const props = {
      backUrl: '#',
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      linkUIPluginDataset: DumpProvider.getFirstEntity('AccessProjectClient', 'LinkUIPluginDataset'),
      handleSubmit: handleSubmitSpy,
      currentDatasetIpId: 'URN:AIP:DATASET:project1:9f81f52c-c9ba-4fe8-af1b-602797789cb3:V1',
      currentDatasetId: '102',
    }

    const enzymeWrapper = shallow(<DatasetEditUIServicesComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(6)
    assert.isTrue(handleSubmitSpy.notCalled, 'Not called yet')
  })
})
