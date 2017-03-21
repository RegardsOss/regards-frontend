/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudOff from 'material-ui/svg-icons/file/cloud-off'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import microservices from '../data/microservices.json'
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
const items = (project, maintenance, intl) => map(microservices, microservice => (
  {
    title: microservice.name,
    description: intl.formatMessage({ id: `microservice-management.${microservice.name}.description` }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/microservice/${microservice.name}/plugin/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
      hateoasDependencies: [
        PluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, microservice.name),
      ],
    }, {
      icon: getMaintenanceIcon(maintenance[microservice.name].isOn(project)),
      tooltipMsg: intl.formatMessage({
        id: maintenance[microservice.name].isOn(project) ?
          'microservice-management.maintenance.tooltip.on' :
          'microservice-management.maintenance.tooltip.off',
      }),
      touchTapAction: () => {
        maintenance[microservice.name].set(project, !maintenance[microservice.name].isOn(project))
      },
      hateoasDependencies: [
        SetMaintenanceModeActions(microservice.name).getActivateDependency(),
        SetMaintenanceModeActions(microservice.name).getDesactivateDependency(),
      ],
    }],
  }
))

export default items

