/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceFormAttributesContainer } from '../../src/containers/DatasourceFormAttributesContainer'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormAttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceFormAttributesContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      currentDatasource: null,
      handleSave: () => {},
      backUrl: '#',
      currentConnectionId: parseInt(DumpProvider.getFirstEntityKey('DataManagementClient', 'Connection'), 10),
      // from mapStateToProps
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      currentConnection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      // from mapDispatchToProps
      fetchModelList: () => {},
      fetchConnection: () => {},
    }


    const enzymeWrapper = shallow(<DatasourceFormAttributesContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

