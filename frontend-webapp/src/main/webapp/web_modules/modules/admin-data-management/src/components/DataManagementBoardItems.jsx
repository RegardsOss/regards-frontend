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
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.attributemodel.title' }),
    description: intl.formatMessage({ id: 'data.board.attributemodel.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/attribute/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.collection.title' }),
    description: intl.formatMessage({ id: 'data.board.collection.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/collection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.fragment.title' }),
    description: intl.formatMessage({ id: 'data.board.fragment.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/fragment/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/fragment/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.dataset.title' }),
    description: intl.formatMessage({ id: 'data.board.dataset.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/dataset/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/dataset/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datasource.title' }),
    description: intl.formatMessage({ id: 'data.board.datasource.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/connection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
      },
      {
        path: `/admin/${projectName}/data/connection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
      },
    ],
  },
]

export default items
