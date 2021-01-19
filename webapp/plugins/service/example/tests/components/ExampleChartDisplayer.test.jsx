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
import ExampleChartDisplayer from '../../src/components/ExampleChartDisplayer'

/* build the test context (fake i18n, fake styles) for shallow renderering.
When working with externalized styles, the styles object imported from file can be added as first method
parameter */
const context = buildTestContext()

/**
* Test ExampleChartDisplayer. Shows how to test a react component in REGARDS
* @author Raphaël Mechali
*/
describe('[Service example] Testing ExampleChartDisplayer', () => {
  // this will set the test context, before tests are called. It expects a method
  // by default, testSuiteHelpers.before redirects console error to be able catching the react component properties
  // warning and force the test to fail when it happens
  before(testSuiteHelpers.before)
  // must reset test environement to its defaults
  after(testSuiteHelpers.after)

  // the component should exist
  it('should exists', () => {
    assert.isDefined(ExampleChartDisplayer)
  })
  // main test case: simple rendering test, verifying there is no warning
  it('should render correctly', () => {
    // the component should render correctly with expected properties
    const props = {
      beforeDateCount: 1,
      afterDateCount: 5,
      unknown: 2,
    }
    // shallow rendering (here, we have nothing more to test)
    shallow(<ExampleChartDisplayer {...props} />, { context })
  })
})
