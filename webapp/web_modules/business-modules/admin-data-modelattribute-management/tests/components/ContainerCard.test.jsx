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
import { CardText } from 'material-ui/Card'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ContainerCard } from '../../src/components/ContainerCard'
import ItemTypes from '../../src/components/ItemTypes'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ContainerCard', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ContainerCard)
  })

  it('should render', () => {
    const props = {
      connectDropTarget: (children) => (children),
      title: 'Some title',
      acceptAttrType: ItemTypes.ATTR_ASSOCIATED,
      children: (<div />),
      onChange: () => { },
      canDrop: false,
      isOver: false,
    }
    const enzymeWrapper = shallow(<ContainerCard {...props} />, { context })
    const subComponent = enzymeWrapper.find(CardText)
    expect(subComponent).to.have.length(1)
  })
})
