/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { DumpProvider, buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditUIServicesContainer } from '../../src/containers/DatasetEditUIServicesContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditUIServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditUIServicesContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const fetchUIPluginConfigurationListSpy = spy()
    const fetchUIPluginDefinitionListSpy = spy()
    const fetchDatasetSpy = spy()
    const updateDatasetSpy = spy()

    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '23',
      },
      // from mapStateToProps
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      // from mapDispatchToProps
      fetchUIPluginConfigurationList: fetchUIPluginConfigurationListSpy,
      fetchUIPluginDefinitionList: fetchUIPluginDefinitionListSpy,
      fetchDataset: fetchDatasetSpy,
      updateDataset: updateDatasetSpy,
    }
    const enzymeWrapper = shallow(<DatasetEditUIServicesContainer {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginConfigurationListSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(fetchUIPluginDefinitionListSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(fetchDatasetSpy.calledOnce, 'Fetched on initial render')
    assert.isTrue(updateDatasetSpy.notCalled, 'Not called yet')
  })
})
