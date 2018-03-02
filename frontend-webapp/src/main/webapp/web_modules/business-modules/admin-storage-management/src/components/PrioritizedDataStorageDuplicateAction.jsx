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
import Copy from 'material-ui/svg-icons/content/content-copy'
import IconButton from 'material-ui/IconButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { onlinePrioritizedDataStorageActions } from '../clients/PrioritizedDataStorageClient'

const IconButtonWithResources = withResourceDisplayControl(IconButton)
/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class PrioritizedDataStorageDuplicateAction extends React.Component {
  static propTypes = {
    entity: StorageShapes.PrioritizedDataStorage,
    onDuplicate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity: { content } } = this.props
    return (
      <IconButtonWithResources
        className={`selenium-edit-${content.id}`}
        title={formatMessage({ id: 'storage.data-storage.plugins.list.duplicate.button' })}
        iconStyle={PrioritizedDataStorageDuplicateAction.iconStyle}
        style={PrioritizedDataStorageDuplicateAction.buttonStyle}
        onClick={() => this.props.onDuplicate(content)}
        resourceDependencies={onlinePrioritizedDataStorageActions.getDependency(RequestVerbEnum.POST)}
        hideDisabled={false}
      >
        <Copy />
      </IconButtonWithResources>
    )
  }
}
export default PrioritizedDataStorageDuplicateAction
