/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardHeader } from 'material-ui/Card'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleTitle from '../../src/module/ModuleTitle'
import styles from '../../src/module/styles/styles'

const context = buildTestContext(styles)

/**
* Test ModuleTitle
* @author Raphaël Mechali
*/
describe('[Components] Testing ModuleTitle', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleTitle)
  })
  it('should render correctly', () => {
    const props = {
      type: 'any',
      locale: 'en',
      description: 'any-module',
      page: {
        home: true,
        iconType: 'DEFAULT',
        customIconURL: 'any.svg',
        title: {
          en: 'any',
          fr: 'quelconque',
        },
      },
      titleComponent: null,
      expandable: true,
      expanded: true,
      subtitle: 'a subtitle',
      // module title bar options
      options: [<div key="1" id="option.1" />, <div key="2" id="option.2" />],
      onExpandChange: () => { },
    }
    const enzymeWrapper = shallow(<ModuleTitle {...props} />, { context })
    const cardHeader = enzymeWrapper.find(CardHeader)
    assert.lengthOf(cardHeader, 1, 'There should be a card header')

    // render title component
    assert.isOk(cardHeader.props().title, 'There should be a title prop in card header')
    // note: MUI forbids further tests here (context issue)
    // test expandable change
    enzymeWrapper.setProps({
      ...props,
      expandable: false,
    })
    // test expanded change
    enzymeWrapper.setProps({
      ...props,
      expandable: true,
    })
  })

  it('should render correctly in minimal mode (no option / page / subtitle / description)', () => {
    const props = {
      type: 'any',
      expandable: true,
      expanded: true,
      locale: 'fr',
      onExpandChange: () => { },
    }
    shallow(<ModuleTitle {...props} />, { context })
  })
  it('should render correctly with component title', () => {
    const props = {
      type: 'any',
      locale: 'en',
      description: 'any-module',
      page: {
        home: true,
        iconType: 'DEFAULT',
        customIconURL: 'any.svg',
        title: {
          en: 'any',
          fr: 'quelconque',
        },
      },
      titleComponent: <div id="title" />,
      expandable: true,
      expanded: true,
      subtitle: 'a subtitle',
      // module title bar options
      options: [<div key="1" id="option.1" />, <div key="2" id="option.2" />],
      onExpandChange: () => { },
    }
    shallow(<ModuleTitle {...props} />, { context })
  })
})
