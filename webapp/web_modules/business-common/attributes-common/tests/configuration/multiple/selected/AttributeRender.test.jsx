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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributeRender from '../../../../src/configuration/multiple/selected/AttributeRender'
import AttributeRenderDelegate from '../../../../src/render/AttributeRender'
import styles from '../../../../src/styles'
import { attributeModelsArray, attributeModelsDictionary } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AttributeRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeRender)
  })
  it('should render correctly with an existing attribute', () => {
    const props = {
      entity: { name: 'properties.default.attr2' },
      attributeModels: attributeModelsArray,
    }
    const enzymeWrapper = shallow(<AttributeRender {...props} />, { context })
    const render = enzymeWrapper.find(AttributeRenderDelegate)
    assert.lengthOf(render, 1)
    assert.deepEqual(render.props().entity, attributeModelsDictionary[2], 'Attribute should be correctly resolved')
  })
})
