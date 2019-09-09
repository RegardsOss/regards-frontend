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
 * Given a file content as blob, provides to children a reference to that file as URL and ensures cleaning it.
 * Children receive the property as {[targetPropertyName]: string} (default targetPropertyName is 'url').
 * @author Raphaël Mechali
 */
class LocalURLProvider extends React.Component {
  // TODO tests!

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
    blob: PropTypes.instanceOf(root.Blob || Object).isRequired,
    /** Name of the property to add into children */
    // eslint-disable-next-line react/no-unused-prop-types
    targetPropertyName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node).isRequired]).isRequired,
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
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local URL reference
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)


  /**
   * Lifecycle method: component receive props. Used to delete local URL reference
   * @param {*} nextProps next component properties
   */
  componentWillUnmount = () => {
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
  onPropertiesUpdated = (
    { blob: oldBlob, children: oldChildren, targetPropertyName: oldPropName },
    { blob, children, targetPropertyName }) => {
    if (oldBlob !== blob) {
      // 1 - Revoke old URL if there was one
      if (this.state.localAccessURL) {
        root.URL.revokeObjectURL(this.state.localAccessURL)
      }
      // 2 - Use new URL if there is a new file content, clear old one in any case
      this.storeChildrenWithURL(blob ? LocalURLProvider.buildLocalAccessURL(blob) : null, targetPropertyName, children)
    } else if (oldPropName !== targetPropertyName || oldChildren !== children) {
      this.storeChildrenWithURL(this.state.localAccessURL, targetPropertyName, children)
    }
  }

  /**
   * Stores children in state with URL
   * @param {string} URL
   * @param {string} targetPropertyName
   */
  storeChildrenWithURL = (localAccessURL, targetPropertyName, children) => {
    this.setState({
      localAccessURL,
      children: HOCUtils.cloneChildrenWith(children, {
        [targetPropertyName]: localAccessURL,
      }),
    })
  }


  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default LocalURLProvider
