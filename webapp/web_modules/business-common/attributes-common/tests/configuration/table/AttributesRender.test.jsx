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
import { StringArrayValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributesRender from '../../../src/configuration/table/AttributesRender'
import styles from '../../../src/styles'
import { attributeModelsArray } from '../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AttributesRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesRender)
  })
  it('should render correctly with server and standard attributes', () => {
    const props = {
      entity: { attributes: [{ name: 'properties.default.attr2' }, { name: 'label' }] },
      attributeModels: attributeModelsArray,
    }
    const enzymeWrapper = shallow(<AttributesRender {...props} />, { context })
    const arrayRender = enzymeWrapper.find(StringArrayValueRender)
    assert.lengthOf(arrayRender, 1, 'There should be delegate array render')
    assert.deepEqual(arrayRender.props().value, ['attribute.render.label', 'attribute.render.label'], 'Attributes labels should be internationalized')
  })
})
