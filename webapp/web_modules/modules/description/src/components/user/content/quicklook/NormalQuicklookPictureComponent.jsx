/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Renders quicklook file picture in normal mode (MD). Shows quicklook group name as caption when there are other quickooks
 * @author Raphaël Mechali
 */
class NormalQuicklookPictureComponent extends React.Component {
  static propTypes = {
    hasOtherQuicklooks: PropTypes.bool.isRequired,
    quicklookFile: UIShapes.QuicklookDefinition.isRequired,
    onToggleMagnified: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { hasOtherQuicklooks, quicklookFile, onToggleMagnified } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          main: {
            content: {
              quicklook: {
                view: { normal },
              },
            },
          },
        },
      },
    } = this.context
    const displayedQL = UIDomain.QuicklookHelper.getQLDimensionOrFallback(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD, quicklookFile)
    return (
      <div
        style={normal.container}
        onClick={onToggleMagnified}
      >
        {/* Center picture and let it scale down only */}
        <img
          src={displayedQL.uri}
          alt={formatMessage({ id: 'module.description.content.quicklook.alt.message' })}
          style={normal.img}
        />
        { /** Show picture caption when there are other quicklooks */
          hasOtherQuicklooks ? (
            <div style={normal.caption}>
              { /** Group label or anonymous group */
                quicklookFile.label || formatMessage({ id: 'module.description.content.quicklook.group.unknown' })
}
            </div>
          ) : null
        }
      </div>
    )
  }
}
export default NormalQuicklookPictureComponent
