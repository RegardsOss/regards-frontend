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
import { LinkComponent } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import messages from '../i18n'

/**
 * Component to display url link attributes group value
 *
 * @author Sébastien binda
 */
export class UrlAttributeRender extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.string,
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

export default withI18n(messages, true)(UrlAttributeRender)
