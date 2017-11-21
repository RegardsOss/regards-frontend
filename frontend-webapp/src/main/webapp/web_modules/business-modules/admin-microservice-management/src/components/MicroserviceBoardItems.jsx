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
import map from 'lodash/map'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudOff from 'material-ui/svg-icons/file/cloud-off'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import styles from '../styles/styles'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import SetMaintenanceModeActions from '../model/SetMaintenanceModeActions'
import { pluginMetaDataActions } from '../clients/PluginMetadataClient'


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
const items = (project, maintenances, intl, theme, initialize) => {
  const computedStyles = styles(theme)
  return map(maintenances, (maintenance, microservice) => {
    const maintenanceOn = !maintenance.isOn(project)
    const confirmMessage = maintenanceOn ?
      intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.on.confirm' }, { name: microservice }) :
      intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.off.confirm' }, { name: microservice })
    const actions = [{
      path: `/admin/${project}/microservice/${microservice}/plugin/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
      hateoasDependencies: [
        pluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, microservice),
      ],
    },
    {
      initialize: maintenance.fetch,
      icon: getMaintenanceIcon(maintenance.isOn(project), computedStyles),
      tooltipMsg: intl.formatMessage({
        id: maintenance.isOn(project) ?
          'microservice-management.maintenance.tooltip.on' :
          'microservice-management.maintenance.tooltip.off',
      }),
      confirmMessage,
      touchTapAction: () => {
        maintenance.set(project, maintenanceOn)
      },
      hateoasDependencies: [
        MaintenanceModeActions(microservice).getDependency(RequestVerbEnum.GET),
        SetMaintenanceModeActions(microservice).getActivateDependency(),
        SetMaintenanceModeActions(microservice).getDesactivateDependency(),
      ],
    }]
    return ({
      title: microservice,
      description: intl.formatMessage({ id: `microservice-management.${microservice}.description` }),
      advanced: false,
      actions,
    })
  })
}

export default items

