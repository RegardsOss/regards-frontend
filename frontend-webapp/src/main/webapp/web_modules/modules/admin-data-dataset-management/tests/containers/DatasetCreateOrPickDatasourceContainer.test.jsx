/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetCreateOrPickDatasourceContainer } from '../../src/containers/DatasetCreateOrPickDatasourceContainer'
import DatasourceDump from '../model/dump/DatasourceDump'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetCreateOrPickDatasourceContainer', () => {
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
    assert.isDefined(DatasetCreateOrPickDatasourceContainer)
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
      datasourceList: DatasourceDump,
      // from mapDispatchToProps
      fetchDatasourceList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetCreateOrPickDatasourceContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
