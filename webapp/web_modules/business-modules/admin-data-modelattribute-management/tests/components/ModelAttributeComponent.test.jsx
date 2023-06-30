/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRowColumn } from 'material-ui/Table'
import { spy } from 'sinon'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import ModelAttributeComponent from '../../src/components/ModelAttributeComponent'

const context = buildTestContext()

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeComponent)
    assert.isDefined(PluginConfigurationPickerComponent)
  })

  it('should render', () => {
    const onSelectFieldChange = spy()

    const props = {
      modelAttribute: DumpProvider.getFirstEntity('DataManagementClient', 'ModelAttribute'),
      handleComputationUpdate: onSelectFieldChange,
    }
    const enzymeWrapper = shallow(<ModelAttributeComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(2)
    const subComponentSelectField = enzymeWrapper.find(PluginConfigurationPickerComponent)
    expect(subComponentSelectField).to.have.length(1)
    subComponentSelectField.simulate('change', 'FROM_DESCENDANTS')
    expect(onSelectFieldChange.calledOnce).to.equal(true)
  }).timeout(60000)
})
