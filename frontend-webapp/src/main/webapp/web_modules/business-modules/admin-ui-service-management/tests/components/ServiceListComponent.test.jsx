/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card } from 'material-ui/Card'
import ServiceListComponent from '../../src/components/ServiceListComponent'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceListComponent)
    assert.isDefined(Card)
  })

  it('Render properly', () => {
    const handleOpenSpy = spy()
    const handleBackSpy = spy()
    const handleCreateSpy = spy()
    const props = {
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      handleCreate: handleCreateSpy,
      handleOpen: handleOpenSpy,
      handleBack: handleBackSpy,
    }

    const enzymeWrapper = shallow(<ServiceListComponent {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(Card)).to.have.length(6)
    assert.isTrue(handleCreateSpy.notCalled, 'Not called yet')
    assert.isTrue(handleOpenSpy.notCalled, 'Not called yet')
    assert.isTrue(handleBackSpy.notCalled, 'Not called yet')
  })
})
