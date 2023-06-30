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
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MaxQuotaDialogComponent from '../../../../src/components/list/dialog/MaxQuotaDialogComponent'
import MaxQuotaFormComponent from '../../../../src/components/list/dialog/MaxQuotaFormComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MaxQuotaDialogComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing MaxQuotaDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MaxQuotaDialogComponent)
  })

  it('should render correctly open', () => {
    const props = {
      open: true,
      user: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      quotaWarningCount: 50,
      onClose: () => {},
      onConfirm: () => {},
    }
    const enzymeWrapper = shallow(<MaxQuotaDialogComponent {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: 'projectUser.list.edit.quota.dialog.title',
      open: true,
      modal: false,
      onRequestClose: props.onClose,
    }, 'There should be the dialog box')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, MaxQuotaFormComponent, {
      user: props.user,
      quotaWarningCount: props.quotaWarningCount,
      onClose: props.onClose,
      onSubmit: props.onConfirm,
    }, 'There should be form component')
  })
  it('should render correctly closed', () => {
    const props = {
      open: false,
      user: null,
      quotaWarningCount: 50,
      onClose: () => {},
      onConfirm: () => {},
    }
    const enzymeWrapper = shallow(<MaxQuotaDialogComponent {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: 'projectUser.list.edit.quota.dialog.title',
      open: false,
      modal: false,
      onRequestClose: props.onClose,
    }, 'There should be the dialog box')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, MaxQuotaFormComponent, {
      user: props.user,
      quotaWarningCount: props.quotaWarningCount,
      onClose: props.onClose,
      onSubmit: props.onConfirm,
    }, 'There should be form component')
  })
})
