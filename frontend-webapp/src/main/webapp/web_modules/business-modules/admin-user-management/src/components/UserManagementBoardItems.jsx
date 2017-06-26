/**
 * LICENSE_PLACEHOLDER
 **/
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import { projectUserDependencies } from '@regardsoss/admin-user-projectuser-management'
import { roleDependencies } from '@regardsoss/admin-user-role-management'
import UsersListWithCountIconContainer from '../containers/UsersListWithCountIconContainer'


/**
 * Configuration file for user management boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'user.board.project-user.title' }),
    description: intl.formatMessage({ id: 'user.board.project-user.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/project-user/list`,
      icon: <UsersListWithCountIconContainer />,
      className: 'selenium-userList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: projectUserDependencies.listDependencies,
    }, {
      path: `/admin/${project}/user/project-user/create`,
      icon: <AddIcon />,
      className: 'selenium-userCreate',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
      hateoasDependencies: projectUserDependencies.addDependencies,
    }],
  },
  {
    title: intl.formatMessage({ id: 'user.board.role.title' }),
    description: intl.formatMessage({ id: 'user.board.role.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/role/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-roleList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: roleDependencies.listDependencies,
    }, {
      path: `/admin/${project}/user/role/create`,
      icon: <AddIcon />,
      className: 'selenium-roleCreate',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
      hateoasDependencies: roleDependencies.addDependencies,
    }],
  },
]
