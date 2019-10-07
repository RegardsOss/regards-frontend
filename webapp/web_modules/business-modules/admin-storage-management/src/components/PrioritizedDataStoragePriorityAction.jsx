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
import find from 'lodash/find'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import IconButton from 'material-ui/IconButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class PrioritizedDataStoragePriorityAction extends React.Component {
  static propTypes = {
    entity: StorageShapes.PrioritizedDataStorage,
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
    const { entity: { content } } = this.props

    const title = this.props.onUp
      ? formatMessage({ id: 'storage.data-storage.plugins.list.up.priority.button' })
      : formatMessage({ id: 'storage.data-storage.plugins.list.down.priority.button' })
    return (
      <IconButton
        className={`selenium-edit-${content.configuration.id}`}
        title={title}
        iconStyle={PrioritizedDataStoragePriorityAction.iconStyle}
        style={PrioritizedDataStoragePriorityAction.buttonStyle}
        onClick={() => this.props.onUp ? this.props.onUp(content) : this.props.onDown(content)}
        disabled={!this.isActionable()}
      >
        {this.props.onUp ? <ArrowUp /> : <ArrowDown />}
      </IconButton>
    )
  }
}
export default PrioritizedDataStoragePriorityAction
