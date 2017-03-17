/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceCreateOrPickConnectionContainer } from '../../src/containers/DatasourceCreateOrPickConnectionContainer'
import ConnectionDump from '../model/dump/ConnectionDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceCreateOrPickConnectionContainer', () => {
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
    assert.isDefined(DatasourceCreateOrPickConnectionContainer)
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
        project: 'someproject',
      },
      // from mapStateToProps
      connectionList: ConnectionDump,
      // from mapDispatchToProps
      fetchConnectionList: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceCreateOrPickConnectionContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

