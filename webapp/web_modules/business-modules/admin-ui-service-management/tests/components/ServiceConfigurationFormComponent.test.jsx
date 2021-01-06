/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import Subheader from 'material-ui/Subheader'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ServiceConfigurationFormComponent } from '../../src/components/ServiceConfigurationFormComponent'
import FieldsBuilderComponent from '../../src/components/FieldsBuilderComponent'
import styles from '../../src/styles'
import PluginServiceDump from './PluginServiceDump'

const context = buildTestContext(styles)

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationFormComponent)
    assert.isDefined(Field)
  })

  it('Render properly', () => {
    const onSubmitSpy = spy()
    const handleSubmitSpy = spy()
    const initializeSpy = spy()

    const props = {
      uiPluginConfiguration: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginConfiguration'),
      plugin: PluginServiceDump,
      isCreating: false,
      isDuplicating: true,
      onSubmit: onSubmitSpy,
      backUrl: '#',
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: handleSubmitSpy,
      initialize: initializeSpy,
    }

    const enzymeWrapper = shallow(<ServiceConfigurationFormComponent {...props} />, { context })
    // the label, active and default fields should be displayed as fields
    expect(enzymeWrapper.find(Field)).to.have.length(3)
    // the static and dynamic parameters should be displayed as Fields builders
    assert.lengthOf(enzymeWrapper.find(FieldsBuilderComponent), 4, 'There should be 4 field builders')
    // the subheaders should be visible
    assert.lengthOf(enzymeWrapper.find(Subheader), 2, 'There should static and dynamic parameters headers')

    assert.isTrue(onSubmitSpy.notCalled, 'Not called yet')
    assert.isTrue(handleSubmitSpy.calledOnce, 'Not called yet')
    assert.isTrue(initializeSpy.calledOnce, 'Initialize the form since we are duplicating an entity')
  })

  it('should render correctly with configuration parameters', () => {
    // prepare a configuration without parameters
    const props = {
      uiPluginConfiguration: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginConfiguration'),
      plugin: {
        ...PluginServiceDump,
        info: {
          ...PluginServiceDump.info,
          conf: { static: {}, dynamic: {} },
        },
      },
      isCreating: false,
      isDuplicating: true,
      onSubmit: () => { },
      backUrl: '#',
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    // render
    const enzymeWrapper = shallow(<ServiceConfigurationFormComponent {...props} />, { context })
    // the label, active and default fields should be displayed as fields
    expect(enzymeWrapper.find(Field)).to.have.length(3)
    // the static and dynamic parameters should be hidden
    assert.lengthOf(enzymeWrapper.find(FieldsBuilderComponent), 0, 'There should be no field builders')
    // the subheaders should be hidden
    assert.lengthOf(enzymeWrapper.find(Subheader), 0, 'There should static and dynamic parameters headers')
  })
})
