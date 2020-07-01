/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getMetadataArray } from '@regardsoss/user-metadata-common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ProjectUserFormContainer } from '../../src/containers/ProjectUserFormContainer'
import ProjectUserFormComponent from '../../src/components/ProjectUserFormComponent'

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing projectuser form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
    assert.isDefined(ProjectUserFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
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

      user: {
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
          metadata: [{
            id: 1,
            key: 'address',
            value: '9 rue des moumouttes, 65000 Chauveland',
          }], // container should also resolve non defined metadata
          role: { name: 'REGISTERED_USER' },
          permissions: [],
        },
        links: [],
      },
      // from router
      params: {
        project: 'project-1',
        // eslint-disable-next-line camelcase
        user_id: '1', // eslint wont fix: expected parameter format
      },
      passwordRules: 'Open bar password',
      // from mapDispatchToProps
      fetchPasswordRules: () => { },
      fetchPasswordValidity: () => { },
      createProjectUser: () => { },
      updateProjectUser: () => { },
      fetchRoleList: () => { },
      fetchGroupList: () => { },
      assignGroup: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    expect(subComponent).to.have.length(1)
    assert.isFunction(subComponent.prop('children'))
    assert.deepEqual(subComponent.prop('children'), enzymeWrapper.instance().getFormComponent)

    // the metadata must be defined for sub component (in V1, metadata lives separately of user as it is defined by front end)
    const metadata = enzymeWrapper.instance().getFormComponent().props.userMetadata
    assert.lengthOf(metadata, getMetadataArray().length, 'Each metadata should be provided')
    // the metadata value for field address should be defined
    const addressMetadata = metadata.find(({ key }) => key === 'address')
    assert.isDefined(addressMetadata, 'Address metadata should exist')
    assert.equal(addressMetadata.currentValue, '9 rue des moumouttes, 65000 Chauveland', 'Address metadata value should be retrieved from known model')
    // note : metadata recovering and updates are tests in user-metadata-common package
  })
})
