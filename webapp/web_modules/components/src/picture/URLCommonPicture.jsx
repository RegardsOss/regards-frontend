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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { MIME_TYPES } from '@regardsoss/mime-types'
import styles from './styles'

/**
 * Displays a comon type picture (any MIME type except SVG) and reports appliable styles
 * @author Raphaël Mechali
 */
export class URLCommonPicture extends React.Component {
  /** Supported MIME types */
  static SUPPORTED_MIME_TYPES = [
    MIME_TYPES.GIF_MIME_TYPE,
    MIME_TYPES.JPEG_MIME_TYPE,
    MIME_TYPES.PNG_MIME_TYPE,
    MIME_TYPES.TIF_MIME_TYPE,
  ]

  static propTypes = {
    alt: PropTypes.string,
    url: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {},
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { alt, style: userStyle, url } = this.props
    const { moduleTheme: { commonURLIconStyle } } = this.context

    // merge with provided style (some MUI components)
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const renderStyle = { // eslint wont fix: user props and context merged (only available in render)
      ...commonURLIconStyle,
      ...userStyle,
    }

    return (
      <img
        src={url}
        alt={alt || url}
        style={renderStyle}
      />
    )
  }
}

export default withModuleStyle(styles)(URLCommonPicture)
