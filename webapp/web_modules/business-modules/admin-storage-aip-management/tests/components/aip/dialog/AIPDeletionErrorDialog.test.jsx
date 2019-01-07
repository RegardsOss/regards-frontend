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
import Dialog from 'material-ui/Dialog'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPDeletionErrorDialog from '../../../../src/components/aip/dialogs/AIPDeletionErrorDialog'
import styles from '../../../../src/styles'
import { someDeletionErrors } from '../../../dumps/DeletionErrors.dump'

const context = buildTestContext(styles)

/**
 * Test AIPDeletionErrorDialog
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPDeletionErrorDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPDeletionErrorDialog)
  })
  it('should render correctly hidden', () => {
    const props = {
      show: false,
      errors: [],
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<AIPDeletionErrorDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    assert.isFalse(dialogWrapper.props().open)
  })
  it('should render correctly opened with errors', () => {
    const props = {
      show: true,
      errors: someDeletionErrors,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<AIPDeletionErrorDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    assert.isTrue(dialogWrapper.props().open)
    assert.lengthOf(enzymeWrapper.find('li'), props.errors.length, 'There should be one message for each error')
  })
})
