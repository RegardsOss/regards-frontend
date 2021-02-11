/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { dependencies } from '@regardsoss/admin-account-management'
import AccountsListWithCountIconContainer from '../containers/AccountsListWithCountIconContainer'

/**
 * BoardItems configuration for Datamanagement module
 * @param projectName
 * @param intl
 */
export default (intl) => [
  { // accounts
    title: intl.formatMessage({ id: 'data.board.accounts.title' }),
    description: intl.formatMessage({ id: 'data.board.accounts.description' }),
    advanced: false,
    actions: [{ // 1 - show list
      path: '/admin/accounts/management/list',
      icon: <AccountsListWithCountIconContainer />,
      tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      hateoasDependencies: dependencies.listDependencies,
    }, { // 2 - settings
      path: '/admin/accounts/management/settings',
      icon: <SettingsIcon />,
      tooltipMsg: intl.formatMessage({ id: 'data.board.action.settings.tooltip' }),
      hateoasDependencies: dependencies.settingsDependencies,
    }],
  },
]
