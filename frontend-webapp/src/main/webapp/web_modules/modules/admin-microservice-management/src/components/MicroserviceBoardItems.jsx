/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import Settings from 'material-ui/svg-icons/action/settings'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudOff from 'material-ui/svg-icons/file/cloud-off'
import microservices from '../data/microservices.json'
import styles from '../styles/styles'

/**
 * Configuration file for the Microservice Management boards items.
 *
 * @param project
 * @param intl
 * @author Xavier-Alexandre Brochard
 */
const computedStyles = styles()
const items = (project, fetchMaintenance, maintenanceList, activateMaintenance, deactivateMaintenance, intl) => map(microservices, microservice => (
  {
    title: microservice.name,
    description: intl.formatMessage({ id: `microservice-management.${microservice.name}.description` }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/microservice/${microservice.name}/configuration`,
      icon: <Settings />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.configuration.tooltip' }),
    }, {
      path: `/admin/${project}/microservice/${microservice.name}/plugin/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
    }, {
      icon: <Checkbox
        checkedIcon={<Cloud />}
        uncheckedIcon={<CloudOff />}
        checked={!maintenanceList[microservice.name][project]}
        onTouchTap={
          () => {
            if (maintenanceList[microservice.name][project]) {
              deactivateMaintenance[microservice.name](project)
            } else {
              activateMaintenance[microservice.name](project)
            }
            fetchMaintenance[microservice.name]()
          }
        }
        style={computedStyles.board.checkbox}
      />,
      // icon: <Palette onTouchTap={() => alert('TODO: Switch the microservice to maintenance')} />,
      tooltipMsg: intl.formatMessage({
        id: maintenanceList[microservice.name][project] ? 'microservice-management.maintenance.tooltip.on' : 'microservice-management.maintenance.tooltip.off',
      }),
    }],
  }
))

export default items

