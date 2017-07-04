/**
 * LICENSE_PLACEHOLDER
 **/
// import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Palette from 'material-ui/svg-icons/image/palette'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import { themeUIDependencies } from '@regardsoss/admin-ui-theme-management'
import { pluginUIDependencies } from '@regardsoss/admin-ui-plugin-management'
import { moduleUIDependencies } from '@regardsoss/admin-ui-module-management'
import { layoutUIDependencies } from '@regardsoss/admin-ui-layout-management'
// import { serviceUIDependencies } from '@regardsoss/admin-ui-service-management'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 * @author Sébastien binda
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'project.layout.title' }),
    description: intl.formatMessage({ id: 'project.layout.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui/layout/user`,
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'project.layout.tooltip' }),
      hateoasDependencies: layoutUIDependencies.boardSeeRequiredDependencies,
    }],
  },
  {
    title: intl.formatMessage({ id: 'project.module.title' }),
    description: intl.formatMessage({ id: 'project.module.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui/module/user/list`,
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
      hateoasDependencies: moduleUIDependencies.boardListRequiredDependencies,
    }, {
      path: `/admin/${project}/ui/module/user/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
      hateoasDependencies: moduleUIDependencies.boardAddRequiredDependencies,
    }],
  },
  {
    title: intl.formatMessage({ id: 'project.theme.title' }),
    description: intl.formatMessage({ id: 'project.theme.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui/theme/edit`,
      icon: <Palette />,
      tooltipMsg: intl.formatMessage({ id: 'project.theme.tooltip' }),
      hateoasDependencies: themeUIDependencies.boardRequiredDependencies,
    }],
  },
  {
    title: intl.formatMessage({ id: 'project.plugin.title' }),
    description: intl.formatMessage({ id: 'project.plugin.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui/plugin/list`,
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
      hateoasDependencies: pluginUIDependencies.boardListRequiredDependencies,
    }, {
      path: `/admin/${project}/ui/plugin/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
      hateoasDependencies: pluginUIDependencies.boardAddRequiredDependencies,
    }],
  },
  /**
   * TODO Add services management
  {
    title: intl.formatMessage({ id: 'project.service.title' }),
    description: intl.formatMessage({ id: 'project.service.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/ui/service/list`,
      icon: <ExtensionIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
      hateoasDependencies: serviceUIDependencies.boardListRequiredDependencies,
    }],
  },*/
]
