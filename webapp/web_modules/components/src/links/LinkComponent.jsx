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
 */
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from './styles'

/**
 * Render a <a> HTML Balise with muiTheme styles for colors.
 *
 * @author Sébastien Binda
 */
class LinkComponent extends React.Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    onClick: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { linkComponent } } = this.context
    return (
      <a
        style={linkComponent}
        href={this.props.link}
        target={this.props.target ? this.props.target : '_self'}
        rel={this.props.rel ? this.props.rel : ''}
        onClick={this.props.onClick}
      >
        {this.props.label ? this.props.label : this.props.link}
      </a>
    )
  }
}

export default withModuleStyle(styles)(LinkComponent)
