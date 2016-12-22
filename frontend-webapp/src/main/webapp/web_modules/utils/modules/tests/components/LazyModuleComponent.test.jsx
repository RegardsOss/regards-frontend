/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { moduleContainer } from '@regardsoss/authentication'
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
  }).timeout(20000)
})
