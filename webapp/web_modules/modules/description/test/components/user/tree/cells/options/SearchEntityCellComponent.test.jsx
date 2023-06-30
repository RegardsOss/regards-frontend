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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchEntityCellComponent from '../../../../../../src/components/user/tree/cells/options/SearchEntityCellComponent'
import SearchOptionComponent from '../../../../../../src/components/user/tree/cells/options/SearchOptionComponent'
import styles from '../../../../../../src/styles'
import { resolvedDatasetEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test SearchEntityCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing SearchEntityCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchEntityCellComponent)
  })
  it('should render correctly', () => {
    const spyOnSearchEntity = {}
    const props = {
      entity: resolvedDatasetEntity.displayModel.linkedEntities[0],
      onSearchEntity: (entity) => {
        spyOnSearchEntity.entity = entity
      },
    }
    const enzymeWrapper = shallow(<SearchEntityCellComponent {...props} />, { context })
    const searchOptionWrapper = enzymeWrapper.find(SearchOptionComponent)
    assert.lengthOf(searchOptionWrapper, 1, 'There should be search option')
    testSuiteHelpers.assertWrapperProperties(searchOptionWrapper, {
      tooltip: 'module.description.common.search.entity.tooltip',
      onSearch: enzymeWrapper.instance().onSearch,
    }, 'Search option properties should be correctly set')
    // test callback invokation
    assert.isNotOk(spyOnSearchEntity.entity, 'Callback should not have been invoked yet')
    searchOptionWrapper.props().onSearch()
    assert.deepEqual(spyOnSearchEntity.entity, props.entity, 'Callback should have been invoked with right parameters')
  })
})
