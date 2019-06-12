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
import { AcquisitionFileInfoComponent } from '../../../src/components/configuration/AcquisitionFileInfoComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AcquisitionFileInfoComponent
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionFileInfoComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionFileInfoComponent)
  })
  it('should render correctly', () => {
    const props = {
      name: 'firstFileInfo',
    }
    shallow(<AcquisitionFileInfoComponent {...props} />, { context })
    // XXX-Later versions : Enzym do not handle react 16 feature that allow to render an Array of components.
    // const fields = enzymeWrapper.find(Field)
    // assert.equal(enzymeWrapper.find(fields).length, 5, 'The AcquisitionFileInfoComponent should contain 5 Field')
    // assert.isTrue(fields.find({ name: `${props.name}.comment` }).exists(), 'The comment Field is missing')
    // assert.isTrue(fields.find({ name: `${props.name}.mandatory` }).exists(), 'The mandatory Field is missing')
    // assert.isTrue(fields.find({ name: `${props.name}.scanPlugin` }).exists(), 'The scanPlugin Field is missing')
    // assert.isTrue(fields.find({ name: `${props.name}.mimeType` }).exists(), 'The mimeType Field is missing')
    // assert.isTrue(fields.find({ name: `${props.name}.dataType` }).exists(), 'The dataType Field is missing')
  })
})
