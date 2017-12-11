/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { spy } from 'sinon'
import Dialog from 'material-ui/Dialog'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ThemeCreateComponent } from '../../src/components/ThemeCreateComponent'

describe('[ADMIN UI THEME MANAGEMENT] Testing theme create component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeCreateComponent)
    assert.isDefined(Dialog)
  })

  it('should render a Field', () => {
    const props = {
      open: true,
      onRequestClose: spy(),
      onSubmit: spy(),
      submitting: false,
      invalid: false,
      handleSubmit: spy(),
      reset: spy(),
    }
    const options = {
      context: buildTestContext(),
    }
    const enzymeWrapper = shallow(<ThemeCreateComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Dialog)
    expect(subComponent).to.have.length(1)
  })
})
