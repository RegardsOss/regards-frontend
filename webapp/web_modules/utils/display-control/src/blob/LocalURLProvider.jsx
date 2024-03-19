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
 * Given a file content as blob, provides to children a reference to that file as URL and ensures cleaning it.
 * Children receive the property as {[targetPropertyName]: string} (default targetPropertyName is 'url').
 * @author Raphaël Mechali
 */
class LocalURLProvider extends React.Component {
  /**
   * Creates local access URL for blob as parameter
   * @param {*} blob blob
   * @return {string} blob local URL
   */
  static buildLocalAccessURL(blob) {
    return root.URL.createObjectURL(blob)
  }

  static propTypes = {
    /** File content as blob to address */
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
    targetPropertyName: 'url',
  }

  state = {
    localAccessURL: null,
    children: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and create local URL reference
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local URL reference
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Lifecycle method: component receive props. Used to delete local URL reference
   * @param {*} nextProps next component properties
   */
  componentWillUnmount() {
    // make sure leaving no local access file
    if (this.state.localAccessURL) {
      root.URL.revokeObjectURL(this.state.localAccessURL)
    }
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      blob: oldBlob, children: oldChildren, targetPropertyName: oldPropName, ...oldOtherProperties
    } = oldProps
    const {
      blob, children, targetPropertyName, ...otherProperties
    } = newProps
    if (oldBlob !== blob) {
      // 1 - Revoke old URL if there was one
      if (this.state.localAccessURL) {
        root.URL.revokeObjectURL(this.state.localAccessURL)
      }
      // 2 - Use new URL if there is a new file content, clear old one in any case
      this.storeChildrenWithURL(blob ? LocalURLProvider.buildLocalAccessURL(blob) : null, targetPropertyName, children, otherProperties)
    } else if (oldPropName !== targetPropertyName || oldChildren !== children || !isEqual(oldOtherProperties, otherProperties)) {
      this.storeChildrenWithURL(this.state.localAccessURL, targetPropertyName, children, otherProperties)
    }
  }

  /**
   * Stores children in state with URL
   * @param {string} localAccessURL localAccessURL
   * @param {string} targetPropertyName name of the property to set in children
   * @param {* | [*]} children
   * @param {*} otherProperties other properties to be reported to children
   */
  storeChildrenWithURL = (localAccessURL, targetPropertyName, children, otherProperties) => {
    this.setState({
      localAccessURL,
      children: HOCUtils.cloneChildrenWith(children, {
        [targetPropertyName]: localAccessURL,
        ...otherProperties,
      }),
    })
  }

  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default LocalURLProvider
