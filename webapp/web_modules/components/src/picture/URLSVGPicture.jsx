/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ReactSVG from 'react-svg'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'
import styles from './styles'

/**
 * Display an SVG picture on URL connected to material UI, because MUI is not able to load and display SVG (................)
 * @author Raphaël Mechali
 */
export class URLSVGPicture extends React.Component {
  /** Supported MIME types */
  static SUPPORTED_MIME_TYPES = [MIME_TYPES.SVG_MIME_TYPE]

  static propTypes = {
    color: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    url: PropTypes.string.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { style: userStyle, color: userColor, url } = this.props
    const { moduleTheme: { svgURLIconStyle } } = this.context

    // merge with provided style
    const renderStyle = userStyle ? {
      ...svgURLIconStyle,
      ...userStyle,
    } : svgURLIconStyle

    // workaround: provide runtime color to this element (MUI components send that property separately)
    if (userColor) {
      renderStyle.fill = userColor
    }

    // workaround: ensure the icon will display correctly in material UI components
    // as MUI does not support the root ReactSVG div without display in its layout
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const rootStyle = { // eslint wont fix: user props and context merged (only available in render)
      display: renderStyle.display,
    }

    return (
      <div style={rootStyle}>
        <ReactSVG
          src={url}
          svgStyle={renderStyle}
        />
      </div>
    )
  }
}

export default withModuleStyle(styles)(URLSVGPicture)
