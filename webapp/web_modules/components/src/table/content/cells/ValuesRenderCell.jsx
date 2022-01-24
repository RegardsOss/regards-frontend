/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import { themeContextType } from '@regardsoss/theme'
import ValuesSeparator from './ValuesSeparator'

const EMPTY_OBJECT = {}

/**
 * A cell to render entity values: it uses an array of values extractors to produce the visible values and an
 * optional RenderConstructor by value producer (allows to format specific values, when required, defaults to string
 * formatter)
 * @author Raphaël Mechali
 */
export default class ValuesRenderCell extends React.Component {
  static propTypes = {
    // common cell content properties
    // rowIndex: PropTypes.number.isRequired, unused
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.any.isRequired, // object, string, ... depends on values producer (getValue methods)
    // list of values extractors
    values: PropTypes.arrayOf(PropTypes.shape({
      // value producer from entity
      getValue: PropTypes.func.isRequired,
      // value renderer, opional
      RenderConstructor: PropTypes.func,
      // optionnal render props
      // eslint-disable-next-line react/forbid-prop-types
      props: PropTypes.object,
    })).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { entity, values } = this.props
    const { multipleCellValues } = this.context.moduleTheme
    return flatMap(values, ({ getValue, RenderConstructor, props }, index) => [
      index > 0 ? <ValuesSeparator key={`separator.${index}`} /> : null,
      <div key={`value.${index}`} style={multipleCellValues}>
        <RenderConstructor value={getValue(entity)} {...(props || EMPTY_OBJECT)} />
      </div>,
    ])
  }
}
