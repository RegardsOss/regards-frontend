/**
 * LICENSE_PLACEHOLDER
 **/
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
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
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
    }, {
      path: `/admin/${project}/user/project-user/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'user.board.role.title' }),
    description: intl.formatMessage({ id: 'user.board.role.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/role/list`,
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
    }, {
      path: `/admin/${project}/user/role/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'user.board.accessgroup.title' }),
    description: intl.formatMessage({ id: 'user.board.accessgroup.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/accessgroup/list`,
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
    }, {
      path: `/admin/${project}/user/accessgroup/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
    }],
  },
]
