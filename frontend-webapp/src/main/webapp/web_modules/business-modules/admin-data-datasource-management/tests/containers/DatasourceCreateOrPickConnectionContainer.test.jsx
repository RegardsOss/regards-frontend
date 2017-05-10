/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceCreateOrPickConnectionContainer } from '../../src/containers/DatasourceCreateOrPickConnectionContainer'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceCreateOrPickConnectionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceCreateOrPickConnectionContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'someproject',
      },
      // from mapStateToProps
      connectionList: DumpProvider.get('DataManagementClient', 'Connection'),
      // from mapDispatchToProps
      fetchConnectionList: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceCreateOrPickConnectionContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

