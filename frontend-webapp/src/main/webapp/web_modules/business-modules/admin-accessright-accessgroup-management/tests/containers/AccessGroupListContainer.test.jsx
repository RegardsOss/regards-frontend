/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessGroupListContainer } from '../../src/containers/AccessGroupListContainer'

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupListContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AccessGroupListContainer)
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
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      accessGroupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetching: false,
      // from mapDispatchToProps
      fetchAccessGroupList: () => {},
      deleteAccessGroup: () => {},

    }
    const enzymeWrapper = shallow(<AccessGroupListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})

