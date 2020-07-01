/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import { themeContextType } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'

/**
* A storage capacity render
* Storage capacity capacity can be expressed either as:
* - string: value to be parsed, with unit
* - number: considered as unit specified in numberUnit (bytes by default)
* - storage.StorageCapacity
* It lets user provide a presentation scale (like bits, bytes...)
* @author Raphaël Mechali
*/
class StorageCapacityRender extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(storage.StorageCapacity).isRequired,
    ]),
    presentationScale: PropTypes.oneOf(storage.StorageUnitScale.all),
    numberUnit: PropTypes.oneOf([storage.units.BIT, storage.units.BYTE]),
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
    presentationScale: storage.StorageUnitScale.bytesScale,
    numberUnit: storage.units.BYTE,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Provide value as a storage capacity and scales it to presentation scale choosen by the user
   * @return {storage.StorageCapacity} capacity or null
   */
  getValueAsStorageCapacity = () => {
    const { value, presentationScale, numberUnit } = this.props
    let capacity = null
    if (isNumber(value) && value > 0) {
      capacity = new storage.StorageCapacity(value, numberUnit)
    } else if (isString(value)) {
      capacity = storage.StorageCapacity.fromValue(value)
    } else if (value instanceof storage.StorageCapacity) {
      capacity = value
    }
    return capacity ? capacity.scaleAndConvert(presentationScale) : null
  }

  render() {
    const { multilineDisplay } = this.props
    const { moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell}>
        <storage.FormattedStorageCapacity
          capacity={this.getValueAsStorageCapacity()}
        />
      </div>
    )
  }
}

export default StorageCapacityRender
