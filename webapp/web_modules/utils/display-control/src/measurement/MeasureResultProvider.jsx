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
import omit from 'lodash/omit'
import { Measure } from '@regardsoss/adapters'
import HOCUtils from '../hoc/HOCUtils'

/**
 * Measure provider: it measures children nodes, and provide children with the result of toMeasureResult in [targetPropertyName], each time size changes
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
  }

  /**
   * Resized event reveived
   * @param {*} sizes size by component name
   */
  onSizeChanged = ({ measureDiv: { width, height } }) => {
    const nextWidth = Math.floor(width)
    const nextHeight = Math.floor(height)
    if (this.state.width !== nextWidth || this.state.height !== nextHeight) {
      this.setState({
        width,
        height,
      })
    }
  }

  /**
   * Binds to measure then renders top div and children
   * @param {*} measureParams from react-measure API
   */
  bindAndRender = ({ bind }) => {
    const {
      style, children, toMeasureResult, targetPropertyName,
    } = this.props
    const { width, height } = this.state
    const compoProps = {
      [targetPropertyName]: toMeasureResult(width, height),
      ...omit(this.props, ['style', 'targetPropertyName', 'toMeasureResult', 'children']),
    }
    return (
      <div style={style} {...bind('measureDiv')}>
        {HOCUtils.cloneChildrenWith(children, compoProps)}
      </div>)
  }

  render() {
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        {this.bindAndRender}
      </Measure>)
  }
}
export default MeasureResultProvider
