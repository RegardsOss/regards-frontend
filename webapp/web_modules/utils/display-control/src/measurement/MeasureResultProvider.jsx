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
import omit from 'lodash/omit'
import { Measure } from '@regardsoss/adapters'
import HOCUtils from '../hoc/HOCUtils'

/**
 * Measure provider: it measures children nodes, an provide children with the result of toMeasureResult in [targetPropertyName], each time size changes
 * Nota: when using default toMeasureResult and target property name, child object will receive the property **dimension: {width, height}**. However, that
 * system also allows to perform something like **{SizeChangeEvent} =>  {style: toMeasureResult(size)}**, which is a common use case of measure.
 * @author Raphaël Mechali
 */
class MeasureResultProvider extends React.Component {
  static propTypes = {
    // Style of the root div layout, to be measured
    style: PropTypes.objectOf(PropTypes.any).isRequired,
    // name of the property to set in children
    targetPropertyName: PropTypes.string,
    /** Function that generates, from width and height, the children property. (width: number, height: number) => (*) */
    toMeasureResult: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node).isRequired]).isRequired,
    // other properties should be reported to children
  }

  static defaultProps = {
    toMeasureResult: (width, height) => ({ width, height }),
    targetPropertyName: 'dimension',
  }

  state = {
    width: 0,
    height: 0,
    children: null,
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
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { children: oldChildren, targetPropertyName: oldTargetPropertyName, toMeasureResult: oldToMeasureResult } = oldProps
    const { children, targetPropertyName, toMeasureResult } = newProps
    if (oldChildren !== children || oldTargetPropertyName !== targetPropertyName || oldToMeasureResult !== toMeasureResult) {
      this.onUpdateMeasureResult(this.state.width, this.state.height, targetPropertyName, toMeasureResult, children, newProps)
    }
  }

  /**
   * Resized event reveived
   * @param {*} sizes size by component name
   */
  onSizeChanged = ({ measureDiv: { width, height } }) => {
    const { targetPropertyName, toMeasureResult, children } = this.props
    const nextWidth = Math.floor(width)
    const nextHeight = Math.floor(height)
    if (this.state.width !== nextWidth || this.state.height !== nextHeight) {
      this.onUpdateMeasureResult(nextWidth, nextHeight, targetPropertyName, toMeasureResult, children, this.props)
    }
  }

  /**
   * Measure, children or conversion function changed: update final children list with measure result property
   * @param {number} width width
   * @param {number} height height
   * @param {string} targetPropertyName name of the property to add in children
   * @param {function} toMeasureResult conversion function
   * @param {*} single child
   * @param {*} thisProps this component current properties
   */
  onUpdateMeasureResult = (width, height, targetPropertyName, toMeasureResult, children, thisProps) => {
    this.setState({
      width,
      height,
      children: HOCUtils.cloneChildrenWith(children, {
        [targetPropertyName]: toMeasureResult(width, height),
        ...omit(thisProps, ['style', 'targetPropertyName', 'toMeasureResult', 'children']),
      }),
    })
  }

  /**
   * Binds to measure then renders top div and children
   * @param {*} measureParams from react-measure API
   */
  bindAndRender = ({ bind }) => {
    const { style } = this.props
    const { children } = this.state
    return (
      <div style={style} {...bind('measureDiv')}>
        { HOCUtils.renderChildren(children) }
      </div>)
  }

  render() {
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        { this.bindAndRender }
      </Measure>)
  }
}
export default MeasureResultProvider
