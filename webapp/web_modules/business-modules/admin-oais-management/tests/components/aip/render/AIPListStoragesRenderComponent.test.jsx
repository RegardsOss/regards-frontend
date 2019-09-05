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
import { StringArrayValueRender } from '@regardsoss/components'
import AIPListStoragesRenderComponent from '../../../../src/components/aip/render/AIPListStoragesRenderComponent'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'
import { storage1, storage2 } from '../../../dumps/DataStorages.dump'

const context = buildTestContext(styles)

/**
 * Test AIPListStoragesRenderComponent
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPListStoragesRenderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListStoragesRenderComponent)
  })
  it('should render correctly', () => {
    const props = {
      entity: storedAIP,
      dataStorages: [storage2, storage1],
    }
    const enzymeWrapper = shallow(<AIPListStoragesRenderComponent {...props} />, { context })
    const delegateRenderWrapper = enzymeWrapper.find(StringArrayValueRender)
    assert.lengthOf(delegateRenderWrapper, 1, 'There should be delegate render')
    assert.deepEqual(delegateRenderWrapper.props().value, ['storage1', 'storage2'], 'storage labels should be correctly provided (and sorted) to delegate render')
  })
})
