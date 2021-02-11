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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EntityCellComponent from '../../../../../../src/components/user/tree/cells/links/EntityCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'
import { resolvedDataEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test EntityCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing EntityCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntityCellComponent)
  })
  it('should render correctly when description is allowed', () => {
    const spyOnSelectEntityLink = {}
    const props = {
      entity: resolvedDataEntity.displayModel.linkedEntities[0],
      isDescriptionAllowed: () => true,
      onSelectEntityLink: (entity) => {
        spyOnSelectEntityLink.entity = entity
      },
    }
    const enzymeWrapper = shallow(<EntityCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.entity.content.label,
      tooltip: 'module.description.common.show.entity.description.tootlip',
      selected: false,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: false,
    })
    assert.isNotOk(spyOnSelectEntityLink.entity, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.equal(spyOnSelectEntityLink.entity, props.entity, 'On select callback should have been invoked with the right parameter')
  })
  it('should render correctly when description is forbidden for entity', () => {
    const props = {
      entity: resolvedDataEntity.entity,
      isDescriptionAllowed: () => false,
      onSelectEntityLink: () => {},
    }
    const enzymeWrapper = shallow(<EntityCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: props.entity.content.label,
      tooltip: props.entity.content.label,
      selected: false,
      disabled: true,
      onClick: enzymeWrapper.instance().onClick,
      section: false,
    })
  })
})
