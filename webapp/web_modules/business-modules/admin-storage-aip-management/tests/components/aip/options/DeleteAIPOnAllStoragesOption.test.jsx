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
import { assert } from 'chai'
import { TableSelectionModes } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteAIPOnAllStoragesOption, { HateoasIconAction } from '../../../../src/components/aip/options/DeleteAIPOnAllStoragesOption'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'


const context = buildTestContext(styles)

/**
 * Test DeleteAIPOnAllStoragesOption
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing DeleteAIPOnAllStoragesOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteAIPOnAllStoragesOption)
  })
  it('should render and invoke callback correctly', () => {
    const spiedCallbackData = {
      count: 0,
      selectionMode: null,
      entities: null,
    }
    const props = {
      entity: storedAIP,
      onDelete: (selectionMode, entities) => {
        spiedCallbackData.count += 1
        spiedCallbackData.selectionMode = selectionMode
        spiedCallbackData.entities = entities
      },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnAllStoragesOption {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(HateoasIconAction)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be icon button')
    assert.equal(iconButtonWrapper.props().onClick, enzymeWrapper.instance().onClick, 'Callback should be correctly set')
    assert.equal(iconButtonWrapper.props().title, 'aips.list.delete.files.on.all.storages.title', 'Tooltip should be internationalized')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.selectionMode, TableSelectionModes.includeSelected, 'Callback selection mode parameter should be valid')
    assert.deepEqual(spiedCallbackData.entities, [props.entity], 'Callback entity parameter should be valid')
  })
})
