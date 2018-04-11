/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import DatasetAttributes from '../../../src/components/user/DatasetAttributes'
import ItemLink from '../../../src/components/user/ItemLink'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing DatasetAttributes', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetAttributes)
  })
  it('should render properly when not visible', () => {
    const props = {
      visible: false,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isFalse(showables.at(0).props().show, 'The component should not be visible')
  })
  it('should render properly when visible without attributes', () => {
    const props = {
      visible: true,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isFalse(showables.at(0).props().show, 'The component should not be visible')
  })
  it('should render properly when visible with attributes', () => {
    const props = {
      visible: true,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [
        {
          label: 'attr1',
          render: () => <div />,
          renderKey: 'attr1',
          renderValue: {
            main: 'val1',
          },
        },
        {
          label: 'attr2',
          render: () => <div />,
          renderKey: 'attr2',
          renderValue: {
            main: 'val2',
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isTrue(showables.at(0).props().show, 'The component should be visible')
    // check there is one element for each attribute label. We search here text node (no type)
    props.datasetAttributes.forEach(({ label }) => {
      const labelTextNodes = enzymeWrapper.findWhere(node => !node.type() && node.text() === label)
      assert.lengthOf(labelTextNodes, 1, `${label} -There should one and only one text node to show each attribute label`)
    })
  })
})
