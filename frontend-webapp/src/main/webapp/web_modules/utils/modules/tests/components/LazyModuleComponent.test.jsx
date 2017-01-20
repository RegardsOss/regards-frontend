/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { moduleContainer } from '@regardsoss/authentication'
import { I18nProvider } from '@regardsoss/i18n'
import ModuleThemeProvider from '../../src/components/ModuleThemeProvider'
import LazyModuleComponent from '../../src/components/LazyModuleComponent'

describe('[MODULES] Testing LazyModuleComponent', () => {
  // This test can last ~6s so we override the timeout duration
  it('Should render correctly an application layout with ApplicationLayout', () => {
    const context = {

    }
    const module = {
      name: 'authentication',
    }
    const wrapper = shallow(<LazyModuleComponent appName={'testApp'} module={module} />, { context })

    expect(wrapper.find(moduleContainer)).to.have.length(1)
    expect(wrapper.find(ModuleThemeProvider)).to.have.length(1)
    expect(wrapper.find(I18nProvider)).to.have.length(1)
  }).timeout(60000)
})
