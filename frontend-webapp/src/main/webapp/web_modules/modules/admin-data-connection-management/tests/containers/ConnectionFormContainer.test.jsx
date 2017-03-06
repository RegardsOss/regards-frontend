/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ConnectionFormContainer } from '../../src/containers/ConnectionFormContainer'
import ConnectionDump from '../model/dump/ConnectionDump'
import PluginMetaDataDump from '../model/dump/PluginMetaDataDump'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionFormContainer', () => {
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
    assert.isDefined(ConnectionFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
  }
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        connectionId: '1234',
      },
      // from mapStateToProps
      currentConnection: ConnectionDump[1353],
      pluginMetaDataList: PluginMetaDataDump,

      // from mapDispatchToProps
      fetchConnection: () => {},
      createConnection: () => {},
      updateConnection: () => {},
      fetchPluginMetaDataList: () => {},
    }
    const enzymeWrapper = shallow(<ConnectionFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

