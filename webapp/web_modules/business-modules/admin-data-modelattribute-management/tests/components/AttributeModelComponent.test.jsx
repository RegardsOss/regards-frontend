/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import AttributeModelComponent from '../../src/components/AttributeModelComponent'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing AttributeModelComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeModelComponent)
  })

  it('should render', () => {
    const props = {
      attribute: DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
    }
    const enzymeWrapper = shallow(<AttributeModelComponent {...props} />)
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(2)
  })
})
