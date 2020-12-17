/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  it('should render properly when visible with attributes and used the right locale label', () => {
    const props = {
      visible: true,
      state: ItemLink.States.DEFAULT,
      datasetAttributes: [
        {
          label: { en: 'attr1.en', fr: 'attr1.fr' },
          render: () => <div />,
          renderKey: 'attr1',
          renderValue: 'val1',
          renderProps: {},
        },
        {
          label: { en: 'attr2.en', fr: 'attr2.fr' },
          render: () => <div />,
          renderKey: 'attr2',
          renderValue: '2',
          renderProps: {
            unit: 'ko',
          },
        },
      ],
    }
    let enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context })
    const showables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showables, 1, 'There should be one showable controller')
    assert.isTrue(showables.at(0).props().show, 'The component should be visible')
    // check labels are correctly rendered with locale
    const savedLocale = context.intl.locale
    context.intl.locale = 'en'
    props.datasetAttributes.forEach(({ label }) => {
      assert.lengthOf(enzymeWrapper.findWhere((node) => !node.type() && node.text() === label.en), 1, `${label.en} - English label should be correctly rendered with en locale`)
    })
    context.intl.locale = 'fr'
    enzymeWrapper = shallow(<DatasetAttributes {...props} />, { context }) // re render with context
    props.datasetAttributes.forEach(({ label }) => {
      assert.lengthOf(enzymeWrapper.findWhere((node) => !node.type() && node.text() === label.fr), 1, `${label.fr} - French label should be correctly rendered with fr locale`)
    })
    context.intl.locale = savedLocale
  })
})
