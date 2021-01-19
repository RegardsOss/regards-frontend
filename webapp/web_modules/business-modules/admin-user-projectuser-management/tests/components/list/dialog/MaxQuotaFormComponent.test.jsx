/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import UnlimitedIcon from 'mdi-material-ui/Infinity'
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { assert } from 'chai'
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QuotaInfoConstants } from '@regardsoss/entities-common'
import { Field, RenderTextField } from '@regardsoss/form-utils'
import { MaxQuotaFormComponent } from '../../../../src/components/list/dialog/MaxQuotaFormComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MaxQuotaFormComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing MaxQuotaFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MaxQuotaFormComponent)
  })
  const aUser = DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')
  const testCases = [{
    label: 'with invalid input (infinity from current values)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          maxQuota: QuotaInfoConstants.UNLIMITED,
        },
      },
      editedMaxQuota: 'XXX',
      invalid: true,
    },
    expected: {
      submitDisabled: true,
      icon: { visible: true, Constructor: UnlimitedIcon, style: context.moduleTheme.usersList.quotaDialog.form.unlimitedIcon },
      remainingQuotaValue: 'projectUser.list.edit.quota.dialog.remaining.quota.unlimited',
    },
  }, {
    label: 'with invalid input (idle quota status from current values)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 18,
          maxQuota: 2000,
        },
      },
      editedMaxQuota: 'XXX',
      invalid: true,
    },
    expected: {
      submitDisabled: true,
      icon: { visible: false },
      remainingQuotaValue: '1982',
    },
  }, {
    label: 'with invalid input (warning from current values)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 18,
          maxQuota: 20,
        },
      },
      editedMaxQuota: 'XXX',
      invalid: true,
    },
    expected: {
      submitDisabled: true,
      icon: { visible: true, Constructor: QuotaStatusIcon, style: context.moduleTheme.usersList.quotaDialog.form.warningIcon },
      remainingQuotaValue: '2',
    },
  }, {
    label: 'with invalid input (consumed from current values)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 28,
          maxQuota: 20,
        },
      },
      editedMaxQuota: 'XXX',
      invalid: true,
    },
    expected: {
      submitDisabled: true,
      icon: { visible: true, Constructor: QuotaStatusIcon, style: context.moduleTheme.usersList.quotaDialog.form.consumedIcon },
      remainingQuotaValue: '0',
    },
  }, {
    label: 'with valid input (infinity from form)',
    props: {
      user: aUser,
      editedMaxQuota: '-1',
      invalid: false,
    },
    expected: {
      submitDisabled: false,
      icon: { visible: true, Constructor: UnlimitedIcon, style: context.moduleTheme.usersList.quotaDialog.form.unlimitedIcon },
      remainingQuotaValue: 'projectUser.list.edit.quota.dialog.remaining.quota.unlimited',
    },
  }, {
    label: 'with valid input (idle quota status from form)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 10,
        },
      },
      editedMaxQuota: '200',
      invalid: false,
    },
    expected: {
      submitDisabled: false,
      icon: { visible: false },
      remainingQuotaValue: '190',
    },
  }, {
    label: 'with valid input (warning from form)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 18,
        },
      },
      editedMaxQuota: '30',
      invalid: false,
    },
    expected: {
      submitDisabled: false,
      icon: { visible: true, Constructor: QuotaStatusIcon, style: context.moduleTheme.usersList.quotaDialog.form.warningIcon },
      remainingQuotaValue: '12',
    },
  }, {
    label: 'with valid input (consumed from form)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 28,
        },
      },
      editedMaxQuota: '15',
      invalid: false,
      pristine: false,
    },
    expected: {
      submitDisabled: false,
      icon: { visible: true, Constructor: QuotaStatusIcon, style: context.moduleTheme.usersList.quotaDialog.form.consumedIcon },
      remainingQuotaValue: '0',
    },
  }, {
    label: 'pristine (cannot save)',
    props: {
      user: {
        ...aUser,
        content: {
          ...aUser.content,
          currentQuota: 0,
        },
      },
      editedMaxQuota: '500',
      invalid: false,
      pristine: true,
    },
    expected: {
      submitDisabled: true,
      icon: { visible: false },
      remainingQuotaValue: '500',
    },
  }]

  testCases.forEach(({ label, props: testProps, expected }) => it(`should render correctly ${label}`, () => {
    const submitFunction = () => {}
    const props = {
      user: aUser,
      quotaWarningCount: 50,
      onClose: () => {},
      onSubmit: () => {},
      editedMaxQuota: '',
      pristine: false,
      invalid: false,
      initialize: () => {},
      handleSubmit: () => submitFunction,
      ...testProps,
    }
    //DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')
    const enzymeWrapper = shallow(<MaxQuotaFormComponent {...props} />, { context })

    // A - Check fields
    // Check max quota field
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Field, {
      name: 'maxQuota',
      type: 'text',
      label: 'projectUser.list.edit.quota.dialog.max.quota.field',
      component: RenderTextField,
      validate: MaxQuotaFormComponent.MAX_QUOTA_VALIDATORS,
    }, 'there should be maxQuota redux field')
    // Check current quota field
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TextField, {
      id: 'currentQuota',
      value: props.user.content.currentQuota.toString(),
      floatingLabelText: 'projectUser.list.edit.quota.dialog.current.quota.field',
    }, 'there should be current quota textfield')
    // Check remaining quota field
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TextField, {
      id: 'remainingQuota',
      value: expected.remainingQuotaValue,
      floatingLabelText: 'projectUser.list.edit.quota.dialog.remaining.quota.field',
    }, 'there should be remaining quota textfield')

    // B - Check summary icon
    if (expected.icon.visible) {
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, expected.icon.Constructor, {
        style: expected.icon.style,
      }, 'there should be expected icon')
    } else {
      testSuiteHelpers.assertNotComp(enzymeWrapper, UnlimitedIcon, 'Unlimited icon should not be displayed')
      testSuiteHelpers.assertNotComp(enzymeWrapper, QuotaStatusIcon, 'Quota status icon should not be displayed')
    }
    // C - Check buttons
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, FlatButton, {
      label: 'projectUser.list.edit.quota.dialog.cancel',
      onClick: props.onClose,
    }, 'There should be cancel button')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, FlatButton, {
      label: 'projectUser.list.edit.quota.dialog.confirm',
      disabled: expected.submitDisabled,
      onClick: submitFunction,
    }, 'There should be confirm button, in expected state')
  }))
})
