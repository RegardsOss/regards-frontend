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
import { browserHistory } from 'react-router'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { StorageDomain } from '@regardsoss/domain'
import PrioritizedDataStorageListContainer from '../containers/PrioritizedDataStorageListContainer'
import { onlinePrioritizedDataStorageActions } from '../clients/PrioritizedDataStorageClient'
import messages from '../i18n'
import styles from '../styles'

/**
* Comment Here
* @author Sébastien Binda
*/
class PrioritizedDataStoragesComponent extends React.Component {
  static addDependencies = [onlinePrioritizedDataStorageActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  goToBoard = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  goToCreateOnlineForm = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${StorageDomain.DataStorageTypeEnum.ONLINE}/create`)
  }

  goToCreateNearlineForm = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/${StorageDomain.DataStorageTypeEnum.NEARLINE}/create`)
  }

  render() {
    const { params: { project } } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'storage.data-storage.plugins.list.title' })}
          subtitle={formatMessage({ id: 'storage.data-storage.plugins.list.subtitle' })}
        />
        <CardText style={moduleTheme.root}>
          <CardTitle
            title={formatMessage({ id: 'storage.data-storage.plugins.online.list.title' })}
            subtitle={formatMessage({ id: 'storage.data-storage.plugins.online.list.subtitle' })}
          />
          <PrioritizedDataStorageListContainer
            key="online"
            project={project}
            type={StorageDomain.DataStorageTypeEnum.ONLINE}
          />
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.online.list.add.button' })}
            mainButtonClick={this.goToCreateOnlineForm}
            mainHateoasDependencies={PrioritizedDataStoragesComponent.addDependencies}
          />
          <CardTitle
            title={formatMessage({ id: 'storage.data-storage.plugins.nearline.list.title' })}
            subtitle={formatMessage({ id: 'storage.data-storage.plugins.nearline.list.subtitle' })}
          />
          <PrioritizedDataStorageListContainer
            key="nearline"
            project={project}
            type={StorageDomain.DataStorageTypeEnum.NEARLINE}
          />
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.nearline.list.add.button' })}
            mainButtonClick={this.goToCreateNearlineForm}
            mainHateoasDependencies={PrioritizedDataStoragesComponent.addDependencies}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.data-storage.plugins.list.back.button' })}
            mainButtonClick={this.goToBoard}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(PrioritizedDataStoragesComponent))
