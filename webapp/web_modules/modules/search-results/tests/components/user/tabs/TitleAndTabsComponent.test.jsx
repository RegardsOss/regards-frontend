/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { DefaultModuleTitleComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TitleAndTabsComponent from '../../../../src/components/user/tabs/TitleAndTabsComponent'
import styles from '../../../../src/styles'
import TabComponent from '../../../../src/components/user/tabs/TabComponent'

const context = buildTestContext(styles)

/**
 * Test TitleAndTabsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TitleAndTabsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TitleAndTabsComponent)
  })

  it('should render correctly with only one tab', () => {
    const props = {
      page: {
        home: true,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      },
      localizedTitle: {
        [UIDomain.LOCALES_ENUM.en]: 'My title',
        [UIDomain.LOCALES_ENUM.fr]: 'Mon titre',
      },
      tabs: [{
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        selected: true,
        closable: false,
      }],
      onTabSelected: () => {},
      onTabClosed: () => {},
    }
    const enzymeWrapper = shallow(<TitleAndTabsComponent {...props} />, { context })
    // 1 - Icon and title
    const titleComp = enzymeWrapper.find(DefaultModuleTitleComponent)
    assert.lengthOf(titleComp, 1, 'There should be the title component')
    testSuiteHelpers.assertWrapperProperties(titleComp, {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      localizedTitle: props.localizedTitle,
      page: props.page,
    }, 'Title properties should be correctly reported')
    // 2 - Tabs: none
    const tabs = enzymeWrapper.find(TabComponent)
    assert.lengthOf(tabs, 0, 'Tabs should be hidden as there is currently only one tab (main results)')
  })
  it('should render correctly with only all tabs', () => {
    const props = {
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      },
      localizedTitle: {
        [UIDomain.LOCALES_ENUM.en]: 'My title 2',
        [UIDomain.LOCALES_ENUM.fr]: 'Mon titre 2',
      },
      tabs: [{
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        selected: false,
        closable: false,
      }, {
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        selected: true,
        closable: true,
      }, {
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        selected: false,
        closable: true,
        tabName: 'Potatoes',
      }],
      onTabSelected: () => {},
      onTabClosed: () => {},
    }
    const enzymeWrapper = shallow(<TitleAndTabsComponent {...props} />, { context })
    // 1 - Icon and title
    const titleComp = enzymeWrapper.find(DefaultModuleTitleComponent)
    assert.lengthOf(titleComp, 1, 'There should be the title component')
    testSuiteHelpers.assertWrapperProperties(titleComp, {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      localizedTitle: props.localizedTitle,
      page: props.page,
    }, 'Title properties should be correctly reported')
    // 2 - Tabs: none
    const tabs = enzymeWrapper.find(TabComponent)
    assert.lengthOf(tabs, props.tabs.length, 'There should be each tag')
    props.tabs.forEach(({
      tabType, tabName, selected, closable,
    }, index) => {
      testSuiteHelpers.assertWrapperProperties(tabs.at(index), {
        tabType,
        tabName,
        selected,
        closable,
        onTabSelected: props.onTabSelected,
        onTabClosed: props.onTabClosed,
      }, `Tab #${index} properties should be correctly reported`)
    })
  })
})
