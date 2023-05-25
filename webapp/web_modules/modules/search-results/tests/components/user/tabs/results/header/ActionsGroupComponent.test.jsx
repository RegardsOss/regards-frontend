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
import { TableColumnBuilder, DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ActionsGroupComponent from '../../../../../../src/components/user/tabs/results/header/ActionsGroupComponent'
import styles from '../../../../../../src/styles'
import sortableAttributes from './options/sort/sortableAttributes'

const context = buildTestContext(styles)

const presentationModels = [{ // 1- selection
  key: TableColumnBuilder.selectionColumnKey,
  visible: true,
}, { // 2 - an attribute model
  key: 'anything.else.key',
  label: {
    en: 'IDK.en',
    fr: 'IDK.fr',
  },
  visible: true,
  attributes: [
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.label),
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.id),
  ],
  enableSorting: false,
}, { // 3 - options column
  key: TableColumnBuilder.optionsColumnKey,
  visible: false,
}]

/**
 * Test ActionsGroupComponent
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing ActionsGroupComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ActionsGroupComponent)
  })
  it('should render correctly', () => {
    const props = {
      selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      enableSorting: true,
      // available sorting attributes
      sortableAttributes,

      // user and admin sorting infos
      isInInitialSorting: true,
      initialSorting: [],
      currentSorting: [],
      onApplySorting: () => { },

      presentationModels,
      onResetPresentationModels: () => { },
      onApplyPresentationModels: () => { },
    }
    const enzymeWrapper = shallow(<ActionsGroupComponent {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
  })
})
