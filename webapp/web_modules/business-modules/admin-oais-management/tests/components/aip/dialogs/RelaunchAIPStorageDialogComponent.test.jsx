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
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RelaunchAIPStorageDialogComponent from '../../../../src/components/aip/dialogs/RelaunchAIPStorageDialogComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RelaunchAIPStorageDialogComponent
 * @author Kévin Picart
 */
describe('[OAIS AIP MANAGEMENT] Testing RelaunchAIPStorageDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RelaunchAIPStorageDialogComponent)
  })
  it('should render correctly', () => {
    const props = {
      onRelaunch: () => {},
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<RelaunchAIPStorageDialogComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be 1 dialog')
  })
})
