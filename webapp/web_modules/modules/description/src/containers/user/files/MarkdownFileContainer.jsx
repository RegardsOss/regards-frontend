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
import { MIME_TYPES } from '@regardsoss/mime-types'
import { MarkdownFileContentDisplayer } from '@regardsoss/components'

/**
 * Container to resolve markdown content and displays it
 * @author Raphaël Mechali
 */
export class MarkdownFileContainer extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired, // available height for render
    // a disaplayable file with content and MIME type
    // eslint-disable-next-line react/no-unused-prop-types
    file: PropTypes.shape({ // used only in onPropertiesUpdated
      content: PropTypes.instanceOf(root.Blob || Object).isRequired, // For tests: Blob is not necessary present when loading the class
      contentType: PropTypes.string.isRequired,
    }),
  }

  /**
   * Is MIME type of file as parameter supported by this component (ie is it markdown?)
   * @param {{contentType: string}} file file to test
   * @return {boolean} true if file MIME TYPE is supported
   */
  static isSupportedType(file) {
    return file.contentType.toLowerCase() === MIME_TYPES.MARKDOWN_MIME_TYPE
    return file && file.contentType && (file.contentType.toLowerCase() === MIME_TYPES.MARKDOWN_MIME_TYPE)
  }

  state = {
    fileContent: null,
  }

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = ({ file: oldFile }, { file: newFile }) => {
    if (oldFile !== newFile) {
      // re-initialize state
      this.setState({ fileContent: null })
      // extract file content from blob
      const reader = new root.FileReader()
      // callback: on done
      reader.addEventListener('loadend', () => {
        const fileContent = reader.result
        this.setState({ fileContent })
      })
      // start reading blob
      reader.readAsText(newFile.content)
    }
  }

  render() {
    const { height } = this.props
    const { fileContent } = this.state
    if (!fileContent) { // blob not read yet
      return null
    }
    return (
      <MarkdownFileContentDisplayer
        source={fileContent}
        heightToFit={height}
      />
    )
  }
}
export default MarkdownFileContainer
