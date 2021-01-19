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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Stepper } from 'material-ui/Stepper'
import OpenSearchStepperComponent from '../../../src/components/opensearch/OpenSearchStepperComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OpenSearchStepperComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(OpenSearchStepperComponent)
  })
  it('Render properly', () => {
    const props = {
      stepIndex: 1,
    }
    const enzymeWrapper = shallow(<OpenSearchStepperComponent {...props} />, { context })
    expect(enzymeWrapper.find(Stepper)).to.have.length(1)
  })
})
