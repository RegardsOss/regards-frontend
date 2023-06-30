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
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import RoleRenderer from '../../../../src/components/list/render/RoleRenderer'
import styles from '../../../../src/styles'
import messages from '../../../../src/i18n'

const context = buildTestContext(styles)

/**
 * Test RoleRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing RoleRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleRenderer)
  })

  const testCases = [
    // Common roles, internationalized
    ...[
      'PUBLIC',
      'REGISTERED_USER',
      'EXPLOIT',
      'ADMIN',
      'PROJECT_ADMIN',
    ].map((r) => ({ label: `the common role ${r}`, role: r, expectedMessage: messages[UIDomain.LOCALES_ENUM.en][`projectUser.list.table.role.label.${r}`] })), {
      // Custom role, should be displayed unchanged
      label: 'a custom role',
      role: 'My_CUSTOM.ROLE',
      expectedMessage: 'My_CUSTOM.ROLE',
    },

  ]

  testCases.forEach(({ label, role, expectedMessage }) => it(`should render correctly ${label}`, () => {
    const aUser = DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')
    const props = {
      entity: {
        ...aUser,
        content: {
          ...aUser.content,
          role: {
            ...aUser.content.role,
            name: role,
          },
        },
      },
    }
    // context: replace intl stub by a stub from real messages (otherwise, that test wont work as key is returned in tests)
    const localContext = {
      ...context,
      intl: {
        ...context.intl,
        formatMessage: ({ id }) => messages[UIDomain.LOCALES_ENUM.en][id] || id,
      },
    }
    shallow(<RoleRenderer {...props} />, { context: localContext })
  }))
})
