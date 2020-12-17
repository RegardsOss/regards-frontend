/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BrokenPictureIcon from 'mdi-material-ui/ImageBroken'
import styles from './styles'

/**
 * Broken picture placeholder for pictures:
 * - that failed loading
 * - that have an unsupported MIME type
 * @author Raphaël Mechali
 */
export class BrokenPicturePlaceholder extends React.Component {
  static propTypes = {
    color: PropTypes.string,
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
    const { style: userStyle, color: userColor } = this.props
    // pick up in theme the icon elements
    const { moduleTheme: { svgURLIconStyle } } = this.context
    // merge with provided style
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const renderStyle = { // eslint wont fix: user props and context merged (only available in render)
      ...svgURLIconStyle,
      ...userStyle,
    }
    // workaround: provide runtime color to this element (MUI components send that property separately)
    if (userColor) {
      renderStyle.fill = userColor
    }

    return (
      <BrokenPictureIcon style={renderStyle} />
    )
  }
}

export default withModuleStyle(styles)(BrokenPicturePlaceholder)
