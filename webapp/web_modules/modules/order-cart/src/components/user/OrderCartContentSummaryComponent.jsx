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
import get from 'lodash/get'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { TableHeaderLine, TableHeaderContentBox, TableHeaderText } from '@regardsoss/components'
import DuplicatedObjectsMessageComponents from './options/DuplicatedObjectsMessageComponents'

/**
 * Displays order cart content summary.
 * @author Raphaël Mechali
 */
class OrderCartContentSummary extends React.Component {
  /**
   * Computes basket summary data
   * @param {OrderShapes.Basket} basket basket
   * @return {totalObjectsCount: number, effectiveObjectsCount: number, totalSize: number} total objects count, effective objects count and
   * totalSize as numbers. Total size unit is the same than backend (bytes)
   */
  static computeBasketSummaryData(basket) {
    const datasetSelections = get(basket, 'datasetSelections', [])
    return datasetSelections
      // 1 - retrieve data for each dataset
      .map(({ objectsCount: dsEffectiveObjectsCount, filesSize: dsTotalSize, itemsSelections }) => {
        // 1.1 - The actual total count requires to sum each item selection count (dataset holds the count without doubles)
        const dsTotalObjectsCount = itemsSelections.reduce((acc, { objectsCount }) => acc + objectsCount, 0)
        return { dsTotalObjectsCount, dsEffectiveObjectsCount, dsTotalSize }
      })
      // 2 - sum up data found for all datasets (note that if array is empty, default values are returned)
      .reduce((acc, datasetCounts) => ({
        totalObjectsCount: acc.totalObjectsCount + datasetCounts.dsTotalObjectsCount,
        effectiveObjectsCount: acc.effectiveObjectsCount + datasetCounts.dsEffectiveObjectsCount,
        totalSize: acc.totalSize + datasetCounts.dsTotalSize,
      }), { totalObjectsCount: 0, effectiveObjectsCount: 0, totalSize: 0 })
  }

  static propTypes = {
    onShowDuplicatedMessage: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    basket: OrderShapes.Basket, // used in onPropertiesUpdated
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    // current object count message parameters
    objectCountMessageParameters: null,
    // total objects count that user added to the basket
    totalObjectsCount: 0,
    // effective objects count (ie objects that are not doubles)
    effectiveObjectsCount: 0,
    // current size message key or null when hidden
    sizeMessageParameters: null,
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
  onPropertiesUpdated = (oldProps, newProps) => {
    // no need to test here the basket value, as it is the single non constant property of this component,
    // we can assert here it is the one that changed (or this is initialization time)
    const { totalObjectsCount, effectiveObjectsCount, totalSize } =
      OrderCartContentSummary.computeBasketSummaryData(newProps.basket)
    const { intl: { formatMessage, formatNumber } } = this.context
    const totalSizeCapacity = new storage.StorageCapacity(totalSize, storage.StorageUnits.BYTE).scaleAndConvert(storage.StorageUnitScale.bytesScale)
    this.setState({
      totalObjectsCount,
      effectiveObjectsCount,
      objectCountMessageParameters: { effectiveObjectsCount },
      sizeMessageParameters: { totalSize: storage.formatStorageCapacity(formatMessage, formatNumber, totalSizeCapacity) },
    })
  }

  render() {
    const { onShowDuplicatedMessage } = this.props
    const {
      objectCountMessageParameters,
      totalObjectsCount,
      effectiveObjectsCount,
      sizeMessageParameters,
    } = this.state

    const { intl: { formatMessage } } = this.context

    if (!totalObjectsCount) {
      // do not show this line when empty
      return null
    }

    return (
      <TableHeaderLine>
        <TableHeaderContentBox>
          { /* 1 - Objects count messages */}
          <TableHeaderText text={formatMessage({ id: 'order-cart.module.objects.count.header.message' }, objectCountMessageParameters)} />
          { /* 2 - Information about double object in basket.
                   Note: we re-use the table styles here, stacked by TableLayout */
            <DuplicatedObjectsMessageComponents
              totalObjectsCount={totalObjectsCount}
              effectiveObjectsCount={effectiveObjectsCount}
              onShowDuplicatedMessage={onShowDuplicatedMessage}
            />
          }
          <br />
        </TableHeaderContentBox>
        <TableHeaderContentBox>
          <TableHeaderText text={formatMessage({ id: 'order-cart.module.objects.count.size.message' }, sizeMessageParameters)} />
        </TableHeaderContentBox>
      </TableHeaderLine>
    )
  }
}
export default OrderCartContentSummary
