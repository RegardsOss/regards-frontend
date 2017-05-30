/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ApplicationLayout } from '@regardsoss/layout'
import { LazyModuleComponent } from '@regardsoss/modules'
import testLayout from './TestLayout'
import testModules from './TestModules'
import Container from '../../src/components/Container'

/**
 * Tests for ApplicationLayout
 * @author Sébastien Binda
 */
describe('[LAYOUT] Testing Application layout ', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render correctly an application layout Container with ApplicationLayout', () => {
    const context = {
      muiTheme: {
        palette: {
          canvasColor: 'white',
        },
      },
    }
    const wrapper = shallow(
      <Container
        appName={'testApp'}
        project={'test'}
        container={testLayout}
      />
      , { context })

    expect(wrapper.find('.mainapp')).to.have.length(1)
    expect(wrapper.find(Container)).to.have.length(3)

    const wrapper2 = shallow(
      <Container
        appName={'testApp'}
        project={'test'}
        container={testLayout.containers[1]}
        modules={testModules}
      />
      , { context })

    expect(wrapper2.find('.row')).to.have.length(1)
    expect(wrapper2.find('.header')).to.have.length(0)
    expect(wrapper2.find('.body')).to.have.length(1)
    expect(wrapper2.find(LazyModuleComponent)).to.have.length(2)
    expect(wrapper2.find(Container)).to.have.length(2)
  })
  it('Should render correctly an application layout factory with ApplicationLayout', () => {
    const context = {
      muiTheme: {
        palette: {
          canvasColor: 'white',
        },
      },
    }
    const wrapper = shallow(
      <ApplicationLayout
        appName={'testApp'}
        project={'test'}
        layout={testLayout}
      />,
      { context })

    expect(wrapper.find(Container)).to.have.length(1)
  })
})
