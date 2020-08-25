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
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AbortAllRequestsDialog } from '../../../src/components/requests/AbortAllRequestsDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AbortAllRequestsDialog
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AbortAllRequestsDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AbortAllRequestsDialog)
  })
  it('should render correctly open', () => {
    const props = {
      open: true,
      onConfirmAbort: () => {},
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<AbortAllRequestsDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      title: 'oais.requests.confirm.abort.title',
      open: true,
    })
    const dialogAsText = dialogWrapper.debug()
    assert.include(dialogAsText, 'oais.requests.confirm.abort.message', 'Operation message should be displayed')
    assert.include(dialogAsText, 'oais.requests.confirm.abort.warning', 'Specific warning should be displayed')
  })
  it('should render correctly closed', () => {
    const props = {
      open: false,
      onConfirmAbort: () => {},
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<AbortAllRequestsDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    assert.isFalse(dialogWrapper.props().open)
  })
})
