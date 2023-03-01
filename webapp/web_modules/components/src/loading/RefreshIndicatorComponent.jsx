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
import RefreshIndicator from 'material-ui/RefreshIndicator'

/**
 * Decorate the RefreshIndicator from mui to fix Firefox issue
 * @author Léo Mieulet
 */
class RefreshIndicatorComponent extends React.Component {
  static propTypes = {
    style: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    const { style, ...otherProps } = this.props
    const newStyle = {
      ...style,
      // Fix for Firefox that does not support -10k px
      top: 0,
      left: 0,
      transform: 'none',
    }

    return <RefreshIndicator
      {...otherProps}
      style={newStyle}
    />
  }
}
export default RefreshIndicatorComponent
