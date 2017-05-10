/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
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
const computedStyles = styles()


const getMaintenanceIcon = isActive => (
  <Checkbox
    checkedIcon={<Cloud />}
    uncheckedIcon={<CloudOff />}
    checked={!isActive}
    style={computedStyles.board.checkbox}
  />
)
const items = (project, maintenances, intl) => map(maintenances, (maintenance, microservice) => (
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
      icon: getMaintenanceIcon(maintenance.isOn(project)),
      tooltipMsg: intl.formatMessage({
        id: maintenance.isOn(project) ?
          'microservice-management.maintenance.tooltip.on' :
          'microservice-management.maintenance.tooltip.off',
      }),
      touchTapAction: () => {
        maintenance.set(project, !maintenance.isOn(project))
      },
      hateoasDependencies: [
        SetMaintenanceModeActions(microservice).getActivateDependency(),
        SetMaintenanceModeActions(microservice).getDesactivateDependency(),
      ],
    }],
  }
))

export default items

