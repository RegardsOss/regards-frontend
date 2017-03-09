import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { LoadableContentDialogComponent } from '@regardsoss/components'
import { LicenseDisplayContainer } from '../../src/containers/LicenseDisplayContainer'

// Test a component rendering
describe('[LICENSE MODULE] Testing license module container', () => {
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
    assert.isDefined(LicenseDisplayContainer)
  })
  it('should render self and subcomponents', () => {
    // simple render test (should not output warn nor cause errors)
    const enzymeWrapper = shallow(<LicenseDisplayContainer />)
    const subComponent = enzymeWrapper.find(LoadableContentDialogComponent)
    expect(subComponent).to.have.length(1)
  })
})
