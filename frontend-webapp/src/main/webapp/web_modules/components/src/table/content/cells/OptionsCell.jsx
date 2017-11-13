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
 * A cell to render an options list: it uses an array of constructors and properties to build the cell content
 * @author Raphaël Mechali
 */
export default class OptionsCell extends React.Component {

  static propTypes = {
    // common cell content properties
    rowIndex: PropTypes.number.isRequired,
    getEntity: PropTypes.func.isRequired,
    // list of properties with render delegate constructor for that property
    optionsDefinitions: PropTypes.arrayOf(PropTypes.shape({
      OptionConstructor: PropTypes.func.isRequired,
      optionProps: PropTypes.object,
    })).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { optionsDefinitions, getEntity, rowIndex } = this.props
    const entity = getEntity()
    return optionsDefinitions.map(({ OptionConstructor, optionProps = {} }, optionIndex) => (
      <OptionConstructor key={`option.${OptionConstructor.displayName}`} entity={entity} rowIndex={rowIndex} {...optionProps} />
    ))
  }

}

