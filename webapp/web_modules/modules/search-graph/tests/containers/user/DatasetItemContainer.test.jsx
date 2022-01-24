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
import { DatasetItemContainer } from '../../../src/containers/user/DatasetItemContainer'
import DatasetItem from '../../../src/components/user/DatasetItem'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetItemContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetItemContainer)
  })
  it('should render properly', () => {
    const props = {
      dataset: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      attributesVisible: false,
      graphDatasetAttributes: [],
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      selected: false,
      locked: false,
      // from map dispatch to props
      dispatchSelected: () => { },
    }
    const enzymeWrapper = shallow(<DatasetItemContainer {...props} />, { context })
    const datasetItems = enzymeWrapper.find(DatasetItem)
    assert.lengthOf(datasetItems, 1, 'The corresponding component should be rendered')
    // check properties propagation
    let componentWrapper = datasetItems.at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      dataset: props.dataset,
      locked: props.locked,
      selected: props.selected,
      attributesVisible: props.attributesVisible,
    })

    // check propagation after change
    const nextProps = {
      ...props,
      selected: true,
      locked: true,
      attributesVisible: true,
    }
    enzymeWrapper.setProps(nextProps)
    componentWrapper = enzymeWrapper.find(DatasetItem).at(0)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      locked: nextProps.locked,
      selected: nextProps.selected,
      attributesVisible: nextProps.attributesVisible,
    })
  })
})
