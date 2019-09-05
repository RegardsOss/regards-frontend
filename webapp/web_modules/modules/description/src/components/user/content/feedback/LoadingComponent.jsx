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
import values from 'lodash/values'
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Description module loading component: allows multiple type according with the content being loaded
 * @author Raphaël Mechali
 */
class LoadingComponent extends React.Component {
   /** Possible loading types */
   static LOADING_TYPES_ENUM = {
     MAIN: 'MAIN',
     FILE: 'FILE',
   }

  /** Graphics data associated with loading type */
  static LOADING_TYPE_DATA = {
    [LoadingComponent.LOADING_TYPES_ENUM.MAIN]: {
      messageKey: 'module.description.main.loading.message',
    },
    [LoadingComponent.LOADING_TYPES_ENUM.FILE]: {
      messageKey: 'module.description.file.loading.message',
    },
  }

  static propTypes = {
    type: PropTypes.oneOf(values(LoadingComponent.LOADING_TYPES_ENUM)).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { type } = this.props
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
        <div style={message}>
          {formatMessage({ id: LoadingComponent.LOADING_TYPE_DATA[type].messageKey })}
        </div>
      </div>
    )
  }
}
export default LoadingComponent
