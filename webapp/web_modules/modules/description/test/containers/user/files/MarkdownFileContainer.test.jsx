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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'
import { MarkdownFileContainer } from '../../../../src/containers/user/files/MarkdownFileContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MarkdownFileContainer
 * @author Raphaël Mechali
 */
describe('[Description] Testing MarkdownFileContainer', () => {
  before(() => {
    // provide a FileReader stub
    root.FileReader = (
      class Temp {
        addEventListener = () => { }

        readAsText = () => { }
      }
    )
    testSuiteHelpers.before()
  },
  )
  after(() => {
    delete root.FileReader
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(MarkdownFileContainer)
  })
  it('support only markdown MIME type', () => {
    assert.isTrue(MarkdownFileContainer.isSupportedType({ contentType: MIME_TYPES.MARKDOWN_MIME_TYPE }), 'Markdown file type should be supported')
    assert.isFalse(MarkdownFileContainer.isSupportedType({ contentType: MIME_TYPES.PDF_MIME_TYPE }), 'PDF file type should not be supported')
    assert.isFalse(MarkdownFileContainer.isSupportedType({ contentType: MIME_TYPES.JAVASCRIPT_MIME_TYPE }), 'Javascript file type should not be supported')
    assert.isFalse(MarkdownFileContainer.isSupportedType({ contentType: '*' }), 'custom file type should not be supported')
  })
  it('should render correctly', () => {
    const props = {
      file: {
        content: {},
        contentType: MIME_TYPES.MARKDOWN_MIME_TYPE,
      },
      height: 10,
    }
    const enzymeWrapper = shallow(<MarkdownFileContainer {...props} />, { context })

    // content is not read yet, component should not be render
    assert.lengthOf(enzymeWrapper.find(MarkdownFileContentDisplayer), 0, 'Component should not be rendered while the blob content is not read')

    enzymeWrapper.instance().setState({
      fileContent: 'ABCDE',
    })
    enzymeWrapper.update()
    const componentWrapper = enzymeWrapper.find(MarkdownFileContentDisplayer)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component as blob content is now available')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      source: 'ABCDE',
      heightToFit: props.height,
    }, 'Component should define the expected properties')
  })
})
