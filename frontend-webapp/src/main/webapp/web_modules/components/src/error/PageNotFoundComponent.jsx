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
import { themeContextType } from '@regardsoss/theme'
import Icon from 'material-ui/svg-icons/content/report'

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
    const iconStyle = { width: '128px', height: '128px', opacity: '0.2' }
    const theme = this.context.muiTheme

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '30vh', width: '100%' }}>
          <Icon color={theme.palette.primary1Color} style={iconStyle} />
          <div style={{ maxWidth: '40%', marginTop: '0.2em', color: theme.palette.textColor, fontSize: '1.5em' }}>
            REGARDS : Page Not Found !
          </div>
          <div style={{ maxWidth: '40%', marginTop: '0.6em', color: theme.palette.secondaryTextColor, textAlign: 'center', fontSize: '1em' }}>
            Requested page does not exists
          </div>
        </div>
      </div>
    )
  }
}

export default PageNotFoundComponent
