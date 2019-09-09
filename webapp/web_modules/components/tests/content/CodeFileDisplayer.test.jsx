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
import root from 'window-or-global'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AceEditorAdapter } from '@regardsoss/adapters'
import CodeFileDisplayer from '../../src/content/CodeFileDisplayer'
import styles from '../../src/content/styles/styles'
import { TestBlob } from './TestBlob'
import { TestFileReader } from './TestFileReader'

const context = buildTestContext(styles)

/**
* Tests CodeFileDisplayer
* @author Raphaël Mechali
*/
describe('[Components] Testing CodeFileDisplayer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.Blob = TestBlob
    root.FileReader = TestFileReader
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.Blob
    delete root.FileReader
  })

  const testCases = [{
    file: {
      content: `
        a {
          color: red;
        }`,
      contentType: 'text/css',
    },
  }, {
    file: {
      content: `
        function a(){
          return { color: red, sizes: [] }
        }`,
      contentType: 'application/js',
    },
  }, {
    file: {
      content: `
        {
          "color": "red",
          "sizes": []
        }`,
      contentType: 'application/json',
    },
  }, {
    file: {
      content: `
      <root>
        <color>red</color>
        <sizes/>
      </root>`,
      contentType: 'application/xml',
    },
  },
  ]

  it('should exists', () => {
    assert.isDefined(CodeFileDisplayer)
  })

  testCases.forEach(({ file: { content, contentType } }) => it(`Should render correctly for file type ${contentType}`, () => {
    const render = shallow(<CodeFileDisplayer content={content} contentType={contentType} />, { context })
    const editor = render.find(AceEditorAdapter)
    assert.lengthOf(editor, 1, `There should be one editor to show content (${contentType})`)
    assert.equal(editor.props().value, content, `The editor value should be file content (${contentType})`)
  }))
})
