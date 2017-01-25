/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { IntlProvider } from 'react-intl'
import PluginTest from './PluginTest'
import { UnconnectedPluginLoader } from '../../src/components/PluginLoader'

describe('[PLUGINS] Testing Plugins load', () => {
  it('Should render correctly that a plugin is loading', () => {
    const wrapper = shallow(
      <UnconnectedPluginLoader
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
    expect(wrapper.find('div').text()).to.equal('Plugin loading ... ')
  })

  it('Should render correctly a plugin', () => {
    const wrapper = shallow(
      <UnconnectedPluginLoader
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
    console.log('PLOPP')
    const wrapper = shallow(
      <UnconnectedPluginLoader
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
