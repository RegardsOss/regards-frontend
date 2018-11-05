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
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributeRender from '../../../../src/configuration/multiple/available/AttributeRender'
import styles from '../../../../src/styles'
import { attributeModelsDictionnary } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AttributeRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing multiple.available.AttributeRender', () => {
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
    assert.equal(renderWrapper.props().value, attributeModelsDictionnary[2].content.label, 'Label value should be correctly reported (no fragment in that case)')
  })
})
