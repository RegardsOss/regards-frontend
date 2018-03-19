/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginMetaDataListComponent from '../../src/components/PluginMetaDataListComponent'
import { SecurityPluginsConfContainer } from '../../src/containers/SecurityPluginsConfContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SecurityPluginsConfContainer
* @author Sébastien Binda
*/
describe('[ADMIN STORAGE MANAGEMENT] Testing SecurityPluginsConfContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SecurityPluginsConfContainer)
  })
  it('should render correctly security plugins configuration', () => {
    const props = {
      params: {
        project: 'project',
      },
      // from mapStateToProps
      entities: {},
      // from mapDispatchToProps
      fetch: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<SecurityPluginsConfContainer {...props} />, { context })
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(PluginMetaDataListComponent).length, 1, 'There should have a PluginMetaDataListComponent rendered')
  })
})
