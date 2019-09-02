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
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Description module loading component
 * @author Raphaël Mechali
 */
class LoadingComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          main: {
            content: {
              loading: {
                container, circle, message,
              },
            },
          },
        },
      },
    } = this.context
    return (
      <div style={container}>
        <CircularProgress size={circle.size} color={circle.color} thickness={circle.thickness} />
        <div style={message}>{formatMessage({ id: 'module.description.loading.message' })}</div>
      </div>
    )
  }
}
export default LoadingComponent
