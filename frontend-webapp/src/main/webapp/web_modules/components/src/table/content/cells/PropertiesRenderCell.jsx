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
import get from 'lodash/get'
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'
import { themeContextType } from '@regardsoss/theme'


/**
 * A cell to render entity properties: it uses an array or properties with lodash notation like 'a.b.c[0]' and a RenderValueDelegate
 * to display entity properties values
 * @author Raphaël Mechali
 */
export default class PropertiesRenderCell extends React.Component {

  static propTypes = {
    // common cell content properties
    rowIndex: PropTypes.number.isRequired,
    getEntity: PropTypes.func.isRequired,
    // values render delegate constructor
    RenderDelegateConstructor: PropTypes.func.isRequired,
    // Array of shown properties full path: will be used to compute values
    properties: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: on toggle row selection
   */
  onToggleSelectRow = () => this.props.onToggleRowSelection(this.props.rowIndex)

  render() {
    const { getEntity, properties, RenderDelegateConstructor } = this.props
    const entity = getEntity()
    const attributesWithValues = reduce(properties, (acc, attributeFullPath) => ({
      ...acc,
      [attributeFullPath]: get(entity, attributeFullPath),
    }), {})
    return <RenderDelegateConstructor attributes={attributesWithValues} />
  }

}

