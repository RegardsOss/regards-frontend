/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import Settings from 'material-ui/svg-icons/action/settings'
import Checkbox from 'material-ui/Checkbox'
import Cloud from 'material-ui/svg-icons/file/cloud'
import CloudOff from 'material-ui/svg-icons/file/cloud-off'


/**
 * Configuration file for the Microservice Management boards items.
 *
 * @param project
 * @param intl
 * @author Xavier-Alexandre Brochard
 */

// TODO make this list dynamic
const microserviceNameList = [
  'rs-access',
  'rs-admin',
  'rs-cloud',
  'rs-dam',
  'rs-gateway',
]

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
}

const items = (project, intl) => map(microserviceNameList, microserviceName => (
  {
    title: microserviceName,
    description: intl.formatMessage({ id: `microservice-management.${microserviceName}.description` }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/microservice/${microserviceName}/configuration`,
      icon: <Settings />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.configuration.tooltip' }),
    }, {
      path: `/admin/${project}/microservice/${microserviceName}/plugins`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.plugins.tooltip' }),
    }, {
      icon: <Checkbox
        checkedIcon={<Cloud />}
        uncheckedIcon={<CloudOff />}
        label="Custom icon of different shapes"
        style={styles.checkbox}
      />,
      // icon: <Palette onTouchTap={() => alert('TODO: Switch the microservice to maintenance')} />,
      tooltipMsg: intl.formatMessage({ id: 'microservice-management.maintenance.tooltip' }),
    }],
  }
))

export default items

