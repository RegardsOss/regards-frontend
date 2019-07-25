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
import { UIClient } from '@regardsoss/client'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SingleSortingComponent from '../../../../../../src/components/user/results/header/options/SingleSortingComponent'
import { SingleSortingContainer } from '../../../../../../src/containers/user/results/header/options/SingleSortingContainer'
import { dataContext } from '../../../../../dumps/data.context.dump'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SingleSortingContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SingleSortingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SingleSortingContainer)
  })
  it('should render correctly when sortable', () => {
    const props = {
      moduleId: 1,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
          },
        },
      }),
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SingleSortingContainer {...props} />, { context })
    const state = enzymeWrapper.state()
    const componentWrapper = enzymeWrapper.find(SingleSortingComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      defaultSortingModel: state.defaultSortingModel,
      customSortingModel: state.customSortingModel,
      attributeSortingModels: state.attributeSortingModels,
      onSortBy: enzymeWrapper.instance().onSortBy,
    }, 'Component should define the expected properties')
    // Default state: there should be Default option and each attribute
    assert.isTrue(state.defaultSortingModel.selected, 'Default sorting model should be provided')
    assert.isNotOk(state.customSortingModel, 'There should not be the custom sorting model')
    assert.lengthOf(state.attributeSortingModels, 3, 'Each configured sortable attribute should be provided as possible sorting option')
    state.attributeSortingModels.forEach((attributeSortingModel) => {
      assert.isFalse(attributeSortingModel.selected,
        `Attribute sorting model for ${attributeSortingModel.presentationModel.label.en} should not be marked selected as default model is`)
    })
  })
  it('should render correctly when not sortable', () => {
    const props = {
      moduleId: 1,
      resultsContext: dataContext, // DATASETS forbid sorting
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SingleSortingContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SingleSortingComponent)
    assert.lengthOf(componentWrapper, 0, 'There should not be the corresponding component, as state doesn\'t allow sorting')
  })
})
