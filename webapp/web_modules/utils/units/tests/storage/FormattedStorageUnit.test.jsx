/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FormattedStorageUnit } from '../../src/storage/FormattedStorageUnit'
import { StorageUnitScale } from '../../src/storage/StorageUnitScale'
import messages from '../../src/storage/i18n'

const context = buildTestContext()

/**
* Test FormattedStorageUnit
* @author Raphaël Mechali
*/
describe('[Units] Testing FormattedStorageUnit', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormattedStorageUnit)
  })

  // Simply test all units (ignore doubles)
  const allENMsg = keys(messages.en)
  const allFRMsg = keys(messages.fr)
  StorageUnitScale.all
    .forEach((scale) => scale.units
      .forEach((unit, index) => it(`should render correctly unit "${unit.symbol}"`, () => {
        const wrapper = shallow(<FormattedStorageUnit unit={unit} />, { context })
        assert.include(wrapper.debug(), unit.messageKey)
        assert.include(allENMsg, unit.messageKey, 'EN message for unit should exist')
        assert.include(allFRMsg, unit.messageKey, 'FR message for unit should exist')
      })))
})
