/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasourceFormMappingContainer } from '../../src/containers/DatasourceFormMappingContainer'
import DatasourceDump from '../model/dump/DatasourceDump'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import ConnectionTableAttributeDump from '../model/dump/ConnectionTableAttributeDump'
import ConnectionTableDump from '../model/dump/ConnectionTableDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingContainer', () => {
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
    assert.isDefined(DatasourceFormMappingContainer)
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
      currentDatasource: DatasourceDump['1'],
      isEditing: true,
      isCreating: false,
      handleSave: () => {},
      handleBack: () => {},
      // from mapStateToProps
      tableList: ConnectionTableDump,
      tableAttributeList: ConnectionTableAttributeDump,
      modelAttributeList: ModelAttributeDump,
      // from mapDispatchToProps
      fetchTableAttributes: () => {},
      fetchTable: () => {},
      fetchModelAttributeList: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
