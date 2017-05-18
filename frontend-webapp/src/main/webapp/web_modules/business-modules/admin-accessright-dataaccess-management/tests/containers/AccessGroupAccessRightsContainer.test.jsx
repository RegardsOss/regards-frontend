/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupAccessRightsContainer } from '../../src/containers/AccessGroupAccessRightsContainer'

const context = buildTestContext()

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessGroupAccessRightsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupAccessRightsContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        accessgroup: 'test',
      },
      // from mapStateToProps
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessGroup: () => {},
      fetchPluginConfigurationList: () => {},
      fetchPluginMetaDataList: () => {},
      updateAccessRight: () => {},
      createAccessRight: () => {},
      deleteAccessRight: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupAccessRightsContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
