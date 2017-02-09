/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupFormContainer } from '../../src/containers/AccessGroupFormContainer'


describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupFormContainer', () => {
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
    assert.isDefined(AccessGroupFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
      },
      // from mapStateToProps
      currentAccessGroup: null,
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      fetchAccessGroup: () => {},
      updateAccessGroup: () => {},
      createAccessGroup: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
