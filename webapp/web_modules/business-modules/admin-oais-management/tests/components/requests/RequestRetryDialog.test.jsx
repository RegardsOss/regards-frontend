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
import Dialog from 'material-ui/Dialog'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { RequestRetryDialog } from '../../../src/components/requests/RequestRetryDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestRetryDialog
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestRetryDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestRetryDialog)
  })
  it('should render correctly opened', () => {
    const props = {
      open: true,
      onConfirmRetry: () => { },
      onClose: () => { },
      severalEntitiesSelected: true,
    }
    const enzymeWrapper = shallow(<RequestRetryDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'The dialog should be opened')
    assert.lengthOf(dialogWrapper.props().actions, 2, 'There should be confirm retry and close options')
  })
  it('should render correctly closed', () => {
    const props = {
      open: false,
      onConfirmRetry: () => { },
      onClose: () => { },
      severalEntitiesSelected: true,
    }
    const enzymeWrapper = shallow(<RequestRetryDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isFalse(dialogWrapper.props().open, 'The dialog should be closed')
    assert.lengthOf(dialogWrapper.props().actions, 2, 'There should be confirm retry and close options')
  })
})
