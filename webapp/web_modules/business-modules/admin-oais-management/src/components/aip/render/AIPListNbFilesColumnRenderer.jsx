/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import size from 'lodash/size'
import get from 'lodash/get'
import { StorageShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display the number of files associated with the current AIP
 * @author Léo Mieulet
*/
class AIPListNbFilesColumnRenderer extends React.Component {
  static propTypes = {
    value: StorageShapes.AIPContentWithStorages.isRequired,
    handleClick: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onClick = () => {
    this.props.handleClick(this.props.value)
  }

  render() {
    const { moduleTheme: { dataFileLinkStyle } } = this.context
    return (
      <span onClick={this.onClick} style={dataFileLinkStyle}>
        {size(get(this.props.value, 'aip.properties.contentInformations', []))}
      </span>
    )
  }
}
export default AIPListNbFilesColumnRenderer
