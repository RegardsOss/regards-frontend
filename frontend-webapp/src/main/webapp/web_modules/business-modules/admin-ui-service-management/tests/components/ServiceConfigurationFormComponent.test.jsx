/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { ServiceConfigurationFormComponent } from '../../src/components/ServiceConfigurationFormComponent'
import PluginServiceDump from './PluginServiceDump'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationListComponent', () => {
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

    const enzymeWrapper = shallow(<ServiceConfigurationFormComponent {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(Field)).to.have.length(7)
    assert.isTrue(onSubmitSpy.notCalled, 'Not called yet')
    assert.isTrue(handleSubmitSpy.calledOnce, 'Not called yet')
    assert.isTrue(initializeSpy.calledOnce, 'Initialize the form since we are duplicating an entity')
  })
})
