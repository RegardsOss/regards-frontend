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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DropDownButton } from '@regardsoss/components'
import { storage } from '@regardsoss/units'
import { ScaleSelectorComponent } from '../../../src/components/user/ScaleSelectorComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ScaleSelectorComponent
* @author Raphaël Mechali
*/
describe('[Storage Monitoring] Testing ScaleSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ScaleSelectorComponent)
  })
  it('should render correctly', () => {
    const props = {
      scale: storage.StorageUnitScale.bytesScale,
      onUnitScaleChanged: () => { },
    }
    const enzymeWrapper = shallow(<ScaleSelectorComponent {...props} />, { context })
    const dropDownWrapper = enzymeWrapper.find(DropDownButton)
    // parent container callback should be correctly reported
    assert.equal(dropDownWrapper.props().onChange, props.onUnitScaleChanged, 'Callback is not reported is sub component!')
    // current scale should be the value of the drop down menu
    assert.equal(dropDownWrapper.props().value, props.scale, 'Current avlue is not reported is sub component!')
  })
})
