/** @module common */
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
import i18nContextType from '../contextType'

/**
 * Retrieves intl fom the context
 * and injects it as a prop to its child
 */
class I18nInjector extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  mapContextToChildProps = () => ({
    intl: this.context.intl,
  })

  render() {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
  }
}

export default I18nInjector
