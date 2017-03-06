/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceFormContainer } from '../../src/containers/DatasourceFormContainer'
import DatasourceDump from '../model/dump/DatasourceDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormContainer', () => {
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
    assert.isDefined(DatasourceFormContainer)
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
        datasourceId: '1',
        connectionId: null,
      },
      // from mapStateToProps
      currentDatasource: DatasourceDump['1'],
      // from mapDispatchToProps
      createDatasource: () => {},
      updateDatasource: () => {},
      fetchDatasource: () => {},
    }


    const enzymeWrapper = shallow(<DatasourceFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

