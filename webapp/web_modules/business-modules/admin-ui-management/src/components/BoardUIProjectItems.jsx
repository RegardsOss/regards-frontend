/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SettingsIcon from 'mdi-material-ui/Cog'
import ExtensionIcon from 'mdi-material-ui/Puzzle'
import ViewQuilt from 'mdi-material-ui/ViewQuilt'
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import AddIcon from 'mdi-material-ui/PlusCircle'
import { uiSettingsDependencies } from '@regardsoss/admin-ui-settings-management'
import { themeUIDependencies } from '@regardsoss/admin-ui-theme-management'
import { pluginUIDependencies } from '@regardsoss/admin-ui-plugin-management'
import { moduleUIDependencies } from '@regardsoss/admin-ui-module-management'
import { layoutUIDependencies } from '@regardsoss/admin-ui-layout-management'
import { serviceUIDependencies } from '@regardsoss/admin-ui-service-management'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 * @author Sébastien binda
 */
export default (project, intl) => [{
  title: intl.formatMessage({ id: 'ui.settings.title' }),
  description: intl.formatMessage({ id: 'ui.settings.description' }),
  advanced: false,
  actions: [{
    path: `/admin/${project}/ui/settings/edit`,
    icon: <SettingsIcon />,
    tooltipMsg: intl.formatMessage({ id: 'ui.settings.edit.tooltip' }),
    hateoasDependencies: uiSettingsDependencies.editSettingsDependencies,
  }],
}, {
  title: intl.formatMessage({ id: 'project.layout.title' }),
  description: intl.formatMessage({ id: 'project.layout.description' }),
  advanced: false,
  actions: [{
    path: `/admin/${project}/ui/layout/user`,
    icon: <ViewQuilt />,
    tooltipMsg: intl.formatMessage({ id: 'project.layout.tooltip' }),
    hateoasDependencies: layoutUIDependencies.boardSeeRequiredDependencies,
  }],
}, {
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
}, {
  title: intl.formatMessage({ id: 'project.theme.title' }),
  description: intl.formatMessage({ id: 'project.theme.description' }),
  advanced: false,
  actions: [{
    path: `/admin/${project}/ui/theme/list`,
    icon: <ViewLinesIcon />,
    tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
    hateoasDependencies: themeUIDependencies.boardListRequiredDependencies,
  }, {
    path: `/admin/${project}/ui/theme/create`,
    icon: <AddIcon />,
    tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
    hateoasDependencies: themeUIDependencies.boardAddRequiredDependencies,
  }],
}, {
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
}, {
  title: intl.formatMessage({ id: 'project.service.title' }),
  description: intl.formatMessage({ id: 'project.service.description' }),
  advanced: false,
  actions: [{
    path: `/admin/${project}/ui/service/list`,
    icon: <ExtensionIcon />,
    tooltipMsg: intl.formatMessage({ id: 'action.service.list.tooltip' }),
    hateoasDependencies: [
      ...serviceUIDependencies.boardListRequiredDependencies,
      ...serviceUIDependencies.boardAddRequiredDependencies,
    ],
  }],
}]
