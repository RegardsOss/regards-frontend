/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessRightFormComponent } from '../../src/components/AccessRightFormComponent'

describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightFormComponent', () => {
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
    assert.isDefined(AccessRightFormComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      onSubmit: () => {},
      onCancel: () => {},
      currentAccessRight: undefined,
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
      change: () => {},
    }
    const enzymeWrapper = shallow(<AccessRightFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(5)
  })
})
