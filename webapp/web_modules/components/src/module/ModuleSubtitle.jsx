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
import Subheader from 'material-ui/Subheader/Subheader'
import { themeContextType } from '@regardsoss/theme'

/**
 * Common dynamic modules sub title (use iconInsets: true to align subtitle with title when module has an icon)
 * @author Raphaël Mechali
 */
class ModuleSubtitle extends React.Component {
  static propTypes = {
    // subtitle text
    text: PropTypes.string,
    // icons insets: set it to true when using an icon in title (made to work with ModuleTitle)
    iconInsets: PropTypes.bool,
  }

  static defaultProps = {
    iconInsets: true,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { text, iconInsets } = this.props
    const { moduleTheme: { moduleSubTitle: { styleWithoutInset, styleWithIconInsets } } } = this.context
    return (
      text ? <Subheader style={iconInsets ? styleWithIconInsets : styleWithoutInset}>{text}</Subheader> : null
    )
  }
}
export default ModuleSubtitle
