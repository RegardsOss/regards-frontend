/**
 * LICENSE_PLACEHOLDER
 **/
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Palette from 'material-ui/svg-icons/image/palette'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 * @author Sébastien binda
 */
export default intl => [
  {
    title: intl.formatMessage({ id: 'portal.layout.title' }),
    description: intl.formatMessage({ id: 'project.layout.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/layout/portal',
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'project.layout.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'portal.module.title' }),
    description: intl.formatMessage({ id: 'project.module.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/module/portal/list',
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
    }, {
      path: '/admin/ui/module/portal/create',
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'portal.theme.title' }),
    description: intl.formatMessage({ id: 'project.theme.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/theme/edit',
      icon: <Palette />,
      tooltipMsg: intl.formatMessage({ id: 'project.theme.tooltip' }),
    }],
  },
]
