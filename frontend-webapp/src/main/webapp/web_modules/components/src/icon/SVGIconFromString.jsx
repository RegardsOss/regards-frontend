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
import SvgIcon from 'material-ui/SvgIcon'

/**
 * A React component to display a SVG element
 */
class SVGIconFromString extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    iconStyle: PropTypes.object,
    iconViewBox: PropTypes.string,
  }

  static defaultProps = {
    iconStyle: { width: '150px', height: '150px' },
    iconViewBox: '0 0 94.5 94.5',
  }
  render() {
    const { iconStyle, icon, iconViewBox } = this.props
    return (
      <SvgIcon viewBox={iconViewBox} style={iconStyle}>
        {/* eslint-disable react/no-danger */}
        <g dangerouslySetInnerHTML={{ __html: icon }} />
      </SvgIcon>
    )
  }
}

export default SVGIconFromString
