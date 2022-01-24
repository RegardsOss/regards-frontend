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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import Icon from 'mdi-material-ui/AlertOctagon'
import styles from './styles'

/**
 *
 * 404 Not found page
 *
 * @author Sébastien Binda
 */
class PageNotFoundComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { muiTheme, moduleTheme: { pageNotFound } } = this.context
    return (
      <div style={pageNotFound.rootStyle}>
        <div style={pageNotFound.innerLayoutStyle}>
          <Icon color={muiTheme.palette.primary1Color} style={pageNotFound.iconStyle} />
          <div style={pageNotFound.titleStyle}>
            REGARDS : Page Not Found !
          </div>
          <div style={pageNotFound.testStyle}>
            Requested page does not exists
          </div>
        </div>
      </div>
    )
  }
}

export default withModuleStyle(styles)(PageNotFoundComponent)
