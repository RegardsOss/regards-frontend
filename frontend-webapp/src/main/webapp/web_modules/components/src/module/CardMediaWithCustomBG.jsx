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
import { CardMedia } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'


/**
 * Use the background color provided by the alternative theme
 * @author Léo Mieulet
 */
export class CardMediaWithCustomBG extends React.Component {
  static propTypes = {
    // used to create callback on main module area
    onKeyPress: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    const { muiTheme } = context
    this.style = {
      backgroundColor: muiTheme.palette.canvasColor,
    }
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { onKeyPress } = this.props

    return (
      <CardMedia style={this.style} onKeyPress={onKeyPress}>
        {this.props.children}
      </CardMedia>
    )
  }
}

export default CardMediaWithCustomBG
