/**
 * LICENSE_PLACEHOLDER
 **/
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Palette from 'material-ui/svg-icons/image/palette'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'project.app.title' }),
    description: intl.formatMessage({ id: 'project.app.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui-configuration/applications/user/modules/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'project.app.modules.tooltip' }),
    }, {
      path: `/admin/${project}/ui-configuration/applications/user/layout`,
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'project.app.layout.tooltip' }),
    }, {
      path: `/admin/${project}/ui-configuration/applications/user/themes/list`,
      icon: <Palette />,
      tooltipMsg: intl.formatMessage({ id: 'project.app.themes.tooltip' }),
    }],
  },
]
