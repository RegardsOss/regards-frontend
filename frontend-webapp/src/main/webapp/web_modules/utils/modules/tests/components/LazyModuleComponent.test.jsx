/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { LazyModuleComponent } from '@regardsoss/modules'
import { moduleContainer } from '@regardsoss/authentication'

describe('[MODULES] Testing LazyModuleComponent', () => {
  it('Should render correctly an application layout with ApplicationLayout', () => {
    const context = {

    }
    const module = {
      id: 'authentication',
    }
    const wrapper = shallow(<LazyModuleComponent appName={'testApp'} module={module} />, { context })

    expect(wrapper.find(moduleContainer)).to.have.length(1)
  })
})
