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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import LocalURLProvider from '../../src/blob/LocalURLProvider'
import { TestBlob } from './TestBlob'

/**
 * Test LocalURLProvider
 * @author Raphaël Mechali
 */
describe('[DISPLAY CONTROL] Testing LocalURLProvider', () => {
  before(() => {
    testSuiteHelpers.before()
    root.URL = {
      createObjectURL: (testBlob) => `myTestFolder/${testBlob.text}`,
      revokeObjectURL: () => {},
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.URL
  })

  it('should exists', () => {
    assert.isDefined(LocalURLProvider)
  })
  it('should render correctly, providing an URL to children for each blob it receives as property', () => {
    // 1. Test with an initial blob
    const props = {
      blob: new TestBlob('test1'),
      targetPropertyName: 'myBlobURL',
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <LocalURLProvider {...props}>
        <TestComponent myProp="abc" />
      </LocalURLProvider>)
    let testComp = enzymeWrapper.find(TestComponent)
    assert.lengthOf(testComp, 1, '(1) There should be test component')
    testSuiteHelpers.assertWrapperProperties(testComp, {
      myProp: 'abc',
      myBlobURL: 'myTestFolder/test1',
    }, '(1) Children self properties should be preserved and URL target property should be added')
    // 2. Change blob and check URL is correctly updated
    enzymeWrapper.setProps({
      ...props,
      blob: new TestBlob('test2'),
    })
    testComp = enzymeWrapper.find(TestComponent)
    assert.lengthOf(testComp, 1, '(2) There should be test component')
    testSuiteHelpers.assertWrapperProperties(testComp, {
      myProp: 'abc',
      myBlobURL: 'myTestFolder/test2',
    }, '(2) Children self properties should be preserved and URL target property should be added')
  })
})
