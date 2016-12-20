/**
 * LICENSE_PLACEHOLDER
 **/
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'admin.app.title' }),
    description: intl.formatMessage({ id: 'admin.app.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui-configuration/applications/admin/modules`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'admin.app.modules.tooltip' }),
    }, {
      path: `/admin/${project}/ui-configuration/applications/admin/layout`,
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'admin.app.layout.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'project.app.title' }),
    description: intl.formatMessage({ id: 'project.app.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui-configuration/applications/project/modules`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'project.app.modules.tooltip' }),
    }, {
      path: `/admin/${project}/ui-configuration/applications/project/layout`,
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'project.app.layout.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'portal.app.title' }),
    description: intl.formatMessage({ id: 'portal.app.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui-configuration/applications/portal/modules`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'portal.app.modules.tooltip' }),
    }, {
      path: `/admin/${project}/ui-configuration/applications/portal/layout`,
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'portal.app.layout.tooltip' }),
    }],
  },
]
