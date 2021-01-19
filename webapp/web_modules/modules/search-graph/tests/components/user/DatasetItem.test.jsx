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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import DatasetItem from '../../../src/components/user/DatasetItem'
import ItemLinkContainer from '../../../src/containers/user/ItemLinkContainer'
import DatasetAttributes from '../../../src/components/user/DatasetAttributes'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetItem', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetItem)
  })
  it('should render properly', () => {
    const props = {
      dataset: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      attributesVisible: false,
      locked: false,
      selected: false,
      datasetAttributes: [],
      onSelect: () => { },
    }
    const enzymeWrapper = shallow(<DatasetItem {...props} />, { context })
    // test properties propagation
    let links = enzymeWrapper.find(ItemLinkContainer)
    let attributesPanes = enzymeWrapper.find(DatasetAttributes)
    assert.lengthOf(links, 1, 'There should be one item link')
    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      entity: props.dataset,
      selected: props.selected,
      onSelect: props.onSelect,
      locked: props.locked,
    })
    assert.lengthOf(attributesPanes, 1, 'There should be one dataset container pane')
    testSuiteHelpers.assertWrapperProperties(attributesPanes.at(0), {
      datasetAttributes: props.datasetAttributes,
      visible: props.attributesVisible,
    })

    // change props
    const nextProps = {
      ...props,
      attributesVisible: true,
      locked: true,
      selected: true,
      datasetAttributes: [],
      onSelect: () => { },
    }
    enzymeWrapper.setProps(nextProps)
    links = enzymeWrapper.find(ItemLinkContainer)
    attributesPanes = enzymeWrapper.find(DatasetAttributes)
    testSuiteHelpers.assertWrapperProperties(links.at(0), {
      entity: nextProps.dataset,
      selected: nextProps.selected,
      onSelect: nextProps.onSelect,
      locked: nextProps.locked,
    })
    assert.lengthOf(attributesPanes, 1, 'There should be one dataset container pane')
    testSuiteHelpers.assertWrapperProperties(attributesPanes.at(0), {
      datasetAttributes: nextProps.datasetAttributes,
      visible: nextProps.attributesVisible,
    })
    // test attributes are hidden
  })
})
