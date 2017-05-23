/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub, spy } from 'sinon'
import { IntlProvider } from 'react-intl'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import PluginTest from './PluginTest'
import PluginLoader, { UnconnectedPluginLoader } from '../../src/containers/PluginLoader'
import { UnconnectedPluginProvider } from '../../src/containers/PluginProvider'

/**
 * Tests for PluginProvider
 * @author Sébastien Binda
 */
describe('[PLUGINS] Testing Plugins load', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('Should fetch the pluginDefinition with the given pluginId in props', () => {
    const pluginDefinitionId = 12
    const fetchPluginSpy = spy()
    const wrapper = shallow(
      <UnconnectedPluginProvider
        pluginInstanceId={'0'}
        pluginId={pluginDefinitionId}
        pluginConf={{}}
        pluginProps={{}}
        displayPlugin
        pluginToLoad={null}
        fetchPlugin={fetchPluginSpy}
      />,
    )

    assert.isTrue(fetchPluginSpy.calledOnce, 'As no plugin is given, the PluginProvider should fetch the plugin using fetchPlugin method')
    assert.isTrue(fetchPluginSpy.calledWith(pluginDefinitionId), 'Wrong parameter passed to fetchPlugin.')
    assert.lengthOf(wrapper.find(PluginLoader), 0, 'The PluginLoader component should not be rendered cause the pluginDefinition to load is not fetched yet')
    assert.equal(wrapper.find(LoadableContentDisplayDecorator).prop('isLoading'), true, 'A loading component should be display as the pluginDefinition to load is not fetched yet')
  })

  it('Should render a PluginLoader', () => {
    const pluginDefinitionId = 12
    const fetchPluginSpy = spy()
    const wrapper = shallow(
      <UnconnectedPluginProvider
        pluginInstanceId={'0'}
        pluginId={pluginDefinitionId}
        pluginConf={{}}
        pluginProps={{}}
        displayPlugin
        pluginToLoad={{
          content: {
            id: pluginDefinitionId,
            name: 'plugin-test',
            type: 'test',
            sourcesPath: '/test/plugin.js',
          },
        }}
        fetchPlugin={fetchPluginSpy}
      />,
    )

    assert.isFalse(fetchPluginSpy.called, 'The pluginDefinition is already fetched so the fetch method should not be called')
    assert.lengthOf(wrapper.find(PluginLoader), 1, 'The PluginLoader component should be rendered')
    assert.equal(wrapper.find(LoadableContentDisplayDecorator).prop('isLoading'), false, 'Loading component should not be display as the pluginDefinition is already fetched')
  })
  it('Should render correctly that a plugin is loading', () => {
    const wrapper = shallow(
      <UnconnectedPluginLoader
        pluginInstanceId={'0'}
        pluginPath="test"
        pluginConf={{
          parameter: 'value',
        }}
        displayPlugin
        locale="fr"
        loadPlugin={() => {}}
      />,
    )

    expect(wrapper.find(PluginTest)).to.have.length(0)
    expect(wrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
  })

  it('Should render correctly a plugin', () => {
    const wrapper = shallow(
      <UnconnectedPluginLoader
        pluginInstanceId={'0'}
        pluginPath="test"
        pluginConf={{
          parameter: 'value',
        }}
        displayPlugin
        loadedPlugin={{
          name: 'testPlugin',
          plugin: PluginTest,
          messages: {
            fr: {},
            en: {},
          },
          info: {
            name: 'testPlugin',
            description: 'description',
            version: 1.0,
            author: 'Sébastien Binda',
            company: 'CS-SI',
            type: 'criteria',
            conf: {},
          },
        }}
        locale="fr"
      />,
    )

    expect(wrapper.find(PluginTest)).to.have.length(1)
    expect(wrapper.find(PluginTest).prop('parameter')).to.equal('value')
    expect(wrapper.find(IntlProvider)).to.have.length(1)
  })

  it('Should render correctly a element with a plugin as a prop', () => {
    const wrapper = shallow(
      <UnconnectedPluginLoader
        pluginInstanceId={'0'}
        pluginPath="test"
        pluginConf={{
          parameter: 'value',
        }}
        displayPlugin={false}
        loadedPlugin={{
          name: 'testPlugin',
          plugin: PluginTest,
          messages: {
            fr: {},
            en: {},
          },
          info: {
            name: 'testPlugin',
            description: 'description',
            version: 1.0,
            author: 'Sébastien Binda',
            company: 'CS-SI',
            type: 'criteria',
            conf: {},
          },
        }}
        locale="fr"
      >
        <div>Test</div>
      </UnconnectedPluginLoader>,
    )

    expect(wrapper.find(PluginTest)).to.have.length(0)
    expect(wrapper.find('div')).to.have.length(1)
    const pluginParam = wrapper.find('div').prop('plugin')
    assert.isDefined(pluginParam)
    expect(wrapper.find(IntlProvider)).to.have.length(0)
  })
})

/* eslint-enable react-perf/jsx-no-new-object-as-prop */
