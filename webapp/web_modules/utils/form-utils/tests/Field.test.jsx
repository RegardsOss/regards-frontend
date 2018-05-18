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
import { expect, assert } from 'chai'
import { Field as ReduxField } from 'redux-form'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import RenderTextFiled from '../src/render/RenderTextField'
import Field from '../src/Field'

const context = buildTestContext()
// Test a components rendering
describe('[FORM UTILS] Testing FieldWithIntl', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Field)
  })
  it('should retrieve the right child.', () => {
    const props = {
      name: 'test',
      meta: {
        error: false,
      },
      component: RenderTextFiled,
    }
    const enzymeWrapper = shallow(<Field {...props} />, { context })
    const subComponent = enzymeWrapper.find(ReduxField)
    expect(subComponent).to.have.length(1)
  })
})
