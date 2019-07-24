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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SecurityDelegationListContainer } from '../../src/containers/security/SecurityDelegationListContainer'
import SecurityDelegationListComponent from '../../src/components/security/SecurityDelegationListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SecurityPluginsListContainer
* @author Sébastien Binda
*/
describe('[ADMIN STORAGE MANAGEMENT] Testing SecurityDelegationListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SecurityDelegationListContainer)
  })
  it('should render correctly security plugins configuration', () => {
    const props = {
      params: {
        project: 'project',
      },
      // from mapStateToProps
      entities: [],
      isLoading: false,
      // from mapDispatchToProps
      fetch: () => new Promise(() => { }),
      update: () => new Promise(() => { }),
      delete: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<SecurityDelegationListContainer {...props} />, { context })
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(SecurityDelegationListComponent).length, 1, 'There should have a SecurityDelegationListComponent rendered')
  })
})
