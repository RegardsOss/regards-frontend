/**
 * LICENSE_PLACEHOLDER
 **/
import { stub } from 'sinon'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import AppBar from 'material-ui/AppBar'
import { IntlStub } from '@regardsoss/tests-helpers'
import { PluginMetaDataListContainer } from '../../../src/containers/plugin/PluginMetaDataListContainer'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin metata data list container', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(PluginMetaDataListContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
      },
      // from mapStateToProps
      pluginMetaDataListOrganizedByType: [
        {
          type: 'someType',
          item: {
            pluginId: 6,
            pluginType: 'Other',
            pluginClassName: 'Kerberos',
            author: 'Jules Verne',
            version: '0.0.5',
            description: 'Allows the users to log in with their usual email and password.',
          },
        }, {
          type: 'someOtherType',
          item: {
            pluginId: 7,
            pluginType: 'Other',
            pluginClassName: 'Toto',
            author: 'Jean-Paul Sartre',
            version: '2.0.0',
            description: 'This plugin is pretty useless actually.',
          },
        },
      ],
      isPluginMetaDataListFetching: false,
      // from mapDispatchToProps
      fetchPluginMetaDataList: () => {
      },
    }
    const options = {
      context: {
        intl: IntlStub,
        muiTheme: {},
      },
    }
    const enzymeWrapper = shallow(<PluginMetaDataListContainer {...props} />, options)
    expect(enzymeWrapper.find(AppBar)).to.have.length(2)
  })
})
