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
export default intl => [
  {
    title: intl.formatMessage({ id: 'portal.app.title' }),
    description: intl.formatMessage({ id: 'portal.app.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui-configuration/applications/portal/modules/list',
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'portal.app.modules.tooltip' }),
    }, {
      path: '/admin/ui-configuration/applications/portal/layout',
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'portal.app.layout.tooltip' }),
    }, {
      path: '/admin/ui-configuration/applications/portal/themes/list',
      icon: <Palette />,
      tooltipMsg: intl.formatMessage({ id: 'portal.app.themes.tooltip' }),
    }],
  },
]
