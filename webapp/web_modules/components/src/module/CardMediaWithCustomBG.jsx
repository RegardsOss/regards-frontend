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
import { CardMedia } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'

/**
 * Use the background color provided by the alternative theme
 * @author Léo Mieulet
 */
export class CardMediaWithCustomBG extends React.Component {
  static propTypes = {
    // used to create callback on main module area
    onKeyPress: PropTypes.func,
    // custom root style to merge with background color
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // custom media style
    // eslint-disable-next-line react/forbid-prop-types
    mediaStyle: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    style: {},
    mediaStyle: {},
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { onKeyPress, style, mediaStyle } = this.props
    const { muiTheme } = this.context
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    const thisStyle = { // eslint wont fix: user props and context merged (only available in render)
      backgroundColor: muiTheme.palette.canvasColor,
      ...style,
    }
    return (
      <CardMedia style={thisStyle} mediaStyle={mediaStyle} onKeyPress={onKeyPress}>
        {this.props.children}
      </CardMedia>
    )
  }
}

export default CardMediaWithCustomBG
