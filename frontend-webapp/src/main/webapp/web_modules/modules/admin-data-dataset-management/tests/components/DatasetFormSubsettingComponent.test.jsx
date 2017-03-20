/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DatasetFormSubsettingComponent } from '../../src/components/DatasetFormSubsettingComponent'
import DatasetDump from '../model/dump/DatasetDump'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormSubsettingComponent', () => {
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
    assert.isDefined(DatasetFormSubsettingComponent)
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
      modelAttributeList: ModelAttributeDump,
      currentDataset: DatasetDump[23],
      onSubmit: () => {},
      handleTestSubsetting: () => {},
      handleBack: () => {},
      isEditing: false,

      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormSubsettingComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(1)
  })
})
