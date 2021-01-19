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
import { themeContextType } from '@regardsoss/theme'

/**
 * @auhtor Sébastien Binda
 */
class Title extends React.Component {
  static propTypes = {
    level: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getLevelStyle = () => {
    const level = this.props.level ? this.props.level : 1
    const levelSize = level / 10
    const fontSize = 1 + (0.5 - levelSize)
    let color
    switch (this.props.level) {
      case 0:
      case 1:
        color = this.context.muiTheme.palette.accent1Color
        break
      case 2:
        color = this.context.muiTheme.palette.accent2Color
        break
      default:
        color = this.context.muiTheme.palette.textColor
        break
    }
    return {
      color,
      fontSize: `${fontSize}em`,
      margin: '15px 0px',
    }
  }

  render() {
    return (
      <div style={this.getLevelStyle()}>
        {this.props.label}
      </div>
    )
  }
}

export default Title
