/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceFormMappingContainer } from '../../src/containers/DatasourceFormMappingContainer'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormMappingContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      currentDatasource: DumpProvider.getFirstEntity('DataManagementClient', 'Datasource'),
      isEditing: true,
      isCreating: false,
      handleSave: () => {},
      handleBack: () => {},
      // from mapStateToProps
      tableList: DumpProvider.get('DataManagementClient', 'ConnectionTable'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      // from mapDispatchToProps
      fetchTableAttributes: () => {},
      fetchTable: () => {},
      fetchModelAttributeList: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
