/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AccessRightContainer } from '../../src/containers/AccessRightContainer'

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing AccessRightContainer', () => {
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
    assert.isDefined(AccessRightContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  // TODO test some rendering
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
      },
      // from mapStateToProps
      accessGroupList: {},
      pluginConfigurationList: {},
      pluginMetaDataList: {},

      // from mapDispatchToProps
      fetchAccessGroup: () => {},
      fetchPluginConfigurationList: () => {},
      fetchPluginMetaDataList: () => {},
      fetchAccessGroupList: () => {},
      updateAccessRight: () => {},
      createAccessRight: () => {},
      deleteAccessRight: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
