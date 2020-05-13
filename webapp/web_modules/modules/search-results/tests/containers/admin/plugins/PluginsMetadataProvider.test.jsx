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
import { PluginsMetadataProvider } from '../../../../src/containers/admin/plugins/PluginsMetadataProvider'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test PluginsMetadataProvider
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing PluginsMetadataProvider', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginsMetadataProvider)
  })
  it('should render correctly', () => {
    const props = {
      // TODO props
    }
    assert.fail('Implement me!')
    const enzymeWrapper = shallow(<PluginsMetadataProvider {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(PluginsMetadataProvider.testComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
    // TODO
    }, 'Component should define the expected properties')
  })
})
