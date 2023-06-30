/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import FileContentReader from '../../src/blob/FileContentReader'
import { TestFileReader } from './TestFileReader'

/**
 * Test FileContentReader
 * @author Raphaël Mechali
 */
describe('[DISPLAY CONTROL] Testing FileContentReader', () => {
  before(() => {
    testSuiteHelpers.before()
    root.FileReader = TestFileReader
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.FileReader
  })

  it('should exists', () => {
    assert.isDefined(FileContentReader)
  })
  // eslint-disable-next-line mocha/no-skipped-tests
  xit('should render correctly, providing content read to children', (done) => {
    const props = {
      blob: new Blob(),
      targetPropertyName: 'readBlobValue',
      // eslint-disable-next-line react/no-unused-prop-types
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    }
    // 1 - Check while reading
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <FileContentReader {...props}>
        <TestComponent aProp="anything" />
      </FileContentReader>)
    let testComponent = enzymeWrapper.find(TestComponent)
    assert.lengthOf(testComponent, 1, '(1) There should be TestComponent')
    testSuiteHelpers.assertWrapperProperties(testComponent, {
      aProp: 'anything',
      readBlobValue: '',
    }, '(1) Component initial properties should be preserved. While reading, content should be empty')
    // 2 - Check on reading complete
    testSuiteHelpers.getRealTimeout(() => {
      testComponent = enzymeWrapper.find(TestComponent)
      assert.lengthOf(testComponent, 1, '(2) There should be TestComponent')
      testSuiteHelpers.assertWrapperProperties(testComponent, {
        aProp: 'anything',
        readBlobValue: 'blablabus',
      }, '(2) Component initial properties should be preserved. After reading, the read content should be provided')
      done()
    }, 10) // wait for file reading promise to finish
  })
})
