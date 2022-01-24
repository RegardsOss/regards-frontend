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
import { AdminDomain } from '@regardsoss/domain'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectUserSettingsFormContainer } from '../../src/containers/ProjectUserSettingsFormContainer'

const context = buildTestContext()

/**
 * Test ProjectUserSettingsFormContainer
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[ADMIN USER PROJECTUSER MANAGEMENT] Testing ProjectUserSettingsFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserSettingsFormContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      settings: {
        0: {
          content: {
            name: 'maxQuota',
            description: '',
            value: 100,
            defaultValue: 100,
          },
        },
        1: {
          content: {
            name: 'rateLimit',
            description: '',
            value: 10,
            defaultValue: 10,
          },
        },
        2: {
          content: {
            name: 'acceptance_mode',
            description: '',
            value: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
            defaultValue: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
          },
        },
        3: {
          content: {
            name: 'default_groups',
            description: '',
            value: [],
            defaultValue: [],
          },
        },
        4: {
          content: {
            name: 'default_role',
            description: '',
            value: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
            defaultValue: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
          },
        },
      },
      roleList: {
        REGISTERED_USER: {
          content: {
            id: 2,
            name: 'REGISTERED_USER',
            parentRole: {
              id: 1,
              name: 'PUBLIC',
            },
            isDefault: true,
            isNative: true,
            authorizedAddresses: [],
          },
        },
      },
      groupList: {
        Public: {
          content: {
            id: 1,
            name: 'Public',
            email: 'testemail',
            isPublic: true,
            isInternal: true,
          },
        },
      },
      hasErrorSettings: false,
      hasErrorRoleList: false,
      hasErrorGroupList: false,
      fetchRoleList: () => { },
      fetchGroupList: () => { },
      fetchSettings: testSuiteHelpers.getSuccessDispatchStub(),
      updateSettings: () => { },
      flushSettings: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserSettingsFormContainer {...props} />, { context })
    // check i18n
    const i18nProviderWrapper = enzymeWrapper.find(I18nProvider)
    assert.lengthOf(i18nProviderWrapper, 1, 'i18n should be provided to child component')
    // check loader wrapper
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be a loader wrapper')
    testSuiteHelpers.assertWrapperProperties(loaderWrapper, {
      isLoading: true,
      isContentError: false,
    })
  })
  it('should render correctly in error', () => {
    const props = {
      params: {
        project: 'any',
      },
      settings: {
        0: {
          content: {
            name: 'maxQuota',
            description: '',
            value: 100,
            defaultValue: 100,
          },
        },
        1: {
          content: {
            name: 'rateLimit',
            description: '',
            value: 10,
            defaultValue: 10,
          },
        },
        2: {
          content: {
            name: 'acceptance_mode',
            description: '',
            value: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
            defaultValue: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
          },
        },
        3: {
          content: {
            name: 'default_groups',
            description: '',
            value: [],
            defaultValue: [],
          },
        },
        4: {
          content: {
            name: 'default_role',
            description: '',
            value: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
            defaultValue: {
              id: 2,
              name: 'REGISTERED_USER',
              parentRole: {
                id: 1,
                name: 'PUBLIC',
              },
              isDefault: true,
              isNative: true,
              authorizedAddresses: [],
            },
          },
        },
      },
      roleList: {
        REGISTERED_USER: {
          content: {
            id: 2,
            name: 'REGISTERED_USER',
            parentRole: {
              id: 1,
              name: 'PUBLIC',
            },
            isDefault: true,
            isNative: true,
            authorizedAddresses: [],
          },
        },
      },
      groupList: {
        Public: {
          content: {
            id: 1,
            name: 'Public',
            email: 'testemail',
            isPublic: true,
            isInternal: true,
          },
        },
      },
      hasErrorSettings: true,
      hasErrorRoleList: false,
      hasErrorGroupList: false,
      fetchRoleList: () => { },
      fetchGroupList: () => { },
      fetchSettings: testSuiteHelpers.getSuccessDispatchStub(),
      updateSettings: () => { },
      flushSettings: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserSettingsFormContainer {...props} />, { context })
    // check loader wrapper
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be a loader wrapper')
    testSuiteHelpers.assertWrapperProperties(loaderWrapper, {
      isLoading: true,
      isContentError: true,
    })
  })
})
