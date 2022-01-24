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
import EntitiesSectionPageComponent from '../../../../../../src/components/user/content/list/entity/EntitiesSectionPageComponent'
import ListSectionPageComponent from '../../../../../../src/components/user/content/list/common/ListSectionPageComponent'
import styles from '../../../../../../src/styles'
import { resolvedDataEntity, resolvedDatasetEntity } from '../../../../../dumps/resolved.dump'

const context = buildTestContext(styles)

/**
 * Test EntitiesSectionPageComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing EntitiesSectionPageComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EntitiesSectionPageComponent)
  })
  const testCases = [{
    label: 'linked entities (description and search allowed)',
    entities: resolvedDataEntity.displayModel.linkedEntities,
    isDescriptionAllowed: () => true,
    allowSearching: true,
    scrollAreaHeight: 760,
  }, {
    label: 'linked documents (without description and search)',
    entities: resolvedDatasetEntity.displayModel.linkedDocuments,
    isDescriptionAllowed: () => false,
    allowSearching: false,
    scrollAreaHeight: 760,
  }]
  testCases.forEach(({
    label, entities, isDescriptionAllowed, allowSearching,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      entities,
      isDescriptionAllowed,
      allowSearching,
      scrollAreaHeight: 760,
      onSearchEntity: () => {},
      onSelectEntityLink: () => {},
    }
    const enzymeWrapper = shallow(<EntitiesSectionPageComponent {...props} />, { context })
    const subcomponentWrapper = enzymeWrapper.find(ListSectionPageComponent)
    assert.lengthOf(subcomponentWrapper, 1, 'There should be list render')
    testSuiteHelpers.assertWrapperProperties(subcomponentWrapper, {
      elements: entities,
      buildElementNode: enzymeWrapper.instance().renderEntity,
      scrollAreaHeight: props.scrollAreaHeight,
    }, 'List render properties should be correctly set')
    // Test inner render into entity link component
    entities.forEach((entity) => {
      shallow(enzymeWrapper.instance().renderEntity(entity), { context })
    })
  }))
})
