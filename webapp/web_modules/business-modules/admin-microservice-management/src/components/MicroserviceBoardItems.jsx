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
import map from 'lodash/map'
import ExtensionIcon from 'mdi-material-ui/Puzzle'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'mdi-material-ui/Cloud'
import CloudOff from 'mdi-material-ui/CloudOffOutline'
import SwapVertical from 'mdi-material-ui/SwapVertical'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import styles from '../styles/styles'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import SetMaintenanceModeActions from '../model/SetMaintenanceModeActions'
import { pluginMetaDataActions } from '../clients/PluginMetadataClient'
import { microserviceConfBackupActions } from '../clients/MicroserviceConfBackupClient'

/**
 * Configuration file for the Microservice Management boards items.
 *
 * @param project
 * @param intl
 * @author Xavier-Alexandre Brochard
 */
const getMaintenanceIcon = (isActive, computedStyles) => (
  <Checkbox
    checkedIcon={<Cloud />}
    uncheckedIcon={<CloudOff />}
    checked={!isActive}
    style={computedStyles.board.checkbox}
  />
)
const items = (project, microservices, isMicroserviceActive, isMicroserviceBackupable, toggleMaintenance, intl, theme) => {
  const computedStyles = styles(theme)
  return map(microservices, (microservice) => {
    const maintenanceOn = !isMicroserviceActive(microservice)
    const confirmMessage = maintenanceOn
      ? intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.on.confirm' }, { name: microservice })
      : intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.off.confirm' }, { name: microservice })
    const actions = [{
      path: `/admin/${project}/microservice/${microservice}/plugin/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
      hateoasDependencies: [
        pluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, microservice),
      ],
    },
    {
      icon: getMaintenanceIcon(!maintenanceOn, computedStyles),
      tooltipMsg: intl.formatMessage({
        id: maintenanceOn
          ? 'microservice-management.maintenance.tooltip.off'
          : 'microservice-management.maintenance.tooltip.on',
      }),
      confirmMessage,
      touchTapAction: () => {
        toggleMaintenance(microservice)
      },
      hateoasDependencies: [
        MaintenanceModeActions(microservice).getDependency(RequestVerbEnum.GET),
        SetMaintenanceModeActions(microservice).getActivateDependency(),
        SetMaintenanceModeActions(microservice).getDesactivateDependency(),
      ],
    }]
    // If we can backup the microservice, add the action
    if (isMicroserviceBackupable(microservice)) {
      actions.push({
        path: `/admin/${project}/microservice/${microservice}/conf-backup`,
        icon: <SwapVertical />,
        tooltipMsg: intl.formatMessage({ id: 'microservice-management.backup-conf.tooltip' }),
        hateoasDependencies: [
          microserviceConfBackupActions.getMsDependency(RequestVerbEnum.GET, microservice),
          microserviceConfBackupActions.getMsDependency(RequestVerbEnum.POST, microservice),
        ],
      })
    }
    return ({
      title: microservice,
      description: intl.formatMessage({ id: `microservice-management.${microservice}.description` }),
      advanced: false,
      actions,
    })
  })
}

export default items
