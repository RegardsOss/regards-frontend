/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import EditQuotaIcon from 'mdi-material-ui/DownloadLock'
import { AccessShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/components'
import { setQuotaActions } from '../../../clients/SetQuotaClient'

/**
 * Option to show quota edition dialog
 * @author Raphaël Mechali
 */
class EditQuotaComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser.isRequired,
    onShowEditQuotaDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Action dependencies */
  static DEPENDENCIES = [setQuotaActions.getDependency(RequestVerbEnum.PUT)]

  /** Click callback: show dialog */
  onClick = () => {
    const { entity, onShowEditQuotaDialog } = this.props
    onShowEditQuotaDialog(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <ResourceIconAction
        title={formatMessage({ id: 'projectUser.list.table.action.edit.quota' })}
        onClick={this.onClick}
        resourceDependencies={EditQuotaComponent.DEPENDENCIES}
      >
        <EditQuotaIcon />
      </ResourceIconAction>)
  }
}
export default EditQuotaComponent
