/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetCreateOrPickDatasourceContainer } from '../../src/containers/DatasetCreateOrPickDatasourceContainer'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetCreateOrPickDatasourceContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetCreateOrPickDatasourceContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
      },
      // from mapStateToProps
      datasourceList: DumpProvider.get('DataManagementClient', 'Datasource'),
      // from mapDispatchToProps
      fetchDatasourceList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetCreateOrPickDatasourceContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
