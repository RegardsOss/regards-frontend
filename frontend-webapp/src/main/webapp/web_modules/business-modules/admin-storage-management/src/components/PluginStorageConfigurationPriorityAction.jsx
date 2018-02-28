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
import find from 'lodash/find'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import IconButton from 'material-ui/IconButton'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class PluginStorageConfigurationPriorityAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: CommonShapes.PluginConfigurationContent.isRequired,
      links: PropTypes.array,
    }),
    onUp: PropTypes.func,
    onDown: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isActionable = () => {
    const { links } = this.props.entity
    if (this.props.onUp) {
      return !!find(links, l => l.rel === 'up')
    }
    return !!find(links, l => l.rel === 'down')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const entityContent = this.props.entity.content

    const title = this.props.onUp ?
      formatMessage({ id: 'storage.data-storage.plugins.list.up.priority.button' }) :
      formatMessage({ id: 'storage.data-storage.plugins.list.down.priority.button' })
    return (
      <IconButton
        className={`selenium-edit-${entityContent.id}`}
        title={title}
        iconStyle={PluginStorageConfigurationPriorityAction.iconStyle}
        style={PluginStorageConfigurationPriorityAction.buttonStyle}
        onClick={() => this.props.onUp ? this.props.onUp(entityContent) : this.props.onDown(entityContent)}
        disabled={!this.isActionable()}
      >
        {this.props.onUp ? <ArrowUp /> : <ArrowDown />}
      </IconButton>
    )
  }
}
export default PluginStorageConfigurationPriorityAction
