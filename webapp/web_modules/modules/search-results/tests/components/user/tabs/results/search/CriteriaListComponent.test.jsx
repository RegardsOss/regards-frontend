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
import { UIDomain } from '@regardsoss/domain'
import { ScrollArea } from '@regardsoss/adapters'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import CriterionWrapperContainer from '../../../../../../src/containers/user/tabs/results/search/CriterionWrapperContainer'
import CriteriaListComponent from '../../../../../../src/components/user/tabs/results/search/CriteriaListComponent'
import GroupTitleComponent from '../../../../../../src/components/user/tabs/results/search/GroupTitleComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'

const context = buildTestContext(styles)

/**
 * Test CriteriaListComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriteriaListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriteriaListComponent)
  })
  it('should render correctly', () => {
    const props = {
      groups: [{
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 1',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'anythingIWant',
          conf: {
            attributes: { attr1: attributes[1].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { OK: true, kos: 36 },
          requestParameters: { ok: true, q: 'afterKos: [* TO 36]' },
        }, {
          pluginId: 10,
          pluginInstanceId: 'anythingIWant2',
          conf: {
            attributes: { },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'X2', [UIDomain.LOCALES_ENUM.fr]: 'X2(FR)' },
        }],
      }, {
        showTitle: false,
        title: {
          [UIDomain.LOCALES_ENUM.en]: '',
          [UIDomain.LOCALES_ENUM.fr]: '',
        },
        criteria: [{
          pluginId: 65,
          pluginInstanceId: 'anythingIWant3',
          conf: {
            attributes: { attr1000: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
          state: { count: { exact: true, val: 26 }, error: true },
          requestParameters: { q: 'count: [* TO 25] AND [27 TO *]' },
          delayedRequestParameters: { q: 'count: 25' },
        }],
      }, {
        showTitle: true,
        title: {
          [UIDomain.LOCALES_ENUM.en]: 'Group 3',
          [UIDomain.LOCALES_ENUM.fr]: 'Groupe 3',
        },
        criteria: [{
          pluginId: 8,
          pluginInstanceId: 'oyeoye',
          conf: { // configuration
            attributes: { attr1: attributes[2].content },
          },
          label: { [UIDomain.LOCALES_ENUM.en]: 'aye', [UIDomain.LOCALES_ENUM.fr]: 'aye' },
        }],
      }],
      rootContextCriteria: [{ requestParameters: { miniParam1: 'myMiniVal1', q: 'osef:true' } }, { requestParameters: { plop: 'plouf' } }],
      onUpdatePluginState: () => {},
    }
    const enzymeWrapper = shallow(<CriteriaListComponent {...props} />, { context })
    const scrollArea = enzymeWrapper.find(ScrollArea)
    assert.lengthOf(scrollArea, 1, 'There should be the scroll area')
    // Assert each group title and criterion can be found
    const groupTitleComponents = scrollArea.find(GroupTitleComponent)
    assert.lengthOf(groupTitleComponents, props.groups.length, 'There should be a title component for each group')
    const criteriaComponents = scrollArea.find(CriterionWrapperContainer)
    let currentCriterionIndex = 0
    props.groups.forEach((group, groupIndex) => {
      const groupTitleComponent = groupTitleComponents.at(groupIndex)
      assert.deepEqual(groupTitleComponent.props().group, group, 'Group should be correctly reported')
      group.criteria.forEach((crit, criterionIndex) => {
        const criterionComponent = criteriaComponents.at(currentCriterionIndex)
        testSuiteHelpers.assertWrapperProperties(criterionComponent, {
          groupIndex,
          criterionIndex,
          criterion: group.criteria[criterionIndex],
          groups: props.groups,
          rootContextCriteria: props.rootContextCriteria,
          onUpdatePluginState: props.onUpdatePluginState,
        }, `Criterion ${groupIndex}:${criterionIndex} (overall #${currentCriterionIndex}) properties should be correctly reported`)
        currentCriterionIndex += 1
      })
    })
  })
})
