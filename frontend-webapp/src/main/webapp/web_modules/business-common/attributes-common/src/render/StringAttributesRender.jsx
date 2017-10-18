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
import map from 'lodash/map'

/**
 * Component to display string attributes group value
 *
 * @author Sébastien binda
 */
class StringAttributesRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    attributes: PropTypes.object,
  }

  static SPAN_SINGLE_LINE_STYLES = {
    whiteSpace: 'nowrap',
  }

  render() {
    const attributes = map(this.props.attributes, (attribute) => {
      if (attribute) {
        return String(attribute)
      }
      return null
    })
    const value = attributes.join(' ')
    return (
      <span
        title={value}
        style={StringAttributesRender.SPAN_SINGLE_LINE_STYLES}
      >
        {value}
      </span>
    )
  }

}

export default StringAttributesRender
