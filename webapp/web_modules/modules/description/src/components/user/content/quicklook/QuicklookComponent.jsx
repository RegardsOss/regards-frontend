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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { UIShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'

/**
 * Shows a quicklook, initially in normal mode to display quicklook MD, but allows user to magnify picture to show quicklook HD
 * @author Léo Mieulet
 * @author Raphaël Mechali
 */
class QuicklookComponent extends React.Component {
  static propTypes = {
    quicklookFiles: PropTypes.arrayOf(UIShapes.QuicklookDefinition).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    magnified: false,
  }

  /**
   * On user click, toggle the zoom
   */
  toggleMagnified = () => {
    const { magnified } = this.state
    this.setState({
      magnified: !magnified,
    })
  }

  render() {
    const { quicklookFiles } = this.props
    const { magnified } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          main: {
            content: {
              quicklook: {
                view: {
                  normal: normalStyles, magnified: magnifiedStyles,
                },
              },
            },
          },
        },
      },
    } = this.context

    // Select picture to show (quicklook as been prepared to fallback when missing, URI are already usable)
    // TODO: this code should evolve (so far, only one quicklook)
    const { uri } = quicklookFiles[0][magnified
      ? CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD
      : CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]
    const { container, img } = magnified ? magnifiedStyles : normalStyles
    return (
      <div
        style={container}
        onClick={this.toggleMagnified}
      >
        <img
          src={uri}
          alt={formatMessage({ id: 'module.description.content.quicklook.alt.message' })} // TODO
          style={img}
        />
      </div>
    )
  }
}
export default QuicklookComponent
