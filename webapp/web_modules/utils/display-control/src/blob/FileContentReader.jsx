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
import root from 'window-or-global'
import isEqual from 'lodash/isEqual'
import HOCUtils from '../hoc/HOCUtils'

/**
 * Given a file content as blob, provides to children the file content as text.
 * It provides empty string as long as no blob is read.
 * Children receive the property as {[targetPropertyName]: string} (default targetPropertyName is 'content').
 * @author Raphaël Mechali
 */
class FileContentReader extends React.Component {
  static propTypes = {
    /** File content as blob to read */
    // eslint-disable-next-line react/no-unused-prop-types
    blob: PropTypes.instanceOf(Blob).isRequired,
    /** Name of the property to add into children */
    // eslint-disable-next-line react/no-unused-prop-types
    targetPropertyName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    // other properties should be reported to children
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
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param {*} oldProps previous component properties
   * @param {*} newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      blob: oldBlob, children: oldChildren, targetPropertyName: oldPropName, ...oldOtherProperties
    } = oldProps
    const {
      blob, children, targetPropertyName, ...otherProperties
    } = newProps
    if (!isEqual(oldBlob, blob)) {
      // XXX-BUG: when the browser changes, children type is lost (REACT bug, can be seen using RunCatalogPluginServiceContainer)
      const readingIndex = this.state.readingIndex + 1
      // re-initialize state
      this.storeChildrenWithContent('', targetPropertyName, children, otherProperties, readingIndex)
      // extract file content from blob
      const reader = new root.FileReader()
      // callback: on done
      reader.addEventListener('loadend', () => {
        // handle only when no new reading was started
        if (this.state.readingIndex === readingIndex) {
          const content = reader.result
          this.storeChildrenWithContent(content, targetPropertyName, children, otherProperties)
        }
      })
      // start reading blob
      reader.readAsText(blob)
    } else if (oldPropName !== targetPropertyName || oldChildren !== children || !isEqual(oldOtherProperties, otherProperties)) {
      this.storeChildrenWithContent(this.state.content, targetPropertyName, otherProperties, children, otherProperties)
    }
  }

  /**
   * Stores children with resolved blob content
   * @param {string} content read blob content
   * @param {string} targetPropertyName target property name in children
   * @param {[*]]} children children list
   * @param {*} otherProperties other properties to be reported to children
   * @param {number} readingIndex (leave empty to not update)
   */
  storeChildrenWithContent(content, targetPropertyName, children, otherProperties, readingIndex) {
    this.setState({
      readingIndex: readingIndex || this.state.readingIndex,
      content,
      children: HOCUtils.cloneChildrenWith(children, {
        [targetPropertyName]: content,
        ...otherProperties,
      }),
    })
  }

  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default FileContentReader
