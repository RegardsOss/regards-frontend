/**
 * LICENSE_PLACEHOLDER
 **/
import { stub } from 'sinon'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { PluginConfigurationListContainer } from '../../../src/containers/plugin/PluginConfigurationListContainer'
import PluginConfigurationContainer from '../../../src/containers/plugin/PluginConfigurationContainer'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration list container', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(PluginConfigurationListContainer)
    assert.isDefined(PluginConfigurationContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
        pluginId: 'aPluginId',
        pluginConfigurationId: '0',
      },
      // from mapStateToProps
      pluginConfigurationList: {
        0: {
          content: {
            id: 0,
            label: 'Cool configuration',
            version: '2.0.0',
            priorityOrder: 4,
            active: true,
            pluginClassName: 'Kerberos',
          },
          links: [],
        },
        1: {
          content: {
            id: 1,
            label: 'Not cool configuration',
            version: '1.1.1',
            priorityOrder: 3,
            active: true,
            pluginClassName: 'Kerberos',
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            label: 'Random configuration',
            version: '0.0.1',
            priorityOrder: 1,
            active: false,
            pluginClassName: 'Kerberos',
          },
          links: [],
        },
        3: {
          content: {
            id: 3,
            label: 'Other random configuration',
            version: 'v12',
            priorityOrder: 1,
            active: true,
            pluginClassName: 'Kerberos',
          },
          links: [],
        },
      },
      isPluginConfigurationFetching: false,
      // from mapDispatchToProps
      fetchPluginMetaDataList: () => {
      },
      deletePluginConfiguration: () => {
      },
    }
    const enzymeWrapper = shallow(<PluginConfigurationListContainer {...props} />)
    expect(enzymeWrapper.find(PluginConfigurationContainer)).to.have.length(4)
  })
})
