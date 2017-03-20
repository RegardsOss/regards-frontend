/**
 * LICENSE_PLACEHOLDER
 **/
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import { EditDependencies as ModelEditDep, AddDependencies as ModelAddDep } from '@regardsoss/admin-data-model-management/src/dependencies'
import { EditDependencies as ModelAttEditDep, AddDependencies as ModelAttAddDep } from '@regardsoss/admin-data-attributemodel-management/src/dependencies'
import { EditDependencies as CollectionEditDep, AddDependencies as CollectionAddDep } from '@regardsoss/admin-data-collection-management/src/dependencies'
import { EditDependencies as FragmentEditDep, AddDependencies as FragmentAddDep } from '@regardsoss/admin-data-fragment-management/src/dependencies'
import { EditDependencies as DatasetEditDep, AddDependencies as DatasetAddDep } from '@regardsoss/admin-data-dataset-management/src/dependencies'
import { EditDependencies as DatasourceEditDep, AddDependencies as DatasourceAddDep } from '@regardsoss/admin-data-datasource-management/src/dependencies'
import { EditDependencies as ConnectionEditDep, AddDependencies as ConnectionAddDep } from '@regardsoss/admin-data-connection-management/src/dependencies'

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
        hateoasDependencies: ModelEditDep,
      },
      {
        path: `/admin/${projectName}/data/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: ModelAddDep,
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
        hateoasDependencies: ModelAttEditDep,
      },
      {
        path: `/admin/${projectName}/data/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: ModelAttAddDep,
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
        hateoasDependencies: CollectionEditDep,
      },
      {
        path: `/admin/${projectName}/data/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: CollectionAddDep,
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
        hateoasDependencies: FragmentEditDep,
      },
      {
        path: `/admin/${projectName}/data/fragment/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: FragmentAddDep,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.dataset.title' }),
    description: intl.formatMessage({ id: 'data.board.dataset.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/dataset/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: DatasetEditDep,
      },
      {
        path: `/admin/${projectName}/data/dataset/create/datasource`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: DatasetAddDep,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datasource.title' }),
    description: intl.formatMessage({ id: 'data.board.datasource.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/datasource/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: DatasourceEditDep,
      },
      {
        path: `/admin/${projectName}/data/datasource/create/connection`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: DatasourceAddDep,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.connection.title' }),
    description: intl.formatMessage({ id: 'data.board.connection.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/connection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: ConnectionEditDep,
      },
      {
        path: `/admin/${projectName}/data/connection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: ConnectionAddDep,
      },
    ],
  },
]

export default items
