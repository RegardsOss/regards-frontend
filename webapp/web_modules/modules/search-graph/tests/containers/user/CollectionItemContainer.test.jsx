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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { CollectionItemContainer } from '../../../src/containers/user/CollectionItemContainer'
import CollectionItem from '../../../src/components/user/CollectionItem'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing CollectionItemContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionItemContainer)
  })
  it('should render properly', () => {
    const props = {
      collection: DumpProvider.getFirstEntity('AccessProjectClient', 'CollectionEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      isLastLevel: false,
      selected: false,
      // from map dispatch to props
      dispatchSelected: () => { },
    }
    const enzymeWrapper = shallow(<CollectionItemContainer {...props} />, { context })
    const collectionItems = enzymeWrapper.find(CollectionItem)
    assert.lengthOf(collectionItems, 1, 'The corresponding component should be rendered')
    // check properties propagation
    let componentWrapper = collectionItems.at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, { collection: props.collection, selected: props.selected })

    const nextProps = {
      ...props,
      selected: true,
    }
    enzymeWrapper.setProps(nextProps)
    componentWrapper = enzymeWrapper.find(CollectionItem).at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, { selected: nextProps.selected })
    assert.isTrue(componentWrapper.props().selected, 'The component should be selected when the container')
  })
})
