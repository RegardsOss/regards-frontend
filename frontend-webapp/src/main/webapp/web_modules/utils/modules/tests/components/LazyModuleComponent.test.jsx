/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { moduleContainer } from '@regardsoss/authentication'
import { I18nProvider } from '@regardsoss/i18n'
import ModuleThemeProvider from '../../src/components/ModuleThemeProvider'
import LazyModuleComponent from '../../src/components/LazyModuleComponent'

/**
 * Tests for LazyModuleComponent
 * @author Sébastien Binda
 */
describe('[MODULES] Testing LazyModuleComponent', () => {
  // This test can last ~6s so we override the timeout duration
  it('Should render correctly an application layout with ApplicationLayout', (done) => {
    const context = {
    }
    const module = {
      name: 'authentication',
      active: true,
    }
    const wrapper = shallow(<LazyModuleComponent
      appName={'testApp'} module={module} onLoadAction={
      () => {
        try {
          expect(wrapper.find(moduleContainer)).to.have.length(1)
          expect(wrapper.find(ModuleThemeProvider)).to.have.length(1)
          expect(wrapper.find(I18nProvider)).to.have.length(1)
          done()
        } catch (e) {
          done(e)
        }
      }
    }
    />, { context })
  }).timeout(60000)

  it('Should not render a desable module', (done) => {
    const context = {

    }
    const module = {
      name: 'authentication',
      active: false,
    }
    const wrapper = shallow(<LazyModuleComponent
      appName={'testApp'} module={module} onLoadAction={
      () => {
        try {
          expect(wrapper.find(moduleContainer)).to.have.length(0)
          expect(wrapper.find(ModuleThemeProvider)).to.have.length(0)
          expect(wrapper.find(I18nProvider)).to.have.length(0)
          done()
        } catch (e) {
          done(e)
        }
      }
    }
    />, { context })
  }).timeout(60000)
})
