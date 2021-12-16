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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../../src/clients/ProjectUserClient'
import { ProjectUserAccessRightContainer } from '../../src/containers/ProjectUserAccessRightContainer'
import ProjectUserAccessRightComponent from '../../src/components/list/ProjectUserAccessRightComponent'

describe('[ADMIN PROJECTUSER MANAGEMENT] Testing user quota container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserAccessRightContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      project: '',
      csvLink: '',
      onRefresh: () => { },
      // from mapStateToProps
      groups: {},
      isFetchingViewData: false,
      isFetchingActions: false,
      // from mapDispatchToProps
      onDeleteAccount: () => { },
      fetchGroups: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserAccessRightContainer {...props} />)
    const subComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(subComponent, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      pageActions: projectUserActions,
      pageSelectors: projectUserSelectors,
      defaultFiltersState: ProjectUserAccessRightComponent.DEFAULT_FILTERS_STATE,
      onDeleteAccount: enzymeWrapper.instance().onDeleteAccount,
    }, 'Component should define the expected properties and callbacks')
  })
})
