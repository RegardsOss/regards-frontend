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
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ErrorDecoratorComponent from '../../src/error/ErrorDecoratorComponent'
import FormErrorMessage from '../../src/error/FormErrorMessage'

// Test a components rendering
describe('[FORM UTILS] Testing FormErrorMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormErrorMessage)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormErrorMessage />)
    const subComponent = enzymeWrapper.find(ErrorDecoratorComponent)
    expect(subComponent).to.have.length(1)
  })
})
