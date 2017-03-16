import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import root from 'window-or-global'
import { stub } from 'sinon'
import { LoadableContentDialogComponent } from '@regardsoss/components'
import HomePageContainer from '../../src/containers/HomePageContainer'

// Test a component rendering
describe('[HOME PAGE MODULE] Testing home page module container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
    root.localStorage = {
      getItem: () => null,
    }
  })
  after(() => {
    console.error.restore()
    delete root.localStorage
  })
  it('should exists', () => {
    assert.isDefined(HomePageContainer)
  })
  it('should render self and subcomponents', () => {
    // simple render test (should not output warn nor cause errors)
    const props = {
      project: 'any',
      moduleConf: {
        htmlPath: 'http://www.viedemerde.fr',
      },
    }
    const context = {
      muiTheme: {},
      moduleTheme: {
        dialog: {
          bodyStyle: {},
          heightPercent: 50,
          widthPercent: 50,
        },
      },
    }
    const enzymeWrapper = shallow(<HomePageContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(LoadableContentDialogComponent)
    expect(subComponent).to.have.length(1)
  })
})
