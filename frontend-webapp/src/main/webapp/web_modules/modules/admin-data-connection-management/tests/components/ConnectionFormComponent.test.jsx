/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ConnectionFormComponent } from '../../src/components/ConnectionFormComponent'
import PluginMetaDataDump from '../model/dump/PluginMetaDataDump'
import {  Field } from '@regardsoss/form-utils'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionFormComponent', () => {
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
    assert.isDefined(ConnectionFormComponent)
    assert.isDefined(Field)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      layout: {
        cardEspaced: {},
      },
    },
  }
  it('Render properly', () => {
    const props = {
      currentConnection: null,
      pluginMetaDataList: PluginMetaDataDump,
      onSubmit: () => {},
      backUrl: '#',
      isCreating: true,
      isEditing: false,

      submitting:  false,
      invalid:  false,
      handleSubmit: () => {},
      initialize: () => {},

    }
    const enzymeWrapper = shallow(<ConnectionFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(12)
  })
})
