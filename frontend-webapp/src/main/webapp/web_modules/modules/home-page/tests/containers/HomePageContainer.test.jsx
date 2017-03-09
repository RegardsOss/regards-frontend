import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { LoadableContentDialogComponent } from '@regardsoss/components'
import HomePageContainer from '../../src/containers/HomePageContainer'

// Test a component rendering
describe('[HOME PAGE MODULE] Testing home page module container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(HomePageContainer)
  })
  it('should render self and subcomponents', () => {
    // simple render test (should not output warn nor cause errors)
    const enzymeWrapper = shallow(<HomePageContainer />)
    const subComponent = enzymeWrapper.find(LoadableContentDialogComponent)
    expect(subComponent).to.have.length(1)
  })
})
