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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EditColumnsSettingsComponent from '../../../../../../src/components/user/results/header/options/columns/EditColumnsSettingsComponent'
import { EditColumnsSettingsContainer } from '../../../../../../src/containers/user/results/header/options/EditColumnsSettingsContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { documentsContext } from '../../../../../dumps/documents.context.dump'


const context = buildTestContext(styles)

/**
 * Test EditColumnsSettingsContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing EditColumnsSettingsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditColumnsSettingsContainer)
  })
  it('should render correctly in data context (table mode)', () => {
    const props = {
      moduleId: 1,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
          },
        },
      }),
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(EditColumnsSettingsComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      presentationModels: props.resultsContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE].presentationModels,
      onApply: enzymeWrapper.instance().onApply,
      onReset: enzymeWrapper.instance().onReset,
    }, 'Component should define the expected properties')
  })
  it('should render correctly in document context (table mode)', () => {
    const props = {
      moduleId: 1,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(documentsContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
          },
        },
      }),
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<EditColumnsSettingsContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(EditColumnsSettingsComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      presentationModels: props.resultsContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE].presentationModels,
      onApply: enzymeWrapper.instance().onApply,
      onReset: enzymeWrapper.instance().onReset,
    }, 'Component should define the expected properties')
  })
})