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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../../src/clients/ProjectUserClient'
import { ProjectUserAccountContainer } from '../../src/containers/ProjectUserAccountContainer'
import ProjectUserAccountComponent from '../../src/components/list/ProjectUserAccountComponent'

describe('[ADMIN PROJECTUSER MANAGEMENT] Testing user account container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserAccountContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      project: 'test',
      csvLink: '',
      onRefresh: () => { },
      // from mapStateToProps
      origins: {},
      isFetchingViewData: false,
      isFetchingActions: false,
      roleList: {},
      // from mapDispatchToProps
      onDeleteAccount: () => { },
      onValidateProjectUser: () => { },
      onDenyProjectUser: () => { },
      onSendEmailConfirmation: () => { },
      onDisableProjectUser: () => { },
      onEnableProjectUser: () => { },
      fetchOrigins: () => { },
      throwError: () => { },
      fetchRoleList: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserAccountContainer {...props} />)
    const subComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(subComponent, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      pageActions: projectUserActions,
      pageSelectors: projectUserSelectors,
      defaultFiltersState: ProjectUserAccountComponent.DEFAULT_FILTERS_STATE,
      onDeleteAccount: enzymeWrapper.instance().onDeleteAccount,
      onEnable: enzymeWrapper.instance().onEnableProjectUser,
      onValidate: enzymeWrapper.instance().onValidateProjectUser,
      onDeny: enzymeWrapper.instance().onDenyProjectUser,
      onDisable: enzymeWrapper.instance().onDisableProjectUser,
      onSendEmailConfirmation: enzymeWrapper.instance().onSendEmailConfirmation,
    }, 'Component should define the expected properties and callbacks')
  })
})
