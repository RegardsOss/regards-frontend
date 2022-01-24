/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ModelAttributeFormComponent } from '../../src/components/ModelAttributeFormComponent'
import DraggableCard from '../../src/components/DraggableCard'
import ContainerCard from '../../src/components/ContainerCard'

const distributedAttrModels = {
  ATTR_REMAINING: {
    fragments: {
      2: [
        DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
      ],
    },
    attrs: [],
  },
  ATTR_ASSOCIATED: {
    fragments: {
      2: [
        DumpProvider.getFirstEntity('DataManagementClient', 'AttributeModel'),
      ],
    },
    attrs: [],
  },
}

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModelAttributeFormComponent)
  })

  it('should render', () => {
    const props = {
      distributedAttrModels,
      onCreateFragment: () => { },
      onDeleteFragment: () => { },
      onCreateAttributeModel: () => { },
      onDeleteAttributeModel: () => { },
      backUrl: '#',
      currentModel: DumpProvider.getFirstEntity('DataManagementClient', 'Model'),
    }
    const enzymeWrapper = shallow(<ModelAttributeFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(DraggableCard)
    const subComponentContainerCard = enzymeWrapper.find(ContainerCard)
    expect(subComponent).to.have.length(2)
    expect(subComponentContainerCard).to.have.length(2)
  })
})
