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
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
 * Loading displayer for description view
 * @author Raphaël Mechali
 */
class LoadingDisplayerComponent extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { message } = this.props
    const {
      rootStyle, circleSize, circleThickness, messageStyle,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.loading

    return (
      <div style={rootStyle}>
        <CircularProgress size={circleSize} thickness={circleThickness} />
        <div style={messageStyle}>{message}</div>
      </div>
    )
  }
}
export default LoadingDisplayerComponent
