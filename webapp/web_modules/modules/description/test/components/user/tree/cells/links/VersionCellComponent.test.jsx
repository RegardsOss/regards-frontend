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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import VersionCellComponent from '../../../../../../src/components/user/tree/cells/links/VersionCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'
import { resolvedDataEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test VersionCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing VersionCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(VersionCellComponent)
  })
  it('should render correctly', () => {
    const spyOnSelectEntityLink = {}
    const props = {
      entity: resolvedDataEntity.displayModel.linkedEntities[0],
      onSelectEntityLink: (entity) => {
        spyOnSelectEntityLink.entity = entity
      },
    }
    const enzymeWrapper = shallow(<VersionCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: 'module.description.common.version.link.label',
      tooltip: 'module.description.common.version.link.tooltip',
      selected: false,
      disabled: false,
      onClick: enzymeWrapper.instance().onClick,
      section: false,
    })
    assert.isNotOk(spyOnSelectEntityLink.entity, 'On select callback should not have been invoked yet')
    linkWrapper.props().onClick()
    assert.equal(spyOnSelectEntityLink.entity, props.entity, 'On select callback should have been invoked with the right parameter')
  })
})
