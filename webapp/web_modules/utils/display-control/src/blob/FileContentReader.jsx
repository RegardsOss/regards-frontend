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
import root from 'window-or-global'
import HOCUtils from '../hoc/HOCUtils'

/**
 * Given a file content as blob, provides to children the file content as text.
 * It provides empty string as long as no blob is read.
 * Children receive the property as {[targetPropertyName]: string} (default targetPropertyName is 'content').
 * @author Raphaël Mechali
 */
class FileContentReader extends React.Component {
  // TODO tests!
  static propTypes = {
    /** File content as blob to read */
    // eslint-disable-next-line react/no-unused-prop-types
    blob: PropTypes.instanceOf(root.Blob || Object).isRequired,
    /** Name of the property to add into children */
    // eslint-disable-next-line react/no-unused-prop-types
    targetPropertyName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node).isRequired]).isRequired,
  }

  static defaultProps = {
    targetPropertyName: 'content',
  }

  state = {
    children: null,
    content: '',
    /** Reding index for concurrency management */
    readingIndex: 0,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param {*} oldProps previous component properties
   * @param {*} newProps next component properties
   */
  onPropertiesUpdated = (
    { blob: oldBlob, children: oldChildren, targetPropertyName: oldPropName },
    { blob, children, targetPropertyName }) => {
    if (oldBlob !== blob) {
      const readingIndex = this.state.readingIndex + 1
      // re-initialize state
      this.storeChildrenWithContent('', targetPropertyName, children, readingIndex)
      // extract file content from blob
      const reader = new FileReader()
      // callback: on done
      reader.addEventListener('loadend', () => {
        // handle only when no new reading was started
        if (this.state.readingIndex === readingIndex) {
          const content = reader.result
          this.storeChildrenWithContent(content, targetPropertyName, children)
        }
      })
      // start reading blob
      reader.readAsText(blob)
    } else if (oldPropName !== targetPropertyName || oldChildren !== children) {
      this.storeChildrenWithContent(this.state.content, targetPropertyName, children)
    }
  }

  /**
   * Stores children with resolved blob content
   * @param {string} content read blob content
   * @param {string} targetPropertyName target property name in children
   * @param {[*]]} children children list
   * @param {number} reading index (leave empty to not update)
   */
  storeChildrenWithContent(content, targetPropertyName, children, readingIndex) {
    this.setState({
      readingIndex: readingIndex || this.state.readingIndex,
      content,
      children: HOCUtils.cloneChildrenWith(children, {
        [targetPropertyName]: content,
      }),
    })
  }

  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default FileContentReader
