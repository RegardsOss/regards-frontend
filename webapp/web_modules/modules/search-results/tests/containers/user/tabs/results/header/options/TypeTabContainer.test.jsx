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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TypeTabComponent from '../../../../../../../src/components/user/tabs/results/header/options/TypeTabComponent'
import { TypeTabContainer } from '../../../../../../../src/containers/user/tabs/results/header/options/TypeTabContainer'
import styles from '../../../../../../../src/styles'
import { dataContext } from '../../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test TypeTabContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TypeTabContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TypeTabContainer)
  })

  const testCases = [{
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    initType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    targetType: DamDomain.ENTITY_TYPES_ENUM.DATA,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    initType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    targetType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    initType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    targetType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    initType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    targetType: DamDomain.ENTITY_TYPES_ENUM.DATA,
  }]
  testCases.forEach(({ tabType, initType, targetType }) => it(`should render correctly for ${targetType} when selected type is ${initType}`, () => {
    const spiedUpdateData = {
      moduleId: null,
      stateDiff: null,
    }
    const props = {
      moduleId: 1,
      type: targetType,
      tabType,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        tabs: {
          [tabType]: {
            selectedType: initType,
          },
        },
      }),
      updateResultsContext: (moduleId, stateDiff) => {
        spiedUpdateData.moduleId = moduleId
        spiedUpdateData.stateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<TypeTabContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TypeTabComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      type: targetType,
      tabType,
      resultsContext: props.resultsContext,
      onTypeSelected: enzymeWrapper.instance().onTypeSelected,
    }, 'Component should define the expected properties')
    assert.isNull(spiedUpdateData.moduleId, 'Update should not have been called yet')
    enzymeWrapper.instance().onTypeSelected()
    if (targetType === initType) {
      assert.isNull(spiedUpdateData.moduleId, 'Update should not have been called when target type is already selected')
    } else {
      assert.equal(spiedUpdateData.moduleId, props.moduleId, 'Update results context should have been called with the right module id')
      assert.isNotNull(spiedUpdateData.stateDiff, 'Update results context should have been called with state diff')
      assert.equal(spiedUpdateData.stateDiff.tabs[tabType].selectedType, targetType, 'Update results context should have been called for the right type')
    }
  }))
})
