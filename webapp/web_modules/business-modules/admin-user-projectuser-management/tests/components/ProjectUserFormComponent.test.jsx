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
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { getMetadataArray, MetadataField } from '@regardsoss/user-metadata-common'
import { ShowableAtRender } from '@regardsoss/components'
import { ProjectUserFormComponent } from '../../src/components/ProjectUserFormComponent'


const context = buildTestContext()

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing projectuser form component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentUser: {
        content: {
          id: 1,
          email: 'mon@adresse.em',
          lastUpdate: {
            date: { year: '2017', month: '1', day: '9' },
            time: {
              hour: '15', minute: '46', second: '12', nano: '453000000',
            },
          },
          status: 'WAITING_ACCESS',
          metadata: [], // leaving metadata blank (cannot test here the values)
          role: { name: 'REGISTERED_USER' },
          permissions: [],
        },
        links: [],
      },
      userMetadata: getMetadataArray(),
      roleList: {
        PUBLIC: {
          content: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          links: [],
        },
      },
      groupList: {
        AG1: {
          content: {
            id: 1,
            name: 'AG1',
            users: [{ email: 'francois.durant@test.fr' }, { email: 'mon@adresse.em' }],
            accessRights: [],
            isPrivate: true,
          },
          links: [],
        },
        AG2: {
          content: {
            id: 2, name: 'AG2', users: [], accessRights: [], isPrivate: true,
          },
          links: [],
        },
      },
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onSubmit: () => { },
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserFormComponent {...props} />, { context })
    // field count : 7 for account
    expect(enzymeWrapper.find(Field)).to.have.length(7)
    // Metadata field count: 1 for each metadata model (hold by front end in V1)
    expect(enzymeWrapper.find(MetadataField)).to.have.length(getMetadataArray().length)

    const showableComps = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableComps.at(0).props().show, 'We are editing a user, re use account check box should be hidden')
    assert.isFalse(showableComps.at(1).props().show, 'We are editing a user, The account fields should be hidden')
  })

  it('should render create form', () => {
    const props = {
      userMetadata: getMetadataArray(), // also provide metadata for new users
      roleList: {
        PUBLIC: {
          content: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          links: [],
        },
      },
      groupList: {
        AG1: {
          content: {
            id: 1,
            name: 'AG1',
            users: [{ email: 'francois.durant@test.fr' }, { email: 'mon@adresse.em' }],
            accessRights: [],
            isPrivate: true,
          },
          links: [],
        },
        AG2: {
          content: {
            id: 2, name: 'AG2', users: [], accessRights: [], isPrivate: true,
          },
          links: [],
        },
      },
      passwordRules: '',
      fetchPasswordValidity: () => { },
      onSubmit: () => { },
      backUrl: 'some/url',
      // from Redux Form
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserFormComponent {...props} />, { context, lifecycleExperimental: true })
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(7)
    let showableComps = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showableComps.at(0).props().show, 'We are creating a user, re use account check box should be visible')
    assert.isTrue(showableComps.at(1).props().show, 'The account fields should be visible')

    // Test if it hides Fields when using an existing REGARDS account
    enzymeWrapper.setProps({ useExistingAccount: true })
    showableComps = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showableComps.at(0).props().show, 'We are creating a user, re use account check box should be visible')
    assert.isFalse(showableComps.at(1).props().show, 'The account fields should be visible')
  })
})
