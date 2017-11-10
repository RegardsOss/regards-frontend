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
import flatMap from 'lodash/flatMap'
import { themeContextType } from '@regardsoss/theme'
import PropertiesValuesSeparator from './PropertiesValuesSeparator'


/**
 * A cell to render entity properties: it uses an array or properties with lodash notation like 'a.b.c[0]' and a RenderValueDelegate
 * to display entity properties values
 * @author Raphaël Mechali
 */
export default class PropertiesRenderCell extends React.Component {

  static propTypes = {
    // common cell content properties
    // rowIndex: PropTypes.number.isRequired, unused
    getEntity: PropTypes.func.isRequired,
    // list of properties with render delegate constructor for that property
    properties: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired, // a gettable path (in the lodash meaning) for property on row entity
      RenderConstructor: PropTypes.func.isRequired,
    })).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { getEntity, properties } = this.props
    const entity = getEntity()
    return flatMap(properties, ({ path, RenderConstructor }, index) =>
      [
        index > 0 ? <PropertiesValuesSeparator key={`separator.${path}`} /> : null,
        <RenderConstructor key={`value.${path}`} value={get(entity, path)} />,
      ])
  }

}

