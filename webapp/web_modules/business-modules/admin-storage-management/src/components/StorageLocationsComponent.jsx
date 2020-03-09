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
import { browserHistory } from 'react-router'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import StorageLocationListContainer from '../containers/StorageLocationListContainer'
import { storageLocationActions } from '../clients/StorageLocationClient'
import messages from '../i18n'
import styles from '../styles'
/**
 * Storage plugin list component
 * @author Kévin Picart
 */
class StorageLocationListComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static addDependencies = [storageLocationActions.getDependency(RequestVerbEnum.POST)]

  goToBoard = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  goToCreateStorageForm = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages/create`)
  }

  render() {
    const { params: { project } } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'storage.location.list.title' })}
          subtitle={formatMessage({ id: 'storage.location.list.subtitle' })}
        />
        <CardText style={moduleTheme.root}>
          <StorageLocationListContainer
            project={project}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'storage.location.list.add.button' })}
            mainButtonClick={this.goToCreateStorageForm}
            mainHateoasDependencies={StorageLocationListComponent.addDependencies}
            secondaryButtonLabel={formatMessage({ id: 'storage.location.list.back.button' })}
            secondaryButtonClick={this.goToBoard}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(StorageLocationListComponent))
