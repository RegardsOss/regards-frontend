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
import { themeContextType } from '@regardsoss/theme'

/**
 * A cell to render an options list: it uses an array of constructors and properties to build the cell content
 * @author Raphaël Mechali
 */
export default class OptionsCell extends React.Component {
  static propTypes = {
    // common cell content properties
    rowIndex: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.any.isRequired,
    // list of properties with render delegate constructor for that property
    optionsDefinitions: PropTypes.arrayOf(PropTypes.shape({
      OptionConstructor: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      optionProps: PropTypes.object,
    })).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { optionsDefinitions, entity, rowIndex } = this.props
    return optionsDefinitions.map(({ OptionConstructor, optionProps = {} }, optionIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <OptionConstructor key={`option.${optionIndex}`} entity={entity} rowIndex={rowIndex} {...optionProps} />
    ))
  }
}
