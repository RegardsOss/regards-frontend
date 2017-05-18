/**
 * LICENSE_PLACEHOLDER
 **/
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import { EditDependencies as GroupEditDep, AddDependencies as GroupAddDep } from '@regardsoss/admin-accessright-accessgroup-management/src/dependencies'

/**
 * Configuration file for user management boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'accessright.board.accessgroup.title' }),
    description: intl.formatMessage({ id: 'accessright.board.accessgroup.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/access-right/access-group/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-accessgroupList',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.list' }),
      hateoasDependencies: GroupEditDep,
    }, {
      path: `/admin/${project}/access-right/access-group/create`,
      icon: <AddIcon />,
      className: 'selenium-accessgroupCreate',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.add' }),
      hateoasDependencies: GroupAddDep,
    }],
  },
]
