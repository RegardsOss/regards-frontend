/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormAttributesContainer } from '../../src/containers/DatasetFormAttributesContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormAttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFormAttributesContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      currentDatasourceId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Datasource'),
      backUrl: '#',
      handleSave: () => {},
      isEditing: true,
      // from mapStateToProps
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      fetchModelList: () => {},
      fetchModelAttributeList: () => {},
      fetchDatasource: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormAttributesContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
