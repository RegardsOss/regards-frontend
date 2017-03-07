/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceFormAttributesContainer } from '../../src/containers/DatasourceFormAttributesContainer'
import ConnectionDump from '../model/dump/ConnectionDump'
import ModelDump from '../model/dump/ModelDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormAttributesContainer', () => {
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
    assert.isDefined(DatasourceFormAttributesContainer)
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
      currentDatasource: null,
      handleSave: () => {},
      backUrl: '#',
      currentConnectionId: '1352',
      // from mapStateToProps
      modelList: ModelDump,
      currentConnection: ConnectionDump['1352'],
      // from mapDispatchToProps
      fetchModelList: () => {},
      fetchConnection: () => {},
    }


    const enzymeWrapper = shallow(<DatasourceFormAttributesContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

