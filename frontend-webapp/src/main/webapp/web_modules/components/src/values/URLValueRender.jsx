/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import LinkComponent from '../links/LinkComponent'

/**
 * Component to display url link values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class URLValueRender extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    multilineDisplay: PropTypes.bool, // unused in links, kept here only as it is part of the render API
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { value } = this.props
    return value ? (
      <LinkComponent
        target="_blank"
        rel="noopener noreferrer"
        link={value}
      />) : null
  }
}

export default URLValueRender
