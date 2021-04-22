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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import SearchResultsContainer from '../../../../src/containers/user/tabs/results/SearchResultsContainer'
import DescriptionContainer from '../../../../src/containers/user/tabs/description/DescriptionContainer'
import TabsContentComponent from '../../../../src/components/user/tabs/TabsContentComponent'
import styles from '../../../../src/styles'
import { dataContext } from '../../../dumps/data.context.dump'
import { dataEntity } from '../../../dumps/entities.dump'
import { TabsContentContainer } from '../../../../src/containers/user/tabs/TabsContentContainer'

const context = buildTestContext(styles)

/**
 * Test TabsContentComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TabsContentComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TabsContentComponent)
  })
  const testCases = [{
    activeTabs: TabsContentContainer.ALL_TABS,
    testLabel: 'in main results context',
    resultsContext: dataContext,
  }, {
    activeTabs: TabsContentContainer.TABS_WITHOUT_TAGS_TAB,
    testLabel: 'in description  context',
    resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: [dataEntity],
          selectedIndex: 0,
        },
      },
    }),
  }, {
    activeTabs: TabsContentContainer.ALL_TABS,
    testLabel: 'in tag results context',
    resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            contextTags: [CriterionBuilder.buildWordTagCriterion('hello')],
          },
        },
      },
    }),
  }]
  testCases.forEach(({ testLabel, resultsContext, activeTabs }) => it(`should render correctly ${testLabel}`, () => {
    const { shownTabContent, hiddenTabContent } = context.moduleTheme.user.tabContent
    const props = {
      moduleId: 1,
      appName: 'app',
      project: 'project',
      resultsContext,
      activeTabs,
    }
    const enzymeWrapper = shallow(<TabsContentComponent {...props} />, { context })
    // retrieve each tab container and check they are correctly displayed / hidden
    const mainResultsContainer = enzymeWrapper.find(SearchResultsContainer).findWhere((c) => c.props().tabType === UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS)
    assert.lengthOf(mainResultsContainer, 1, 'There should be a results container for each main results')
    testSuiteHelpers.assertWrapperProperties(mainResultsContainer, {
      moduleId: props.moduleId,
      project: props.project,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext,
    }, 'Main results container properties should be correctly reported')
    if (resultsContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS) {
      assert.deepEqual(mainResultsContainer.parent().props().style, shownTabContent, 'Main results tab should be currently shown')
    } else {
      assert.deepEqual(mainResultsContainer.parent().props().style, hiddenTabContent, 'Main results tab should be currently hidden')
    }

    const descriptionContainer = enzymeWrapper.find(DescriptionContainer)
    assert.lengthOf(descriptionContainer, 1, 'There should be the description container')
    testSuiteHelpers.assertWrapperProperties(descriptionContainer, {
      moduleId: props.moduleId,
      project: props.project,
      appName: props.appName,
      resultsContext: props.resultsContext,
    }, 'Description container properties should be correctly set')
    if (resultsContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.DESCRIPTION) {
      assert.deepEqual(descriptionContainer.parent().props().style, shownTabContent, 'Description tab should be currently shown')
    } else {
      assert.deepEqual(descriptionContainer.parent().props().style, hiddenTabContent, 'Description tab should be currently hidden')
    }

    const tagResultsContainer = enzymeWrapper.find(SearchResultsContainer).findWhere((c) => c.props().tabType === UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    const hasTagTab = activeTabs.includes(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    assert.lengthOf(tagResultsContainer, hasTagTab ? 1 : 0, 'There should be a results container for each tag results')
    if (hasTagTab) {
      testSuiteHelpers.assertWrapperProperties(tagResultsContainer, {
        moduleId: props.moduleId,
        project: props.project,
        tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        resultsContext,
      }, 'Tag results container properties should be correctly reported')
      if (resultsContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS) {
        assert.deepEqual(tagResultsContainer.parent().props().style, shownTabContent, 'Tag results tab should be currently shown')
      } else {
        assert.deepEqual(tagResultsContainer.parent().props().style, hiddenTabContent, 'Tag results tab should be currently hidden')
      }
    }
  }))
})
