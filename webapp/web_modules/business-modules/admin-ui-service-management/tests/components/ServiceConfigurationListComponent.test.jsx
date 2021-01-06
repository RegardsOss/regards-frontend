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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import ServiceConfigurationListComponent from '../../src/components/ServiceConfigurationListComponent'
import PluginServiceDump from './PluginServiceDump'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationListComponent)
    assert.isDefined(TableRow)
  })

  it('Render properly', () => {
    const handleDeleteSpy = spy()
    const handleDuplicateSpy = spy()
    const handleEditSpy = spy()
    const handleToggleActivationSpy = spy()
    const handleToggleDefaultSpy = spy()
    const props = {
      uiPluginConfigurationList: DumpProvider.get('AccessProjectClient', 'UIPluginConfiguration'),
      uiPluginDefinition: DumpProvider.getNthEntity('AccessProjectClient', 'UIPluginDefinition', 2),
      plugin: PluginServiceDump,
      handleDelete: handleDeleteSpy,
      handleDuplicate: handleDuplicateSpy,
      handleEdit: handleEditSpy,
      handleToggleActivation: handleToggleActivationSpy,
      handleToggleDefault: handleToggleDefaultSpy,
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<ServiceConfigurationListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
    assert.isTrue(handleDeleteSpy.notCalled, 'Not called yet')
    assert.isTrue(handleDuplicateSpy.notCalled, 'Not called yet')
    assert.isTrue(handleEditSpy.notCalled, 'Not called yet')
    assert.isTrue(handleToggleActivationSpy.notCalled, 'Not called yet')
    assert.isTrue(handleToggleDefaultSpy.notCalled, 'Not called yet')
  })
})
