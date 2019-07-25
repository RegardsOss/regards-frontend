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
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributeRender from '../../src/render/AttributeRender'
import styles from '../../src/styles'
import { attributeModelsDictionnary } from '../dumps/AttributeModels.dump'

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
  it('should render correctly', () => {
    const props = {
      entity: attributeModelsDictionnary[2],
    }
    const enzymeWrapper = shallow(<AttributeRender {...props} />, { context })
    const renderWrapper = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(renderWrapper, 1)
    assert.equal(renderWrapper.props().value, 'attribute.render.label', 'Label value should be internationalized)')
  })
  it('should compute correctly label', () => {
    const testIntl = {
      formatMessage: ({ id }, values = {}) => id === 'attribute.render.path.join.string' ? '.' : `${values.label}/${values.path}`,
    }
    // Custom attributes
    assert.equal(AttributeRender.getRenderLabel(attributeModelsDictionnary[1], testIntl),
      'Attr1/f1.attr1', 'Simple fragment should be correctly formatted')
    assert.equal(AttributeRender.getRenderLabel(attributeModelsDictionnary[2], testIntl),
      'Attr2/attr2', 'Default fragment should not be displayed')
    assert.equal(AttributeRender.getRenderLabel(attributeModelsDictionnary[3], testIntl),
      'Attr3/attr3', 'No fragment should not be displayed')
    assert.equal(AttributeRender.getRenderLabel(attributeModelsDictionnary[4], testIntl),
      'Attr4/f4.sf4.attr4', 'Compose fragment should be correclty displayed')
    // Outside content field
    assert.equal(AttributeRender.getRenderLabel(attributeModelsDictionnary[1].content, testIntl),
      'Attr1/f1.attr1', 'Simple fragment should be correctly formatted')
  })
})
