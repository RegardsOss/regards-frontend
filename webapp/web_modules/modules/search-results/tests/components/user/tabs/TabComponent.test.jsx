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
import isEqual from 'lodash/isEqual'
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import TabComponent from '../../../../src/components/user/tabs/TabComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TabComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TabComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TabComponent)
  })

  const testCases = [{
    label: 'main tab',
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    closable: false,
    expectedLabel: 'search.results.tab.main.results',
  }, {
    label: 'description tab',
    tabType: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
    closable: true,
    expectedLabel: 'search.results.tab.description',
  }, {
    label: 'tag result',
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    closable: true,
    contextCriterion: CriterionBuilder.buildWordTagCriterion('simpleWord'),
    expectedLabel: 'search.results.tab.tag.results',
  }]
  testCases.forEach(({
    label, tabType, closable, contextCriterion, expectedLabel,
  }) => [true, false].forEach((selected) => it(`should render correctly ${label} when ${selected ? 'selected' : 'unselected'}`, () => {
    let spiedTabSelected = null
    let spiedTabClosed = null
    const props = {
      tab: {
        tabType,
        selected,
        closable,
        contextCriterion,
      },
      settings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      onTabSelected: (callbackTabType) => {
        spiedTabSelected = callbackTabType
      },
      onTabClosed: (callbackTabType) => {
        spiedTabClosed = callbackTabType
      },
    }
    const enzymeWrapper = shallow(<TabComponent {...props} />, { context })
    const {
      moduleTheme: {
        user: {
          titleBar: {
            tab: {
              selectedContainer, unselectedContainer,
            },
          },
        },
      },
    } = context
    // 1 - Check tab label (using corresponding div tooltip)
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().title === expectedLabel), 1, `Label ${expectedLabel} should be correctly rendered`)

    // 2 - check selected state is rendered
    const selectedStateStyle = selected ? selectedContainer : unselectedContainer
    assert.lengthOf(enzymeWrapper.findWhere((n) => isEqual(n.props().style, selectedStateStyle)), 1, 'Selection state should be rendered')

    // 3 - check closable state is rendered
    if (closable) {
      const closeButton = enzymeWrapper.find(IconButton)
      assert.lengthOf(closeButton, 1, 'There should be the close button')
      assert.equal(closeButton.props().onClick, enzymeWrapper.instance().onTabClosed, 'Close callback should be correctly set')
    } else {
      assert.isEmpty(enzymeWrapper.find(IconButton), 'There should be no close button')
    }

    // 4 - Check right type icon and labels are rendered
    const { labelKey, IconConstructor } = TabComponent.RENDER_DATA_BY_TYPE[tabType]
    assert.lengthOf(enzymeWrapper.find(IconConstructor), 1, 'Tab type icon should be rendered')
    assert.include(enzymeWrapper.debug(), labelKey, 'Tab type text should be rendered')

    // 5 - Check selection callback is correctly set
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === enzymeWrapper.instance().onTabSelected), 1,
      'There should be a tab selection node')

    // 6 - Check both callback are correctly working
    assert.isNull(spiedTabSelected, 'Tab selected should not have been called yet')
    assert.isNull(spiedTabClosed, 'Tab closed should not have been called yet')
    enzymeWrapper.instance().onTabSelected()
    assert.equal(spiedTabSelected, tabType, 'Tab selected should have been called with the right tab type')
    enzymeWrapper.instance().onTabClosed()
    assert.equal(spiedTabClosed, tabType, 'Tab closed should have been called with the right tab type')
  })))
})
