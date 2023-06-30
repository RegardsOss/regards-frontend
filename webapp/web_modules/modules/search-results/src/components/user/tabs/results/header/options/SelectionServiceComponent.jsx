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
import isEqual from 'lodash/isEqual'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { URLPictureResolver } from '@regardsoss/components'

/**
 * Selection service button
 * @author Raphaël Mechali
 */
class SelectionServiceComponent extends React.Component {
  static propTypes = {
    // displayed service
    service: AccessShapes.PluginServiceWithContent,
    // on run service callback
    onRunService: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static DEFAULT_STATE = {
    serviceIconComponent: null,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param {*} oldProps previous component properties
   * @param {*} newProps next component properties
   */
  onPropertiesUpdated = ({ service: oldService }, { service: newService }) => {
    const oldState = this.state
    const newState = oldState ? { ...oldState } : SelectionServiceComponent.DEFAULT_STATE
    if (oldService !== newService) {
      // prepare service icon to avoid building new instances at runtime
      newState.serviceIconComponent = newService.content.iconUrl
        ? <URLPictureResolver url={newService.content.iconUrl} />
        : null
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * User callback: starts service on selection
   */
  onClick = () => {
    const { onRunService, service } = this.props
    onRunService(service)
  }

  render() {
    const { service } = this.props
    const { serviceIconComponent } = this.state
    return (
      <FlatButton
        label={service.content.label}
        onClick={this.onClick}
        icon={serviceIconComponent}
      />
    )
  }
}
export default SelectionServiceComponent
