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
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import TitleAndTabsComponent from '../../../../src/components/user/tabs/TitleAndTabsComponent'
import { TitleAndTabsContainer } from '../../../../src/containers/user/tabs/TitleAndTabsContainer'
import styles from '../../../../src/styles'
import { dataContext } from '../../../dumps/data.context.dump'
import { anotherDataEntity, anotherDatasetEntity } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test TitleAndTabsContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TitleAndTabsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TitleAndTabsContainer)
  })
  it('should render and update context correctly', () => {
    // All tabs with selected description
    const spiedUpdateContext = { moduleId: null, resultsContext: null }
    const props = {
      moduleId: 1,
      description: 'any description',
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      },
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            descriptionPath: [{
              entity: anotherDataEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            },
            {
              entity: anotherDatasetEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            }],
            selectedIndex: 1,
          },
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              contextTags: [CriterionBuilder.buildWordTagCriterion('Hello tag')],
            },
          },
        },
      }),
      updateResultsContext: (moduleId, resultsContext) => {
        spiedUpdateContext.moduleId = moduleId
        spiedUpdateContext.resultsContext = resultsContext
      },
    }
    const enzymeWrapper = shallow(<TitleAndTabsContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(TitleAndTabsComponent)
    assert.lengthOf(componentWrapper, 1, '1 - There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      page: props.page,
      tabs: enzymeWrapper.state().tabs,
      onTabSelected: enzymeWrapper.instance().onTabSelected,
      onTabClosed: enzymeWrapper.instance().onTabClosed,
    }, '1 - Current state should be correctly reported to component')
    assert.deepEqual(enzymeWrapper.state().tabs, [{
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selected: false,
      closable: false,
      contextCriterion: null,
    }, {
      tabType: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      selected: true,
      closable: true,
      contextCriterion: null,
    }, {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      selected: false,
      closable: true,
      contextCriterion: CriterionBuilder.buildWordTagCriterion('Hello tag'),
    }], '1 - Tabs list should be correctly computed')
    assert.deepEqual(spiedUpdateContext, { moduleId: null, resultsContext: null }, '1 - Update context should not have been called yet')
    // 2 - Check render with tags tab selected (using container callbacks)
    enzymeWrapper.instance().onTabSelected(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    assert.equal(spiedUpdateContext.moduleId, props.moduleId, '1 - Update context should have been called for the right module ID')
    const props2 = {
      ...props,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(props.resultsContext, spiedUpdateContext.resultsContext),
    }
    enzymeWrapper.setProps(props2)
    componentWrapper = enzymeWrapper.find(TitleAndTabsComponent)
    assert.lengthOf(componentWrapper, 1, '2 - There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      page: props.page,
      tabs: enzymeWrapper.state().tabs,
      onTabSelected: enzymeWrapper.instance().onTabSelected,
      onTabClosed: enzymeWrapper.instance().onTabClosed,
    }, '2 - Current state should be correctly reported to component')
    assert.deepEqual(enzymeWrapper.state().tabs, [{
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selected: false,
      closable: false,
      contextCriterion: null,
    }, {
      tabType: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      selected: false,
      closable: true,
      contextCriterion: null,
    }, {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      selected: true,
      closable: true,
      contextCriterion: CriterionBuilder.buildWordTagCriterion('Hello tag'),
    }], '2 - Tabs list should be correctly computed')
    // 3 - close description tab (using container callbacks)
    enzymeWrapper.instance().onTabClosed(UIDomain.RESULTS_TABS_ENUM.DESCRIPTION)
    const props3 = {
      ...props2,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(props2.resultsContext, spiedUpdateContext.resultsContext),
    }
    enzymeWrapper.setProps(props3)
    componentWrapper = enzymeWrapper.find(TitleAndTabsComponent)
    assert.lengthOf(componentWrapper, 1, '3 - There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      page: props.page,
      tabs: enzymeWrapper.state().tabs,
      onTabSelected: enzymeWrapper.instance().onTabSelected,
      onTabClosed: enzymeWrapper.instance().onTabClosed,
    }, '3 - Current state should be correctly reported to component')
    assert.deepEqual(enzymeWrapper.state().tabs, [{
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selected: false,
      closable: false,
      contextCriterion: null,
    }, {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      selected: true,
      closable: true,
      contextCriterion: CriterionBuilder.buildWordTagCriterion('Hello tag'),
    }], '3 - Tabs list should be correctly computed')
    // 4 - close tag results tab (using container callbacks)
    enzymeWrapper.instance().onTabClosed(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    const props4 = {
      ...props3,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(props3.resultsContext, spiedUpdateContext.resultsContext),
    }
    enzymeWrapper.setProps(props4)
    componentWrapper = enzymeWrapper.find(TitleAndTabsComponent)
    assert.lengthOf(componentWrapper, 1, '4 - There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      page: props.page,
      tabs: enzymeWrapper.state().tabs,
      onTabSelected: enzymeWrapper.instance().onTabSelected,
      onTabClosed: enzymeWrapper.instance().onTabClosed,
    }, '4 - Current state should be correctly reported to component')
    assert.deepEqual(enzymeWrapper.state().tabs, [{
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selected: true,
      closable: false,
      contextCriterion: null,
    }], '4 - Tabs list should be correctly computed')
    // also check that context was modified back to default configuration context (ensures the component has no issue with context changes)
    assert.deepEqual(props4.resultsContext, dataContext, '4 - Should fallback on default configured state')
  })
})
