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
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Rensder quicklook file picture on magnified mode (HD)
 * @author Raphaël Mechali
 */
class MagnifiedQuicklookPictureComponent extends React.Component {
  static propTypes = {
    quicklookFile: UIShapes.QuicklookDefinition.isRequired,
    onToggleMagnified: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { quicklookFile, onToggleMagnified } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          main: {
            content: {
              quicklook: {
                view: { magnified },
              },
            },
          },
        },
      },
    } = this.context
    const displayedQL = UIDomain.QuicklookHelper.getQLDimensionOrFallback(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, quicklookFile)
    return (
      <div
        style={magnified.container}
        onClick={onToggleMagnified}
      >
        <img
          src={displayedQL.uri}
          alt={formatMessage({ id: 'module.description.content.quicklook.alt.message' })}
          style={magnified.img}
        />
      </div>
    )
  }
}
export default MagnifiedQuicklookPictureComponent
