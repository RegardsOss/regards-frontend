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
import find from 'lodash/find'
import Toggle from 'material-ui/Toggle'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'

/**
* Custom cell for PluginConfigurationListComponent infinite table to render specific action on active property
* @author Sébastien Binda
*/
class ServiceActivationAction extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    entity: CommonShapes.PluginConfiguration,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  onToggle = () => {
    this.props.onToggle(this.props.entity.content)
  }

  isEditable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'update')
  }

  render() {
    const { entity: { content: { active } } } = this.props
    const { intl: { formatMessage } } = this.context
    const title = active
      ? formatMessage({ id: 'dataaccess.services.list.active.off.button' })
      : formatMessage({ id: 'dataaccess.services.list.active.on.button' })
    return (
      <div style={{ margin: 'auto' }}>
        <Toggle
          toggled={active}
          onToggle={this.onToggle}
          title={title}
          disabled={!this.isEditable()}
        />
      </div>
    )
  }
}
export default ServiceActivationAction
