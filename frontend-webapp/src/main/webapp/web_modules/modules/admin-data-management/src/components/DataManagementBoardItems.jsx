/**
 * LICENSE_PLACEHOLDER
 **/
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'

/**
 * BoardItems configuration for Datamanagement module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'data.board.model.title' }),
    description: intl.formatMessage({ id: 'data.board.model.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.attributemodel.title' }),
    description: intl.formatMessage({ id: 'data.board.attributemodel.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/attribute/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'datamanagement.collection' }),
    description: intl.formatMessage({ id: 'datamanagement.collection.info' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/datamanagement/collection`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/datamanagement/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'datamanagement.dataset' }),
    description: intl.formatMessage({ id: 'datamanagement.dataset.info' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/datamanagement/dataset`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/datamanagement/dataset/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datasource.title' }),
    description: intl.formatMessage({ id: 'data.board.datasource.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/datamanagement/connection`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/datamanagement/connection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'datamanagement.action.add.tooltip' }),
      },
    ],
  },
]

export default items
