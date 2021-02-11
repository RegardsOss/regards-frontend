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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CardHeader } from 'material-ui/Card'
import { UIDomain } from '@regardsoss/domain'
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
  it('should render correctly in normal mode (with options, page, title, subtile, layout options)', () => {
    const props = {
      type: 'any',
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
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
      subtitle: 'a subtitle',
      showLayoutOptions: true,
      // module title bar options
      options: [<div key="1" id="option.1" />, <div key="2" id="option.2" />],
      onSetMinimized: () => { },
      onSetNormalState: () => { },
      onSetMaximized: () => { },
    }
    const enzymeWrapper = shallow(<ModuleTitle {...props} />, { context })
    const cardHeader = enzymeWrapper.find(CardHeader)
    assert.lengthOf(cardHeader, 1, 'There should be a card header')

    // check there is title component
    assert.isOk(cardHeader.props().title, 'There should be a title prop in card header')
    // check there is subtitle
    assert.isOk(cardHeader.props().subtitle, 'There should be a subtitle prop in card header')
  })

  it('should render correctly in minimal mode (no option, page, subtitle, description, layout options)', () => {
    const props = {
      type: 'any',
      expandable: true,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
      showLayoutOptions: false,
      onSetMinimized: () => { },
      onSetNormalState: () => { },
      onSetMaximized: () => { },
    }
    shallow(<ModuleTitle {...props} />, { context })
  })
  it('should render correctly in maximized mode', () => {
    const props = {
      type: 'any',
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
      expandable: true,
      presentationState: UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED,
      showLayoutOptions: false,
      onSetMinimized: () => { },
      onSetNormalState: () => { },
      onSetMaximized: () => { },
    }
    shallow(<ModuleTitle {...props} />, { context })
  })
})
