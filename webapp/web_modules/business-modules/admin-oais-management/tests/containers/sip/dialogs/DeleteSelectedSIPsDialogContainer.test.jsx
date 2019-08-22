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
import DeleteSelectedSIPsDialogComponent from '../../../../src/components/sip/dialogs/DeleteSelectedSIPsDialogComponent'
import { DeleteSelectedSIPsDialogContainer } from '../../../../src/containers/sip/dialogs/DeleteSelectedSIPsDialogContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DeleteSelectedSIPsDialogContainer
 * @author Kévin Picart
 */
describe('[OAIS MANAGEMENT] Testing DeleteSelectedSIPsDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteSelectedSIPsDialogContainer)
  })
  it('should render correctly', () => {
    const props = {
      sipSelectionMode: 'include.selected',
      toggleSIPs: [],
      currentFilters: {},
      onClose: () => {}, // close dialog
      onRefresh: () => {}, // refresh table content
      sendDeleteSelectedSIPs: () => {},
      sendDeleteSIPsByQuery: () => {},
    }
    const enzymeWrapper = shallow(<DeleteSelectedSIPsDialogContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteSelectedSIPsDialogComponent)
    const wrapperInstance = enzymeWrapper.instance()
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onDelete: wrapperInstance.onDelete,
      onClose: props.onClose,
    }, 'Component should define the expected properties')
  })
})
