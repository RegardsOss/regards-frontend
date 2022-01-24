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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import CollectionItem from '../../../src/components/user/CollectionItem'
import ItemLinkContainer from '../../../src/containers/user/ItemLinkContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing CollectionItem', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionItem)
  })
  it('should render properly', () => {
    const props = {
      collection: DumpProvider.getFirstEntity('AccessProjectClient', 'CollectionEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      expensible: false,
      selected: false,
      onSelect: () => { },
    }
    const enzymeWrapper = shallow(<CollectionItem {...props} />, { context })
    // test properties propagation
    const links = enzymeWrapper.find(ItemLinkContainer)
    assert.lengthOf(links, 1, 'There should be one item link')

    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      entity: props.collection,
      selected: props.selected,
      onSelect: props.onSelect,
    })
  })
})
