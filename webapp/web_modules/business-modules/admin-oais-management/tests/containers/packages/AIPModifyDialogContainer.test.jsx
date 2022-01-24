/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AIPModifyDialogContainer } from '../../../src/containers/packages/AIPModifyDialogContainer'
import AIPModifyDialogComponent from '../../../src/components/packages/AIPModifyDialogComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPModifyDialogContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPModifyDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPModifyDialogContainer)
  })

  it('should render correctly', () => {
    const props = {
      onConfirmModify: () => {},
      onClose: () => {},
      fetchSelectionStorages: () => {},
      fetchSelectionTags: () => {},
      fetchSelectionCategories: () => {},
    }
    const enzymeWrapper = shallow(<AIPModifyDialogContainer {...props} />, { context })
    const flatButtonWrapper = enzymeWrapper.find(AIPModifyDialogComponent)
    assert.lengthOf(flatButtonWrapper, 1, 'There should a AIPModifyDialogComponent')
  })
})
