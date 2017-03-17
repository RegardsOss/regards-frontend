/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DatasourceFormAttributesComponent } from '../../src/components/DatasourceFormAttributesComponent'
import DatasourceDump from '../model/dump/DatasourceDump'
import ConnectionDump from '../model/dump/ConnectionDump'
import ModelDump from '../model/dump/ModelDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormAttributesComponent', () => {
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
    assert.isDefined(DatasourceFormAttributesComponent)
    assert.isDefined(Field)
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
      currentConnection: ConnectionDump[1352],
      onSubmit: () => {},
      backUrl: '#',
      modelList: ModelDump,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormAttributesComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(2)
  })
})
