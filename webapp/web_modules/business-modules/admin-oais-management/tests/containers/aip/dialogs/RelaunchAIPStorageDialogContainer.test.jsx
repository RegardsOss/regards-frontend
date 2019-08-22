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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RelaunchAIPStorageDialogComponent from '../../../../src/components/aip/dialogs/RelaunchAIPStorageDialogComponent'
import { RelaunchAIPStorageDialogContainer } from '../../../../src/containers/aip/dialogs/RelaunchAIPStorageDialogContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RelaunchAIPStorageDialogContainer
 * @author Kévin Picart
 */
describe('[OAIS MANAGEMENT] Testing RelaunchAIPStorageDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RelaunchAIPStorageDialogContainer)
  })
  it('should render correctly', () => {
    const props = {
      aipSelectionMode: 'include.selected',
      toggleAIPs: [],
      currentFilters: {},
      onClose: () => {}, // close dialog
      onRefresh: () => {}, // refresh table content
      sendRelaunchSelectedAIPs: () => {},
      sendRelaunchAIPsByQuery: () => {},
    }
    const enzymeWrapper = shallow(<RelaunchAIPStorageDialogContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(RelaunchAIPStorageDialogComponent)
    const wrapperInstance = enzymeWrapper.instance()
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onRelaunch: wrapperInstance.onRelaunch,
      onClose: props.onClose,
    }, 'Component should define the expected properties')
  })
})
