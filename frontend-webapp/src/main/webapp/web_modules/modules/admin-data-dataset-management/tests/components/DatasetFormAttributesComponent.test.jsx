/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import { Field } from '@regardsoss/form-utils'
import { DatasetFormAttributesComponent } from '../../src/components/DatasetFormAttributesComponent'
import DatasetDump from '../model/dump/DatasetDump'
import ModelDump from '../model/dump/ModelDump'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import DatasourceDump from '../model/dump/DatasourceDump'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormAttributesComponent', () => {
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
    assert.isDefined(DatasetFormAttributesComponent)
    assert.isDefined(TableRow)
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
      currentDataset: DatasetDump[23],
      modelList: ModelDump,
      modelAttributeList: ModelAttributeDump,
      currentDatasource: DatasourceDump[4],
      handleUpdateModel: () => {},
      onSubmit: () => {},
      backUrl: '#',
      isEditing: false,


      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormAttributesComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
    expect(enzymeWrapper.find(Field)).to.have.length(6)
  })
})
