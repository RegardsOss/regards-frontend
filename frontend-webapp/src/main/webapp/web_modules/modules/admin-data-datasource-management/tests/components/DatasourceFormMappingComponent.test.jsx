/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { DatasourceFormMappingComponent } from '../../src/components/DatasourceFormMappingComponent'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import DatasourceDump from '../model/dump/DatasourceDump'
import ConnectionTableAttributeDump from '../model/dump/ConnectionTableAttributeDump'
import ConnectionTableDump from '../model/dump/ConnectionTableDump'
import DatasourceFormMappingFromTableComponent from '../../src/components/DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingCustomComponent from '../../src/components/DatasourceFormMappingCustomComponent'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingComponent', () => {
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
    assert.isDefined(DatasourceFormMappingComponent)
    assert.isDefined(DatasourceFormMappingFromTableComponent)
    assert.isDefined(DatasourceFormMappingCustomComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      currentDatasource: DatasourceDump[4],
      isEditing: true,
      isCreating: false,
      handleBack: () => {},
      onSubmit: () => {},
      onTableSelected: () => {},
      tableList: ConnectionTableDump,
      modelAttributeList: ModelAttributeDump,
      tableAttributeList: ConnectionTableAttributeDump,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingFromTableComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatasourceFormMappingCustomComponent)).to.have.length(1)
  })
})
