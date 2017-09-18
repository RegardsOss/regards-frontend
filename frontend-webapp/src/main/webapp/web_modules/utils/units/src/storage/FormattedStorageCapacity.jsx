/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from './i18n'
import { StorageCapacityShape } from './StorageCapacity'
import { StorageUnits } from './StorageUnit'

/**
* Format storage capacity as a react component (react-intl style)
* @author Raphaël Mechali
*/
export class FormattedStorageCapacity extends React.Component {

  static propTypes = {
    capacity: StorageCapacityShape,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Big units format options (not for bits and bytes) */
  static BIG_UNITS_FORMAT_OPTIONS = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  /** Small units format options (bits and bytes) */
  static SMALL_UNITS_FORMAT_OPTIONS = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }

  static SMALL_UNITS = [StorageUnits.BIT.symbol, StorageUnits.BYTE.symbol]

  render() {
    const { capacity } = this.props
    const { intl: { formatMessage, formatNumber } } = this.context // TODO report format number into archival storage

    const formatProperties = {
      id: 'storage.capacity.monitoring.capacity.unknown',
    }
    if (capacity) {
      formatProperties.id = 'storage.capacity.monitoring.capacity'
      // unit
      const unitLabel = formatMessage({ id: capacity.unit.messageKey })
      // value: when bytes or bits, format without digits
      const valueLabel = formatNumber(capacity.value,
        FormattedStorageCapacity.SMALL_UNITS.includes(capacity.unit.symbol) ? FormattedStorageCapacity.SMALL_UNITS : FormattedStorageCapacity.BIG_UNITS_FORMAT_OPTIONS)
      formatProperties.values = { valueLabel, unitLabel }
    }
    return (
      <FormattedMessage {...formatProperties} />
    )
  }
}

export default withI18n(messages)(FormattedStorageCapacity)
