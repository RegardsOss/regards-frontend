/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudOff from 'material-ui/svg-icons/file/cloud-off'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import styles from '../styles/styles'
import SetMaintenanceModeActions from '../model/SetMaintenanceModeActions'
import PluginMetaDataActions from '../model/plugin/PluginMetaDataActions'


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
const items = (project, maintenances, intl, theme) => {
  const computedStyles = styles(theme)
  return map(maintenances, (maintenance, microservice) => {
    const maintenanceOn = !maintenance.isOn(project)
    const confirmMessage = maintenanceOn ?
      intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.on.confirm' }, { name: microservice }) :
      intl.formatMessage({ id: 'microservice-management.maintenance.switch.mode.off.confirm' }, { name: microservice })
    return (
    {
      title: microservice,
      description: intl.formatMessage({ id: `microservice-management.${microservice}.description` }),
      advanced: false,
      actions: [{
        path: `/admin/${project}/microservice/${microservice}/plugin/list`,
        icon: <ExtensionIcon />,
        tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
        hateoasDependencies: [
          PluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, microservice),
        ],
      }, {
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
          SetMaintenanceModeActions(microservice).getActivateDependency(),
          SetMaintenanceModeActions(microservice).getDesactivateDependency(),
        ],
      }],
    }
    )
  })
}

export default items

