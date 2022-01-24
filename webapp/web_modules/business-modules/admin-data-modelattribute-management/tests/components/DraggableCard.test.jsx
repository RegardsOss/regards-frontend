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
import Paper from 'material-ui/Paper'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { DraggableCard } from '../../src/components/DraggableCard'
import ItemTypes from '../../src/components/ItemTypes'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing DraggableCard', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DraggableCard)
  })

  it('should render', () => {
    const props = {
      value: { data: { to: { save: 42 } } },
      connectDragSource: (children) => (children),
      title: 'Some title',
      draggableToContainerType: ItemTypes.ATTR_ASSOCIATED,
      children: (<div />),
      isDragging: false,
      isFragment: false,
      shadow: 1,
    }
    const enzymeWrapper = shallow(<DraggableCard {...props} />, { context })
    const subComponent = enzymeWrapper.find(Paper)
    expect(subComponent).to.have.length(1)
  })
})
